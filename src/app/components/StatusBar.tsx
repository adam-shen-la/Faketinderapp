import { useState, useEffect } from 'react';

interface StatusBarProps {
  /** 'light' = white icons (on dark/photo background), 'dark' = black icons (on white/light bg) */
  theme?: 'light' | 'dark';
}

export function StatusBar({ theme = 'light' }: StatusBarProps) {
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 10_000);
    return () => clearInterval(id);
  }, []);

  const color = theme === 'light' ? 'white' : '#000';

  return (
    <div
      style={{
        height: 'env(safe-area-inset-top, 44px)',
        minHeight: 44,
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: 6,
        paddingLeft: 16,
        paddingRight: 16,
        flexShrink: 0,
        position: 'relative',
        zIndex: 30,
      }}
    >
      {/* Time */}
      <span
        style={{
          color,
          fontSize: '15px',
          fontWeight: 700,
          letterSpacing: '-0.3px',
          flex: 1,
        }}
      >
        {time}
      </span>

      {/* Dynamic island / notch spacer */}
      <div style={{ flex: 1 }} />

      {/* Right icons: signal + wifi + battery */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 6,
        }}
      >
        {/* Signal bars */}
        <SignalIcon color={color} />
        {/* WiFi */}
        <WifiIcon color={color} />
        {/* Battery */}
        <BatteryIcon color={color} />
      </div>
    </div>
  );
}

function getTime() {
  return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function SignalIcon({ color }: { color: string }) {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={i * 4.5}
          y={12 - (i + 1) * 3}
          width="3"
          height={(i + 1) * 3}
          rx="0.7"
          fill={color}
        />
      ))}
    </svg>
  );
}

function WifiIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path
        d="M8 9.5C8.83 9.5 9.5 10.17 9.5 11S8.83 12.5 8 12.5 6.5 11.83 6.5 11 7.17 9.5 8 9.5Z"
        fill={color}
      />
      <path
        d="M8 6C9.93 6 11.68 6.78 12.95 8.05L14.36 6.64C12.73 5.02 10.48 4 8 4S3.27 5.02 1.64 6.64L3.05 8.05C4.32 6.78 6.07 6 8 6Z"
        fill={color}
      />
      <path
        d="M8 2C11.03 2 13.77 3.17 15.78 5.1L17 3.88C14.65 1.48 11.49 0 8 0S1.35 1.48-1 3.88L.22 5.1C2.23 3.17 4.97 2 8 2Z"
        fill={color}
      />
    </svg>
  );
}

function BatteryIcon({ color }: { color: string }) {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
      {/* Outer shell */}
      <rect
        x="0.5"
        y="0.5"
        width="21"
        height="11"
        rx="3.5"
        stroke={color}
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      {/* Fill (100%) */}
      <rect x="2" y="2" width="17.5" height="8" rx="2" fill={color} />
      {/* Cap nub */}
      <path
        d="M23 4.5V7.5C23.83 7.22 24.5 6.67 24.5 6S23.83 4.78 23 4.5Z"
        fill={color}
        fillOpacity="0.4"
      />
    </svg>
  );
}
