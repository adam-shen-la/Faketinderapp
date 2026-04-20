import { createBrowserRouter, Outlet, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { HomeScreen } from './components/HomeScreen';
import { MessagesList } from './components/MessagesList';
import { MessagesChatView } from './components/MessagesChatView';
import { ContactInfoView } from './components/ContactInfoView';
import { SwipeView } from './components/SwipeView';
import { MatchesList } from './components/MatchesList';
import { ChatView } from './components/ChatView';
import { OwnProfile } from './components/OwnProfile';

function Root() {
  const location = useLocation();

  // Group key: transitions happen between home / tinder / messages groups
  const groupKey =
    location.pathname === '/'
      ? 'home'
      : location.pathname.startsWith('/messages')
      ? 'messages'
      : 'tinder';

  const isHome = groupKey === 'home';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100dvh',
        background: '#000',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 430,
          height: '100dvh',
          maxHeight: 932,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={groupKey}
            initial={
              isHome
                ? { opacity: 0, scale: 1.05 }
                : { opacity: 0, scale: 0.92 }
            }
            animate={{ opacity: 1, scale: 1 }}
            exit={
              isHome
                ? { opacity: 0, scale: 1.1, filter: 'blur(6px)' }
                : { opacity: 0, scale: 0.94 }
            }
            transition={{ duration: 0.38, ease: [0.28, 0.7, 0.3, 1] }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      // ── Home screen ──
      { index: true, Component: HomeScreen },

      // ── Messages app ──
      { path: 'messages', Component: MessagesList },
      { path: 'messages/:id', Component: MessagesChatView },
      { path: 'messages/:id/info', Component: ContactInfoView },

      // ── Tinder app ──
      { path: 'tinder', Component: SwipeView },
      { path: 'tinder/explore', Component: SwipeView },
      { path: 'tinder/matches', Component: MatchesList },
      { path: 'tinder/matches/:id', Component: ChatView },
      { path: 'tinder/profile', Component: OwnProfile },
      { path: 'tinder/gold', Component: SwipeView },
    ],
  },
]);