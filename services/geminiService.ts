
import { GoogleGenAI, Chat } from '@google/genai';
import { Course } from '../types';

if (!process.env.API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // This is a placeholder for development environments where the key might not be set.
  // The execution environment is expected to have this set.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const createCourseChatSession = (course: Course): Chat => {
  const systemInstruction = `You are 'Skill Up AI', a helpful and encouraging tutor for the course "${course.title}".
Your goal is to help learners understand the course material better.
The course covers: ${course.longDescription}.
Answer questions clearly and concisely. If a question is outside the scope of the course, politely state that you can only answer questions related to this specific course content.
Do not answer questions about other courses or general knowledge. Stick strictly to the provided course context.`;

  const chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    },
  });

  return chatSession;
};
