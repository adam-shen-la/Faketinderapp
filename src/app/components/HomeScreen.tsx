import { useState, useEffect } from 'react';
import { useNavigate, getLastPath, useNavState } from '../navigation';
import { motion } from 'motion/react';

/* ─────────────────────────── helpers ─────────────────────────── */
function getTime() {
  return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}
function getDateLabel() {
  return new Date()
    .toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    .toUpperCase();
}

/* ─────────────────────────── app definitions ─────────────────── */
type AppDef = { id: string; label: string; path: string | null };

const GRID_APPS: AppDef[] = [
  { id: 'messages', label: 'Messages', path: '/messages' },
  { id: 'tinder',   label: 'Tinder',   path: '/tinder' },
  { id: 'calendar', label: 'Calendar', path: null },
  { id: 'photos',   label: 'Photos',   path: null },
  { id: 'camera',   label: 'Camera',   path: null },
  { id: 'maps',     label: 'Maps',     path: null },
  { id: 'mail',     label: 'Mail',     path: null },
  { id: 'facetime', label: 'FaceTime', path: null },
  { id: 'music',    label: 'Music',    path: null },
  { id: 'notes',    label: 'Notes',    path: null },
  { id: 'safari',   label: 'Safari',   path: null },
  { id: 'settings', label: 'Settings', path: null },
];
const DOCK_IDS = ['safari', 'messages', 'music', 'settings'];

/* ─────────────────────────── main component ─────────────────── */
export function HomeScreen() {
  const navigate = useNavigate();
  const navState = useNavState();
  const [time, setTime] = useState(getTime());
  const [dateLabel, setDateLabel] = useState(getDateLabel());
  const [isExiting, setIsExiting] = useState(false);

  // Reset exit animation when returning to home
  useEffect(() => {
    if (navState.path === '/') {
      setIsExiting(false);
    }
  }, [navState.path]);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getTime());
      setDateLabel(getDateLabel());
    }, 15_000);
    return () => clearInterval(id);
  }, []);

  async function openApp(path: string) {
    // Resume the last page within this app (e.g. /messages/emma instead of /messages)
    const appKey = path.replace('/', ''); // 'messages' or 'tinder'
    const resumePath = getLastPath(appKey);
    setIsExiting(true);
    await new Promise((r) => setTimeout(r, 380));
    navigate(resumePath);
  }

  return (
    <motion.div
      className="absolute inset-0 flex flex-col overflow-hidden select-none"
      animate={
        isExiting
          ? { scale: 1.12, opacity: 0, filter: 'blur(12px)' }
          : { scale: 1, opacity: 1, filter: 'blur(0px)' }
      }
      transition={{ duration: 0.38, ease: [0.28, 0.7, 0.3, 1] }}
      style={{
        background: `
          radial-gradient(ellipse 70% 60% at 20% 10%, rgba(139,92,246,0.85) 0%, transparent 65%),
          radial-gradient(ellipse 55% 55% at 78% 82%, rgba(219,39,119,0.75) 0%, transparent 65%),
          radial-gradient(ellipse 80% 80% at 50% 45%, rgba(67,56,202,0.45) 0%, transparent 75%),
          radial-gradient(ellipse 45% 40% at 85% 18%, rgba(59,130,246,0.55) 0%, transparent 60%),
          radial-gradient(ellipse 50% 50% at 10% 85%, rgba(168,85,247,0.45) 0%, transparent 60%),
          #0f0a2e
        `,
      }}
    >
      {/* ── Status bar ── */}
      <StatusBarRow time={time} />

      {/* ── Date + Clock ── */}
      <div className="flex flex-col items-center" style={{ marginTop: 8, gap: 2 }}>
        <span
          style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '1px',
          }}
        >
          {dateLabel}
        </span>
        <span
          style={{
            color: 'white',
            fontSize: '80px',
            fontWeight: 200,
            letterSpacing: '-4px',
            lineHeight: 0.95,
            fontFamily: '-apple-system, "SF Pro Display", system-ui',
          }}
        >
          {time}
        </span>
      </div>

      {/* ── App grid ── */}
      <div
        className="flex-1 grid px-5 pt-8 pb-4"
        style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px 0', alignContent: 'start' }}
      >
        {GRID_APPS.map((app) => (
          <AppIconCell
            key={app.id}
            app={app}
            onTap={app.path ? () => openApp(app.path!) : undefined}
          />
        ))}
      </div>

      {/* ── Dock ── */}
      <div className="px-3 pb-3">
        <div
          className="flex items-center justify-around px-4"
          style={{
            height: 80,
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            borderRadius: 28,
            border: '0.5px solid rgba(255,255,255,0.25)',
          }}
        >
          {DOCK_IDS.map((id) => {
            const app = GRID_APPS.find((a) => a.id === id)!;
            return (
              <AppIconCell
                key={id}
                app={app}
                showLabel={false}
                onTap={app.path ? () => openApp(app.path!) : undefined}
              />
            );
          })}
        </div>
      </div>

      {/* ── Home indicator ── */}
      <div
        className="flex justify-center"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 6px)', marginTop: 2 }}
      >
        <div style={{ width: 134, height: 5, background: 'rgba(255,255,255,0.85)', borderRadius: 4 }} />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────── AppIconCell ─────────────────────── */
function AppIconCell({
  app,
  showLabel = true,
  onTap,
}: {
  app: AppDef;
  showLabel?: boolean;
  onTap?: () => void;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="flex flex-col items-center" style={{ gap: 5 }}>
      <motion.button
        animate={{ scale: pressed ? 0.88 : 1 }}
        transition={{ duration: 0.1 }}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => { setPressed(false); onTap?.(); }}
        onPointerLeave={() => setPressed(false)}
        style={{
          width: 62,
          height: 62,
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: onTap ? 'pointer' : 'default',
        }}
      >
        <AppIconGraphic id={app.id} />
      </motion.button>
      {showLabel && (
        <span
          style={{
            color: 'white',
            fontSize: '11px',
            fontWeight: 400,
            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
            textAlign: 'center',
            letterSpacing: '0.1px',
          }}
        >
          {app.label}
        </span>
      )}
    </div>
  );
}

/* ─────────────────────────── StatusBarRow ────────────────────── */
function StatusBarRow({ time }: { time: string }) {
  return (
    <div
      style={{
        paddingTop: 'env(safe-area-inset-top, 14px)',
        paddingLeft: 18,
        paddingRight: 18,
        paddingBottom: 6,
        display: 'flex',
        alignItems: 'flex-end',
        flexShrink: 0,
      }}
    >
      <span style={{ color: 'white', fontSize: '15px', fontWeight: 600, flex: 1, letterSpacing: '-0.3px' }}>
        {time}
      </span>
      <div style={{ flex: 1 }} />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12">
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={i * 4.5} y={12 - (i + 1) * 3} width="3" height={(i + 1) * 3} rx="0.6" fill="white" />
      ))}
    </svg>
  );
}
function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 24 18" fill="white">
      <circle cx="12" cy="15.5" r="2" />
      <path d="M5.5 9.5 A9 9 0 0 1 18.5 9.5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M2 6 A14 14 0 0 1 22 6" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
function BatteryIcon() {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
      <rect x="2" y="2" width="17.5" height="8" rx="2" fill="white" />
      <path d="M23 4.5V7.5C23.83 7.22 24.5 6.67 24.5 6S23.83 4.78 23 4.5Z" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

/* ─────────────────────────── App Icon SVGs ───────────────────── */
function AppIconGraphic({ id }: { id: string }) {
  switch (id) {
    case 'messages':
      return (
        <svg viewBox="0 0 62 62" width="62" height="62">
          <defs>
            <linearGradient id="msgs" x1="31" y1="0" x2="31" y2="62" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5AF466" /><stop offset="1" stopColor="#00C833" />
            </linearGradient>
          </defs>
          <rect width="62" height="62" rx="14" fill="url(#msgs)" />
          <path d="M12 18C12 15.8 13.8 14 16 14H46C48.2 14 50 15.8 50 18V36C50 38.2 48.2 40 46 40H28L22 47V40H16C13.8 40 12 38.2 12 36V18Z" fill="white" />
        </svg>
      );
    case 'tinder':
      return (
        <svg viewBox="0 0 62 62" width="62" height="62">
          <defs>
            <linearGradient id="tdr" x1="31" y1="0" x2="31" y2="62" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FD297B" /><stop offset="0.5" stopColor="#FE5268" /><stop offset="1" stopColor="#FF655B" />
            </linearGradient>
          </defs>
          <rect width="62" height="62" rx="14" fill="url(#tdr)" />
          <path d="M31 7C31 7 22 18 22 27C22 27 17 24 17 19C17 19 9 29 9 37C9 46 19.5 53 31 53C42.5 53 53 46 53 37C53 24 38.5 16 31 7Z" fill="white" />
        </svg>
      );
    case 'calendar':
      return (
        <svg viewBox="0 0 62 62" width="62" height="62">
          <rect width="62" height="62" rx="14" fill="white" />
          <rect x="0" y="0" width="62" height="19" rx="14" fill="#FF3B30" />
          <rect x="0" y="5" width="62" height="14" fill="#FF3B30" />
          <text x="31" y="15" textAnchor="middle" fill="white" fontSize="10" fontWeight="600" fontFamily="-apple-system,sans-serif">MON</text>
          <text x="31" y="47" textAnchor="middle" fill="#1C1C1E" fontSize="28" fontWeight="300" fontFamily="-apple-system,sans-serif">20</text>
        </svg>
      );
    case 'photos':
      return (
        <svg viewBox="0 0 62 62" width="62" height="62">
          <rect width="62" height="62" rx="14" fill="white" />
          {/* 8-petal flower */}
          {[0,1,2,3,4,5,6,7].map((i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const cx = 31 + Math.cos(angle) * 10;
            const cy = 31 + Math.sin(angle) * 10;
            const colors = ['#FF9500','#FF3B30','#FF2D55','#AF52DE','#5856D6','#007AFF','#34C759','#FFCC00'];
            return <ellipse key={i} cx={cx} cy={cy} rx="6.5" ry="10" fill={colors[i]} transform={`rotate(${i*45} ${cx} ${cy})`} />;
          })}
          <circle cx="31" cy="31" r="7" fill="white" />
        </svg>
      );
    case 'camera':
      return (
        <svg viewBox="0 0 62 62" width="62" height="62">
          <defs>
            <linearGradient id="cam" x1="31" y1="0" x2="31" y2="62" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3A3A3C" /><stop offset="1" stopColor="#1C1C1E" />
            </linearGradient>
          </defs>
          <rect width="62" height="62" rx="14" fill="url(#cam)" />
          <rect x="10" y="20" width="42" height="28" rx="6" fill="#48484A" />
          <circle cx="31" cy="34" r="9" fill="#2C2C2E" />
          <circle cx="31" cy="34" r="6.5" fill="#636366" />
          <circle cx="31" cy="34" r="4" fill="#3A3A3C" />
          <circle cx="31" cy="34" r="2" fill="rgba(255,255,255,0.15)" />
          <circle cx="45" cy="25" r="2" fill="#636366" />
        </svg>
      );
    case 'maps':
      return (
        <svg viewBox="0 0 62 62" width="62" height="62">
          <defs>
            <linearGradient id="mps" x1="31" y1="0" x2="31" y2="62" gradientUnits="userSpaceOnUse">
              <stop stopColor="#B7EC50" /><stop offset="0.5" stopColor="#6FCF45" /><stop offset="1" stopColor="#3EB0AB" />
            </linearGradient>
          </defs>
          <rect width="62" height="62" rx="14" fill="url(#mps)" />
          {/* Road lines */}
          <path d="M0 38 Q20 30 31 31 Q42 32 62 24" stroke="rgba(255,255,255,0.5)" strokeWidth="6" fill="none" />
          <path d="M0 44 Q20 36 31 37 Q42 38 62 30" stroke="rgba(255,255,255,0.3)" strokeWidth="3" fill="none" />
          {/* Pin */}
          <path d="M31 10 C25 10 20 15 20 21 C20 29 31 42 31 42 C31 42 42 29 42 21 C42 15 37 10 31 10Z" fill="#FF3B30" />
          <circle cx="31" cy="21" r="5" fill="white" />
        </svg>
      );
    case 'mail':
      return (
        <svg viewBox="0 0 62 62" width="62" height="62">
          <defs>
            <linearGradient id="mail" x1="31" y1="0" x2="31" y2="62" gradientUnits="userSpaceOnUse">
              <stop stopColor="#53C9FD" /><stop offset="1" stopColor="#0B8CFF" />
            </linearGradient>
          </defs>
          <rect width="62" height="62" rx="14" fill="url(#mail)" />
          <rect x="9" y="19" width="44" height="30" rx="4" fill="white" />
          <path d="M9 22 L31 36 L53 22" stroke="#0B8CFF" strokeWidth="2" fill="none" />
        </svg>
      );
    case 'facetime':
      return (
        <svg viewBox="0 0 62 62" width="62" height="62">
          <defs>
            <linearGradient id="ftm" x1="31" y1="0" x2="31" y2="62" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5AF466" /><stop offset="1" stopColor="#00C833" />
            </linearGradient>
          </defs>
          <rect width="62" height="62" rx="14" fill="url(#ftm)" />
          <rect x="8" y="20" width="34" height="22" rx="5" fill="white" />
          <path d="M42 24 L54 18 L54 44 L42 38Z" fill="white" />
        </svg>
      );
    case 'music':
      return (
        <svg viewBox="0 0 62 62" width="62" height="62">
          <defs>
            <linearGradient id="msc" x1="31" y1="0" x2="31" y2="62" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FB5C74" /><stop offset="1" stopColor="#FA233B" />
            </linearGradient>
          </defs>
          <rect width="62" height="62" rx="14" fill="url(#msc)" />
          {/* Music notes */}
          <path d="M26 38 L26 20 L46 16 L46 24 L30 27 L30 42 C30 44.2 28.2 46 26 46 C23.8 46 22 44.2 22 42 C22 39.8 23.8 38 26 38Z" fill="white" />
          <path d="M42 34 C42 36.2 40.2 38 38 38 C35.8 38 34 36.2 34 34 C34 31.8 35.8 30 38 30 C40.2 30 42 31.8 42 34Z" fill="white" />
        </svg>
      );
    case 'notes':
      return (
        <svg viewBox="0 0 62 62" width="62" height="62">
          <defs>
            <linearGradient id="nts" x1="31" y1="0" x2="31" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF2A8" /><stop offset="1" stopColor="#FCDA6B" />
            </linearGradient>
          </defs>
          <rect width="62" height="62" rx="14" fill="#FEFCE8" />
          <rect x="0" y="0" width="62" height="18" rx="14" fill="url(#nts)" />
          <rect x="0" y="5" width="62" height="13" fill="url(#nts)" />
          <line x1="14" y1="30" x2="48" y2="30" stroke="#D1D1D1" strokeWidth="1.5" />
          <line x1="14" y1="38" x2="48" y2="38" stroke="#D1D1D1" strokeWidth="1.5" />
          <line x1="14" y1="46" x2="40" y2="46" stroke="#D1D1D1" strokeWidth="1.5" />
        </svg>
      );
    case 'safari':
      return (
        <svg viewBox="0 0 62 62" width="62" height="62">
          <defs>
            <radialGradient id="sfr" cx="50%" cy="50%" r="50%">
              <stop stopColor="white" /><stop offset="1" stopColor="#E0EEFF" />
            </radialGradient>
          </defs>
          <rect width="62" height="62" rx="14" fill="url(#sfr)" />
          <circle cx="31" cy="31" r="20" stroke="#2979FF" strokeWidth="2" fill="none" />
          {/* Compass ring */}
          <circle cx="31" cy="31" r="14" stroke="#C7D3E0" strokeWidth="1" fill="none" />
          {/* Red/white compass needle */}
          <path d="M31 17 L33 31 L31 29 L29 31Z" fill="#FF3B30" />
          <path d="M31 45 L29 31 L31 33 L33 31Z" fill="#8E8E93" />
        </svg>
      );
    case 'settings':
      return (
        <svg viewBox="0 0 62 62" width="62" height="62">
          <defs>
            <radialGradient id="stg" cx="40%" cy="40%" r="60%">
              <stop stopColor="#C7C7C7" /><stop offset="1" stopColor="#5A5A5A" />
            </radialGradient>
          </defs>
          <rect width="62" height="62" rx="14" fill="url(#stg)" />
          {/* Gear */}
          <circle cx="31" cy="31" r="8" stroke="white" strokeWidth="3" fill="none" />
          {[0,1,2,3,4,5,6,7].map((i) => {
            const a = (i * 45 * Math.PI) / 180;
            const x1 = 31 + Math.cos(a) * 10;
            const y1 = 31 + Math.sin(a) * 10;
            const x2 = 31 + Math.cos(a) * 16;
            const y2 = 31 + Math.sin(a) * 16;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="5" strokeLinecap="round" />;
          })}
          <circle cx="31" cy="31" r="8" stroke="white" strokeWidth="3" fill="url(#stg)" />
        </svg>
      );
    default:
      return <rect width="62" height="62" rx="14" fill="#3A3A3C" />;
  }
}