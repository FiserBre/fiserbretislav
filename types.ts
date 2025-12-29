export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}