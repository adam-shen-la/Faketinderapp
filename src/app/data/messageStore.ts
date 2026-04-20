/**
 * Global message store — persists chat state across component mount/unmount cycles.
 * Uses useSyncExternalStore pattern so React components re-render on changes.
 */
import { useSyncExternalStore } from 'react';
import { CONVERSATIONS, Message } from './messagesData';
import { CHAT_MESSAGES, ChatMessage, MATCHES, Match } from './profiles';

/* ── Messages App Store ── */
type MessagesState = Record<string, Message[]>;
type UnreadState = Record<string, number>;

const initialMessages: MessagesState = {};
CONVERSATIONS.forEach((c) => {
  initialMessages[c.contactId] = [...c.messages];
});

const initialUnread: UnreadState = {};
CONVERSATIONS.forEach((c) => {
  initialUnread[c.contactId] = c.unreadCount;
});

let messagesState: MessagesState = initialMessages;
let unreadState: UnreadState = initialUnread;
let msgListeners = new Set<() => void>();

function notifyMsg() {
  msgListeners.forEach((fn) => fn());
}

export function getMessagesSnapshot() {
  return messagesState;
}

export function getUnreadSnapshot() {
  return unreadState;
}

export function getMessages(contactId: string): Message[] {
  return messagesState[contactId] ?? [];
}

export function addMessage(contactId: string, msg: Message) {
  messagesState = {
    ...messagesState,
    [contactId]: [...(messagesState[contactId] ?? []), msg],
  };
  notifyMsg();
}

export function markRead(contactId: string) {
  if (unreadState[contactId] === 0) return;
  unreadState = { ...unreadState, [contactId]: 0 };
  notifyMsg();
}

export function useMessagesStore() {
  return useSyncExternalStore(
    (cb) => { msgListeners.add(cb); return () => msgListeners.delete(cb); },
    () => messagesState,
  );
}

export function useUnreadStore() {
  return useSyncExternalStore(
    (cb) => { msgListeners.add(cb); return () => msgListeners.delete(cb); },
    () => unreadState,
  );
}

/* ── Tinder Chat Store ── */
type TinderChatState = Record<string, ChatMessage[]>;
type TinderMatchState = Match[];

const initialTinderChats: TinderChatState = {};
Object.entries(CHAT_MESSAGES).forEach(([id, msgs]) => {
  initialTinderChats[id] = [...msgs];
});

let tinderChatState: TinderChatState = initialTinderChats;
let tinderMatchState: TinderMatchState = [...MATCHES];
let tinderListeners = new Set<() => void>();

function notifyTinder() {
  tinderListeners.forEach((fn) => fn());
}

export function getTinderChatSnapshot() {
  return tinderChatState;
}

export function getTinderMatchSnapshot() {
  return tinderMatchState;
}

export function getTinderMessages(matchId: string): ChatMessage[] {
  return tinderChatState[matchId] ?? [];
}

export function addTinderMessage(matchId: string, msg: ChatMessage) {
  tinderChatState = {
    ...tinderChatState,
    [matchId]: [...(tinderChatState[matchId] ?? []), msg],
  };
  // Update match's last message
  tinderMatchState = tinderMatchState.map((m) =>
    m.id === matchId
      ? { ...m, lastMessage: msg.text, timestamp: 'now', unread: !msg.sent }
      : m,
  );
  notifyTinder();
}

export function markTinderRead(matchId: string) {
  const match = tinderMatchState.find((m) => m.id === matchId);
  if (!match?.unread) return;
  tinderMatchState = tinderMatchState.map((m) =>
    m.id === matchId ? { ...m, unread: false } : m,
  );
  notifyTinder();
}

export function useTinderStore() {
  return useSyncExternalStore(
    (cb) => { tinderListeners.add(cb); return () => tinderListeners.delete(cb); },
    () => tinderChatState,
  );
}

export function useTinderMatchStore() {
  return useSyncExternalStore(
    (cb) => { tinderListeners.add(cb); return () => tinderListeners.delete(cb); },
    () => tinderMatchState,
  );
}
