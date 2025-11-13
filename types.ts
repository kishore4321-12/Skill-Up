
export interface Course {
  id: number;
  title: string;
  instructor: string;
  description: string;
  longDescription: string;
  rating: number;
  totalRatings: number;
  duration: string;
  level: string;
  imageUrl: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
