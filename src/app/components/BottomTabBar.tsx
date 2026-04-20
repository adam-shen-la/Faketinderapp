import { useNavigate, useLocation } from '../navigation';
import { Compass, MessageCircle, User, Crown } from 'lucide-react';
import { MATCHES } from '../data/profiles';

const unreadCount = MATCHES.filter((m) => m.unread).length;
const newMatchCount = MATCHES.filter((m) => m.isNew).length;

export function BottomTabBar({ activeTab }: { activeTab?: string }) {
  const navigate = useNavigate();
  const location = useLocation();

  function getActive() {
    if (activeTab) return activeTab;
    const p = location.pathname;
    if (p === '/tinder' || p === '/tinder/explore') return 'home';
    if (p.startsWith('/tinder/matches')) return 'matches';
    if (p === '/tinder/profile') return 'profile';
    if (p === '/tinder/gold') return 'gold';
    return 'home';
  }

  const active = getActive();
  const PINK = '#FE3C72';
  const INACTIVE = 'rgba(255,255,255,0.4)';

  return (
    <div
      style={{
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '0.5px solid rgba(255,255,255,0.1)',
      }}
    >
      <div
        style={{
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        {/* Home */}
        <TabBtn onClick={() => navigate('/tinder')}>
          <FlameTabIcon active={active === 'home'} />
        </TabBtn>

        {/* Explore */}
        <TabBtn onClick={() => navigate('/tinder/explore')}>
          <Compass size={26} color={active === 'explore' ? PINK : INACTIVE} />
        </TabBtn>

        {/* Matches */}
        <TabBtn onClick={() => navigate('/tinder/matches')}>
          <div className="relative">
            <MessageCircle size={26} color={active === 'matches' ? PINK : INACTIVE} />
            {newMatchCount > 0 && active !== 'matches' && (
              <div
                className="absolute rounded-full"
                style={{
                  top: -3,
                  right: -3,
                  width: 8,
                  height: 8,
                  background: PINK,
                }}
              />
            )}
          </div>
        </TabBtn>

        {/* Profile */}
        <TabBtn onClick={() => navigate('/tinder/profile')}>
          <User size={26} color={active === 'profile' ? PINK : INACTIVE} />
        </TabBtn>

        {/* Gold */}
        <TabBtn onClick={() => navigate('/tinder/gold')}>
          <Crown size={26} color={active === 'gold' ? '#FFD700' : INACTIVE} />
        </TabBtn>
      </div>

      {/* Safe area + home indicator */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 4px)',
          paddingTop: 4,
        }}
      >
        <button onClick={() => navigate('/')}>
          <div
            style={{
              width: 134,
              height: 5,
              background: 'rgba(255,255,255,0.5)',
              borderRadius: 4,
            }}
          />
        </button>
      </div>
    </div>
  );
}

function TabBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        minWidth: 44,
        minHeight: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      {children}
    </button>
  );
}

function FlameTabIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="26" viewBox="0 0 18 22" fill="none">
      <path
        d="M9 0C9 0 5.5 4.5 5.5 9C5.5 9 3.5 8 3.5 6C3.5 6 0 10.5 0 14.5C0 18.64 4.03 22 9 22C13.97 22 18 18.64 18 14.5C18 9 12.5 5.5 9 0Z"
        fill={active ? 'url(#tabFlame2)' : 'rgba(255,255,255,0.4)'}
      />
      <defs>
        <linearGradient id="tabFlame2" x1="9" y1="0" x2="9" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FD297B" />
          <stop offset="0.5" stopColor="#FE5268" />
          <stop offset="1" stopColor="#FF655B" />
        </linearGradient>
      </defs>
    </svg>
  );
}