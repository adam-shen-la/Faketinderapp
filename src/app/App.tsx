import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavState } from './navigation';
import { HomeScreen } from './components/HomeScreen';
import { MessagesList } from './components/MessagesList';
import { MessagesChatView } from './components/MessagesChatView';
import { ContactInfoView } from './components/ContactInfoView';
import { SwipeView } from './components/SwipeView';
import { MatchesList } from './components/MatchesList';
import { ChatView } from './components/ChatView';
import { OwnProfile } from './components/OwnProfile';

function getGroupKey(path: string) {
  if (path === '/') return 'home';
  if (path.startsWith('/messages')) return 'messages';
  return 'tinder';
}

/**
 * Resolves path to the correct component.
 * Each "group" (home / messages / tinder) is kept mounted once visited
 * so that returning from the home screen resumes where you left off.
 */
function RouteContent({ path }: { path: string }) {
  if (path === '/') return <HomeScreen />;
  if (path === '/messages') return <MessagesList />;
  if (path.match(/^\/messages\/[^/]+\/info$/)) return <ContactInfoView />;
  if (path.match(/^\/messages\/[^/]+$/)) return <MessagesChatView />;
  if (path === '/tinder' || path === '/tinder/explore' || path === '/tinder/gold') return <SwipeView />;
  if (path === '/tinder/matches') return <MatchesList />;
  if (path.match(/^\/tinder\/matches\/[^/]+$/)) return <ChatView />;
  if (path === '/tinder/profile') return <OwnProfile />;
  return <HomeScreen />;
}

export default function App() {
  const state = useNavState();
  const currentGroup = getGroupKey(state.path);

  // Track all groups that have been visited + their latest path
  const [visitedGroups, setVisitedGroups] = useState<Record<string, string>>({
    home: '/',
  });

  // Update the visited groups when navigating
  useEffect(() => {
    setVisitedGroups((prev) => ({
      ...prev,
      [currentGroup]: state.path,
    }));
  }, [state.path, currentGroup]);

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
        {/* Render all visited groups, but only show the active one */}
        {Object.entries(visitedGroups).map(([group, groupPath]) => {
          const isActive = group === currentGroup;
          // For the active group, always use the current path
          const pathToRender = isActive ? state.path : groupPath;

          return (
            <div
              key={group}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: isActive ? 10 : 0,
                pointerEvents: isActive ? 'auto' : 'none',
                visibility: isActive ? 'visible' : 'hidden',
              }}
            >
              <RouteContent path={pathToRender} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
