import { useState, useEffect, useSyncExternalStore, useCallback } from 'react';

/* ── tiny global store (no Context needed) ── */
interface NavState {
  path: string;
  params: Record<string, string>;
}

let currentState: NavState = { path: '/', params: {} };
const listeners = new Set<() => void>();

function getSnapshot() {
  return currentState;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function parsePath(path: string): NavState {
  const params: Record<string, string> = {};
  const parts = path.split('/').filter(Boolean);

  // /messages/:id  or  /messages/:id/info
  if (parts[0] === 'messages' && parts.length >= 2) {
    params.id = parts[1];
  }
  // /tinder/matches/:id
  if (parts[0] === 'tinder' && parts[1] === 'matches' && parts.length >= 3) {
    params.id = parts[2];
  }

  return { path, params };
}

function navigateTo(to: string) {
  currentState = parsePath(to);
  // Track last path per app group
  if (to.startsWith('/messages')) lastPaths.messages = to;
  else if (to.startsWith('/tinder')) lastPaths.tinder = to;
  listeners.forEach((fn) => fn());
}

/* ── last-path tracking for app resume ── */
const lastPaths: Record<string, string> = {
  messages: '/messages',
  tinder: '/tinder',
};

export function getLastPath(app: string): string {
  return lastPaths[app] ?? `/${app}`;
}

/* ── public hooks ── */

export function useNavState(): NavState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}

export function useNavigate() {
  return navigateTo;
}

export function useLocation() {
  const state = useNavState();
  return { pathname: state.path };
}

export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  const state = useNavState();
  return state.params as T;
}