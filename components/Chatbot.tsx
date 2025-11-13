
import React, { useState, useEffect, useRef } from 'react';
import { Course, ChatMessage } from '../types';
import { createCourseChatSession } from '../services/geminiService';
import type { Chat } from '@google/genai';
import { SendIcon, SparklesIcon } from './icons';

interface ChatbotProps {
  course: Course;
}

const Chatbot: React.FC<ChatbotProps> = ({ course }) => {
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeChat = async () => {
      setIsLoading(true);
      try {
        const session = createCourseChatSession(course);
        setChatSession(session);
        setMessages([
          {
            role: 'model',
            text: `Hello! I'm your AI tutor for the course "${course.title}". How can I help you today?`,
          },
        ]);
      } catch (error) {
        console.error('Failed to initialize chat session:', error);
        setMessages([
          {
            role: 'model',
            text: 'Sorry, I am unable to start our chat session right now. Please try again later.',
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    initializeChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !chatSession || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const stream = await chatSession.sendMessageStream({ message: userInput });
      
      let modelResponse = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of stream) {
        modelResponse += chunk.text;
        setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage.role === 'model') {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { ...lastMessage, text: modelResponse };
                return newMessages;
            }
            return prev;
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: 'Oops! Something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col h-[70vh] sticky top-24">
      <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
        <SparklesIcon className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-bold text-gray-800">AI Course Tutor</h3>
      </div>
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs md:max-w-md lg:max-w-xs xl:max-w-sm px-4 py-2 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-lg'
                    : 'bg-gray-200 text-gray-800 rounded-bl-lg'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length -1].role === 'user' && (
             <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-bl-lg p-2">
                    <div className="flex items-center space-x-1">
                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask a question..."
            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading || !chatSession}
          />
          <button
            type="submit"
            disabled={isLoading || !userInput.trim()}
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <SendIcon className="h-6 w-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
