export interface ChatMessage {
  id: string;
  type: 'user' | 'ia';
  content: string | React.ReactNode;
  timestamp: Date;
  game?: string;
  metadata?: {
    tokens?: number;
    responseTime?: number;
    model?: string;
  };
}

export interface Game {
  key: string;
  name: string;
  icon: string;
  examples: string[];
  tip: string;
  description?: string;
  category?: string;
}

export interface ChatState {
  messages: ChatMessage[];
  selectedGame: string;
  isLoading: boolean;
  input: string;
  error: string | null;
}

export interface ChatContextType {
  state: ChatState;
  sendMessage: (message: string) => Promise<void>;
  selectGame: (gameKey: string) => void;
  clearChat: () => void;
  setInput: (input: string) => void;
}

export interface ChatMessageProps {
  message: ChatMessage;
  onAction?: (action: string) => void;
}

export interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
  section?: string;
  replies?: Comment[];
}

export interface CommentSectionProps {
  sectionId: string;
  initialComments?: Comment[];
  initialVotes?: { up: number; down: number };
  title?: string;
  className?: string;
  onComment?: (comment: Comment) => void;
  onVote?: (type: 'up' | 'down') => void;
}

export interface ChatPreferences {
  autoScroll: boolean;
  showTimestamps: boolean;
  compactMode: boolean;
  soundEnabled: boolean;
  theme: 'default' | 'dark' | 'light';
} 