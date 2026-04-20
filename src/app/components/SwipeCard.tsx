import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useMotionValueEvent,
} from 'motion/react';
import { MapPin } from 'lucide-react';
import { Profile } from '../data/profiles';
import { useState, useRef, forwardRef, useImperativeHandle } from 'react';

interface SwipeCardProps {
  profile: Profile;
  isTop: boolean;
  stackIndex: number; // 0 = top, 1 = behind, 2 = further back
  onSwipe: (direction: 'like' | 'nope' | 'superlike') => void;
  onDragProgress?: (v: number) => void;
}

export interface SwipeCardRef {
  swipe: (direction: 'like' | 'nope' | 'superlike') => void;
}

export const SwipeCard = forwardRef<SwipeCardRef, SwipeCardProps>(
  ({ profile, isTop, stackIndex, onSwipe, onDragProgress }, ref) => {
    const [currentPhoto, setCurrentPhoto] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Rotate based on horizontal drag, anchored at bottom
    const rotate = useTransform(x, [-300, 0, 300], [-12, 0, 12]);

    // Stamp opacities
    const likeOpacity = useTransform(x, [20, 100], [0, 1]);
    const nopeOpacity = useTransform(x, [-100, -20], [1, 0]);
    const superlikeOpacity = useTransform(y, [-100, -20], [1, 0]);

    // Report drag progress to parent
    useMotionValueEvent(x, 'change', (val) => {
      onDragProgress?.(val);
    });

    useImperativeHandle(ref, () => ({
      swipe: async (direction) => {
        if (direction === 'like') {
          await animate(x, window.innerWidth + 200, { duration: 0.35, ease: [0.28, 0.7, 0.3, 1] });
          onSwipe('like');
        } else if (direction === 'nope') {
          await animate(x, -(window.innerWidth + 200), { duration: 0.35, ease: [0.28, 0.7, 0.3, 1] });
          onSwipe('nope');
        } else if (direction === 'superlike') {
          await animate(y, -(window.innerHeight + 200), { duration: 0.35, ease: [0.28, 0.7, 0.3, 1] });
          onSwipe('superlike');
        }
      },
    }));

    async function handleDragEnd(_: unknown, info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }) {
      const OFFSET = 100;
      const VEL = 500;

      if (info.offset.x > OFFSET || info.velocity.x > VEL) {
        await animate(x, window.innerWidth + 200, { duration: 0.35, ease: [0.28, 0.7, 0.3, 1] });
        onSwipe('like');
      } else if (info.offset.x < -OFFSET || info.velocity.x < -VEL) {
        await animate(x, -(window.innerWidth + 200), { duration: 0.35, ease: [0.28, 0.7, 0.3, 1] });
        onSwipe('nope');
      } else if (info.offset.y < -OFFSET || info.velocity.y < -VEL) {
        await animate(y, -(window.innerHeight + 200), { duration: 0.35, ease: [0.28, 0.7, 0.3, 1] });
        onSwipe('superlike');
      } else {
        animate(x, 0, { type: 'spring', stiffness: 280, damping: 22 });
        animate(y, 0, { type: 'spring', stiffness: 280, damping: 22 });
        onDragProgress?.(0);
      }
    }

    function handleTap(event: MouseEvent | TouchEvent | PointerEvent) {
      if (!isTop) return;
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const clientX = 'clientX' in event ? event.clientX : (event as TouchEvent).touches?.[0]?.clientX ?? 0;
      const tapX = clientX - rect.left;
      if (tapX < rect.width * 0.4) {
        setCurrentPhoto((p) => Math.max(0, p - 1));
      } else {
        setCurrentPhoto((p) => Math.min(profile.photos.length - 1, p + 1));
      }
    }

    // Stack visual offsets
    const scaleVal = stackIndex === 0 ? 1 : stackIndex === 1 ? 0.96 : 0.92;
    const yOffset = stackIndex === 0 ? 0 : stackIndex === 1 ? 10 : 20;

    return (
      <motion.div
        className="absolute inset-0"
        animate={{ scale: scaleVal, y: isTop ? 0 : yOffset }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{ zIndex: 10 - stackIndex, originX: 0.5, originY: 1 }}
      >
        <motion.div
          ref={cardRef}
          className="absolute inset-0"
          drag={isTop}
          dragElastic={0.7}
          onDragEnd={isTop ? handleDragEnd : undefined}
          onTap={isTop ? handleTap : undefined}
          style={{ x: isTop ? x : 0, y: isTop ? y : 0, rotate: isTop ? rotate : 0, originX: 0.5, originY: 1 }}
        >
          {/* Card */}
          <div
            className="absolute inset-0 overflow-hidden select-none"
            style={{ borderRadius: '24px 24px 0 0' }}
          >
            {/* Photo */}
            <img
              src={profile.photos[currentPhoto]}
              alt={profile.name}
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
            />

            {/* Photo indicator bars */}
            {profile.photos.length > 1 && (
              <div className="absolute top-3 left-3 right-3 flex gap-1 z-10 pointer-events-none">
                {profile.photos.map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-full"
                    style={{
                      height: '3px',
                      background: i === currentPhoto ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.35)',
                      transition: 'background 0.2s',
                    }}
                  />
                ))}
              </div>
            )}

            {/* Bottom gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.8) 100%)',
              }}
            />

            {/* LIKE stamp */}
            {isTop && (
              <motion.div
                className="absolute top-20 left-5 rounded-xl px-4 py-2 pointer-events-none"
                style={{
                  opacity: likeOpacity,
                  border: '4px solid #00D68F',
                  transform: 'rotate(-15deg)',
                }}
              >
                <span
                  style={{
                    color: '#00D68F',
                    fontSize: '42px',
                    fontWeight: 900,
                    letterSpacing: '2px',
                    lineHeight: 1,
                    display: 'block',
                  }}
                >
                  LIKE
                </span>
              </motion.div>
            )}

            {/* NOPE stamp */}
            {isTop && (
              <motion.div
                className="absolute top-20 right-5 rounded-xl px-4 py-2 pointer-events-none"
                style={{
                  opacity: nopeOpacity,
                  border: '4px solid #FF3B30',
                  transform: 'rotate(15deg)',
                }}
              >
                <span
                  style={{
                    color: '#FF3B30',
                    fontSize: '42px',
                    fontWeight: 900,
                    letterSpacing: '2px',
                    lineHeight: 1,
                    display: 'block',
                  }}
                >
                  NOPE
                </span>
              </motion.div>
            )}

            {/* SUPER LIKE stamp */}
            {isTop && (
              <motion.div
                className="absolute top-20 left-0 right-0 flex justify-center pointer-events-none"
                style={{ opacity: superlikeOpacity }}
              >
                <div
                  className="rounded-xl px-4 py-2"
                  style={{ border: '4px solid #24A0ED' }}
                >
                  <span
                    style={{
                      color: '#24A0ED',
                      fontSize: '36px',
                      fontWeight: 900,
                      letterSpacing: '2px',
                      lineHeight: 1,
                      display: 'block',
                    }}
                  >
                    SUPER LIKE
                  </span>
                </div>
              </motion.div>
            )}

            {/* Profile info */}
            <div
              className="absolute left-4 right-4 pointer-events-none"
              style={{ bottom: '108px' }}
            >
              {/* Name + age + verified */}
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-white"
                  style={{ fontSize: '30px', fontWeight: 700, lineHeight: 1.1 }}
                >
                  {profile.name}, {profile.age}
                </span>
                {profile.verified && (
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{ width: 24, height: 24, background: '#24A0ED' }}
                  >
                    <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                      <path
                        d="M1.5 5L5 8.5L11.5 1.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="flex items-center gap-1 mb-0.5">
                <MapPin size={14} color="rgba(255,255,255,0.9)" />
                <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
                  {profile.location}
                </span>
              </div>

              {/* Distance */}
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginBottom: '8px' }}>
                {profile.distance}
              </p>

              {/* Bio */}
              <p
                style={{
                  color: 'rgba(255,255,255,0.92)',
                  fontSize: '14px',
                  lineHeight: '1.4',
                  marginBottom: '10px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {profile.bio}
              </p>

              {/* Interest tags */}
              <div className="flex flex-wrap gap-1.5">
                {profile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      color: 'white',
                      fontSize: '12px',
                      padding: '4px 12px',
                      border: '0.5px solid rgba(255,255,255,0.25)',
                    }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

SwipeCard.displayName = 'SwipeCard';