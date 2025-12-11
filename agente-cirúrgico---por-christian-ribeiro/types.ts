export type Screen = 'auth' | 'dashboard' | 'ebook' | 'chat';

export interface UserState {
  isAuthenticated: boolean;
  name: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface EbookChapter {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
}