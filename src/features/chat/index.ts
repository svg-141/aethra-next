// Chat Feature - Exports principales
export { default as ChatMessage } from './components/ChatMessage';
export { default as CommentSection } from './components/CommentSection';

// Types
export type { 
  ChatMessage as ChatMessageType,
  Game,
  ChatState,
  ChatContextType,
  ChatMessageProps,
  Comment,
  CommentSectionProps,
  ChatPreferences
} from './types/chat.types';

// Constants
export { 
  GAMES, 
  getGameByKey, 
  getGamesByCategory, 
  getDefaultGame 
} from './constants/games'; 