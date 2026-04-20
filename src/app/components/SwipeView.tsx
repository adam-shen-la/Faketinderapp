import { useState, useRef, useCallback } from 'react';
import { useNavigate } from '../navigation';
import { Bell, RotateCcw, X, Star, Heart, Zap } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { SwipeCard, SwipeCardRef } from './SwipeCard';
import { BottomTabBar } from './BottomTabBar';
import { MatchAnimation } from './MatchAnimation';
import { StatusBar } from './StatusBar';
import { SWIPE_PROFILES, Profile, USER_PROFILE } from '../data/profiles';

export function SwipeView() {
  const navigate = useNavigate();
  const [profiles] = useState(SWIPE_PROFILES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchProfile, setMatchProfile] = useState<Profile | null>(null);
  const [dragProgress, setDragProgress] = useState(0);
  const [boosting, setBoosting] = useState(false);
  const topCardRef = useRef<SwipeCardRef>(null);

  const visibleProfiles = profiles.slice(currentIndex, currentIndex + 3);

  const handleSwipe = useCallback(
    (direction: 'like' | 'nope' | 'superlike', profile: Profile) => {
      if ((direction === 'like' || direction === 'superlike') && profile.alwaysMatch) {
        setTimeout(() => setMatchProfile(profile), 350);
      }
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setDragProgress(0);
      }, 300);
    },
    []
  );

  function handleButtonSwipe(direction: 'like' | 'nope' | 'superlike' | 'rewind' | 'boost') {
    if (direction === 'rewind') {
      setCurrentIndex((i) => Math.max(0, i - 1));
      return;
    }
    if (direction === 'boost') {
      setBoosting(true);
      setTimeout(() => setBoosting(false), 3000);
      return;
    }
    if (visibleProfiles.length === 0) return;
    topCardRef.current?.swipe(direction as 'like' | 'nope' | 'superlike');
    const topProfile = visibleProfiles[0];
    if ((direction === 'like' || direction === 'superlike') && topProfile.alwaysMatch) {
      setTimeout(() => setMatchProfile(topProfile), 650);
    }
    setTimeout(() => {
      setCurrentIndex((i) => i + 1);
      setDragProgress(0);
    }, 600);
  }

  const likeGlow = dragProgress > 30;
  const nopeGlow = dragProgress < -30;

  return (
    <div className="flex flex-col h-full relative" style={{ background: '#0d0d0d' }}>
      {/* Status bar overlaid — white icons */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 25 }}>
        <StatusBar theme="light" />
      </div>

      {/* Top app bar — liquid glass */}
      <div style={{ paddingTop: 'calc(env(safe-area-inset-top, 44px) + 0px)', flexShrink: 0 }}>
        <div
          className="flex items-center justify-between px-4"
          style={{
            height: 56,
            background: 'rgba(20,20,20,0.55)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            borderBottom: '0.5px solid rgba(255,255,255,0.08)',
            position: 'relative',
            zIndex: 20,
          }}
        >
          {/* User avatar */}
          <button
            onClick={() => navigate('/tinder/profile')}
            className="rounded-full overflow-hidden flex-shrink-0"
            style={{ width: 36, height: 36, border: '1.5px solid rgba(255,255,255,0.25)' }}
          >
            <img src={USER_PROFILE.photo} alt="Me" className="w-full h-full object-cover" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-1.5">
            <FlameIcon />
            <span
              style={{
                fontFamily: '"Nunito", "Helvetica Neue", system-ui, sans-serif',
                fontSize: '24px',
                fontWeight: 900,
                background: 'linear-gradient(90deg, #FD297B, #FE5268, #FF655B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px',
              }}
            >
              tinder
            </span>
          </div>

          {/* Bell */}
          <button
            onClick={() => navigate('/tinder/matches')}
            className="relative rounded-full flex items-center justify-center"
            style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.12)', border: '0.5px solid rgba(255,255,255,0.2)' }}
          >
            <Bell size={18} color="white" />
            <div
              className="absolute rounded-full"
              style={{ top: 6, right: 6, width: 8, height: 8, background: '#FF3B30' }}
            />
          </button>
        </div>
      </div>

      {/* Card area */}
      <div className="flex-1 relative overflow-hidden">
        {visibleProfiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div style={{ fontSize: 64, marginBottom: 16 }}>🔥</div>
            <p style={{ color: 'white', fontSize: '22px', fontWeight: 700, marginBottom: 8 }}>
              You've seen everyone!
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
              Check back later for new people nearby.
            </p>
          </div>
        ) : (
          [...visibleProfiles].reverse().map((profile, reversedIdx) => {
            const stackIndex = visibleProfiles.length - 1 - reversedIdx;
            const isTop = stackIndex === 0;
            return (
              <SwipeCard
                key={profile.id}
                ref={isTop ? topCardRef : undefined}
                profile={profile}
                isTop={isTop}
                stackIndex={stackIndex}
                onSwipe={(dir) => handleSwipe(dir, profile)}
                onDragProgress={isTop ? setDragProgress : undefined}
              />
            );
          })
        )}

        {/* Boost banner */}
        <AnimatePresence>
          {boosting && (
            <div
              className="absolute top-4 left-4 right-4 rounded-2xl flex items-center justify-center gap-2 z-30"
              style={{
                background: 'linear-gradient(135deg, #A020F0, #7010C0)',
                height: 48,
                boxShadow: '0 4px 20px rgba(160,32,240,0.5)',
              }}
            >
              <Zap size={18} color="white" fill="white" />
              <span style={{ color: 'white', fontWeight: 700, fontSize: '15px' }}>
                You're being boosted!
              </span>
            </div>
          )}
        </AnimatePresence>

        {/* Action bar — liquid glass pill */}
        <div
          className="absolute left-5 right-5 flex items-center justify-around"
          style={{
            bottom: 20,
            height: 72,
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            border: '0.5px solid rgba(255,255,255,0.3)',
            borderRadius: 40,
            zIndex: 15,
            padding: '0 12px',
            boxShadow: '0 4px 30px rgba(0,0,0,0.2)',
          }}
        >
          <ActionBtn size={42} color="#F2CF45" onClick={() => handleButtonSwipe('rewind')}>
            <RotateCcw size={18} />
          </ActionBtn>
          <ActionBtn size={56} color="#FF3B30" onClick={() => handleButtonSwipe('nope')} glow={nopeGlow}>
            <X size={26} />
          </ActionBtn>
          <ActionBtn size={42} color="#24A0ED" onClick={() => handleButtonSwipe('superlike')}>
            <Star size={18} fill="#24A0ED" />
          </ActionBtn>
          <ActionBtn size={56} color="#00D68F" onClick={() => handleButtonSwipe('like')} glow={likeGlow}>
            <Heart size={26} fill="#00D68F" />
          </ActionBtn>
          <ActionBtn size={42} color="#A020F0" onClick={() => handleButtonSwipe('boost')}>
            <Zap size={18} fill="#A020F0" />
          </ActionBtn>
        </div>
      </div>

      <BottomTabBar activeTab="home" />

      {/* Match animation overlay */}
      <AnimatePresence>
        {matchProfile && (
          <MatchAnimation
            profile={matchProfile}
            onClose={() => setMatchProfile(null)}
            onMessage={() => {
              setMatchProfile(null);
              navigate('/tinder/matches/olivia');
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ActionBtn({
  size, color, onClick, children, glow,
}: {
  size: number; color: string; onClick: () => void; children: React.ReactNode; glow?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-full transition-all active:scale-90"
      style={{
        width: size,
        height: size,
        background: glow ? `${color}22` : 'rgba(255,255,255,0.95)',
        border: glow ? `2px solid ${color}` : 'none',
        color,
        boxShadow: glow ? `0 0 16px ${color}88` : '0 2px 10px rgba(0,0,0,0.15)',
        transition: 'all 0.15s',
      }}
    >
      {children}
    </button>
  );
}

function FlameIcon() {
  return (
    <svg width="20" height="24" viewBox="0 0 18 22" fill="none">
      <path
        d="M9 0C9 0 5.5 4.5 5.5 9C5.5 9 3.5 8 3.5 6C3.5 6 0 10.5 0 14.5C0 18.64 4.03 22 9 22C13.97 22 18 18.64 18 14.5C18 9 12.5 5.5 9 0Z"
        fill="url(#navFlame2)"
      />
      <defs>
        <linearGradient id="navFlame2" x1="9" y1="0" x2="9" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FD297B" />
          <stop offset="0.5" stopColor="#FE5268" />
          <stop offset="1" stopColor="#FF655B" />
        </linearGradient>
      </defs>
    </svg>
  );
}