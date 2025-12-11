import { Message, UserState } from '../types';

const KEYS = {
  USER: 'agente_cirurgico_user_v1',
  CHAT: 'agente_cirurgico_chat_v1'
};

// --- USER DATABASE OPERATIONS ---

export const saveUserToDB = (user: UserState): void => {
  try {
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  } catch (e) {
    console.error("Erro ao salvar usuário no DB local", e);
  }
};

export const loadUserFromDB = (): UserState | null => {
  try {
    const data = localStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("Erro ao carregar usuário do DB local", e);
    return null;
  }
};

export const clearUserDB = (): void => {
  localStorage.removeItem(KEYS.USER);
};

// --- CHAT DATABASE OPERATIONS ---

export const saveChatToDB = (messages: Message[]): void => {
  try {
    localStorage.setItem(KEYS.CHAT, JSON.stringify(messages));
  } catch (e) {
    console.error("Erro ao salvar chat no DB local", e);
  }
};

export const loadChatFromDB = (): Message[] | null => {
  try {
    const data = localStorage.getItem(KEYS.CHAT);
    if (!data) return null;

    // Need to convert string timestamps back to Date objects
    const parsed: Message[] = JSON.parse(data);
    return parsed.map(msg => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    }));
  } catch (e) {
    console.error("Erro ao carregar chat do DB local", e);
    return null;
  }
};

export const clearChatDB = (): void => {
  localStorage.removeItem(KEYS.CHAT);
};