import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Profile, USER_PROFILE } from '../data/profiles';
import { Smile } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MatchAnimationProps {
  profile: Profile;
  onClose: () => void;
  onMessage: () => void;
}

export function MatchAnimation({ profile, onClose, onMessage }: MatchAnimationProps) {
  const [inputVal, setInputVal] = useState('');
  const hasLaunched = useRef(false);

  useEffect(() => {
    if (hasLaunched.current) return;
    hasLaunched.current = true;

    // Confetti burst
    const end = Date.now() + 1500;
    const colors = ['#FD297B', '#FE5268', '#FF655B', '#ffffff', '#ffcc00'];

    function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
        gravity: 0.8,
        scalar: 0.9,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
        gravity: 0.8,
        scalar: 0.9,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    }
    frame();
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        background: 'linear-gradient(135deg, #FD297B 0%, #FE5268 50%, #FF655B 100%)',
      }}
    >
      {/* Blurred background blobs */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ opacity: 0.3 }}
      >
        <div
          className="absolute rounded-full"
          style={{
            width: 300,
            height: 300,
            background: 'rgba(255,255,255,0.3)',
            filter: 'blur(60px)',
            top: -80,
            left: -60,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 250,
            height: 250,
            background: 'rgba(255,255,255,0.2)',
            filter: 'blur(60px)',
            bottom: -60,
            right: -40,
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center px-8 w-full" style={{ gap: '24px' }}>
        {/* "It's a Match!" */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }}
          className="text-center"
        >
          <div
            style={{
              fontSize: '48px',
              fontWeight: 900,
              color: 'white',
              textShadow: '0 2px 20px rgba(0,0,0,0.2)',
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            It's a Match!
          </div>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
            You and {profile.name} liked each other.
          </p>
        </motion.div>

        {/* Two overlapping avatars */}
        <motion.div
          className="flex items-center justify-center relative"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 16 }}
          style={{ height: 140 }}
        >
          {/* User avatar */}
          <div
            className="rounded-full overflow-hidden border-4 border-white"
            style={{
              width: 120,
              height: 120,
              marginRight: -30,
              zIndex: 1,
              boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
            }}
          >
            <img src={USER_PROFILE.photo} alt="Me" className="w-full h-full object-cover" />
          </div>
          {/* Match avatar */}
          <div
            className="rounded-full overflow-hidden border-4 border-white"
            style={{
              width: 120,
              height: 120,
              zIndex: 2,
              boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
            }}
          >
            <img
              src={profile.photos[0]}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Message input */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <div
            className="flex items-center rounded-full px-4"
            style={{
              background: 'rgba(255,255,255,0.18)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '0.5px solid rgba(255,255,255,0.35)',
              height: 52,
            }}
          >
            <input
              className="flex-1 bg-transparent outline-none text-white placeholder-white/60"
              placeholder="Say something nice…"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              style={{ fontSize: '15px' }}
            />
            <Smile size={22} color="rgba(255,255,255,0.7)" />
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="w-full flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <button
            onClick={onMessage}
            className="w-full rounded-full flex items-center justify-center"
            style={{
              height: 56,
              background: 'white',
              fontSize: '16px',
              fontWeight: 700,
              color: '#FD297B',
            }}
          >
            Send a message
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-full flex items-center justify-center"
            style={{
              height: 56,
              background: 'transparent',
              border: '2px solid rgba(255,255,255,0.7)',
              fontSize: '16px',
              fontWeight: 600,
              color: 'white',
            }}
          >
            Keep swiping
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}