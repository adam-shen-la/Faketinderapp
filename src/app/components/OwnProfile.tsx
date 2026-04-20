import { useNavigate } from '../navigation';
import { Settings, Edit3, MapPin, ChevronLeft } from 'lucide-react';
import { BottomTabBar } from './BottomTabBar';
import { USER_PROFILE } from '../data/profiles';

const PHOTO_SLOTS = [
  USER_PROFILE.photo,
  'https://images.unsplash.com/photo-1736574905057-324569436218?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  null, null, null, null,
];

export function OwnProfile() {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: '#111',
      }}
    >
      {/* Nav bar */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4"
        style={{
          height: 56,
          background: 'rgba(20,20,20,0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '0.5px solid rgba(255,255,255,0.1)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <button
          onClick={() => navigate('/tinder')}
          style={{ color: '#FE3C72', minWidth: 36, minHeight: 44, display: 'flex', alignItems: 'center' }}
        >
          <ChevronLeft size={26} />
        </button>
        <p style={{ color: 'white', fontSize: '18px', fontWeight: 700 }}>My Profile</p>
        <button style={{ color: 'rgba(255,255,255,0.6)', minWidth: 36, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Settings size={22} />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto" style={{ overscrollBehavior: 'contain' }}>
        {/* Hero photo */}
        <div className="relative" style={{ height: 340 }}>
          <img
            src={USER_PROFILE.photo}
            alt={USER_PROFILE.name}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.85) 100%)',
            }}
          />
          {/* Name overlay */}
          <div className="absolute bottom-4 left-4">
            <p
              style={{ color: 'white', fontSize: '28px', fontWeight: 700, lineHeight: 1 }}
            >
              {USER_PROFILE.name}, {USER_PROFILE.age}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={13} color="rgba(255,255,255,0.8)" />
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>
                {USER_PROFILE.location}
              </span>
            </div>
          </div>
        </div>

        {/* Profile cards */}
        <div className="px-4 py-4 flex flex-col gap-4">
          {/* Photo grid card */}
          <ProfileCard title="Photos">
            <div
              className="grid gap-1.5"
              style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
            >
              {PHOTO_SLOTS.map((src, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden relative"
                  style={{
                    aspectRatio: '3/4',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1.5px dashed rgba(255,255,255,0.2)',
                  }}
                >
                  {src ? (
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '28px' }}>+</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ProfileCard>

          {/* Bio card */}
          <ProfileCard title="About me">
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: '1.6' }}>
              {USER_PROFILE.bio}
            </p>
          </ProfileCard>

          {/* Interests */}
          <ProfileCard title="Interests">
            <div className="flex flex-wrap gap-2">
              {USER_PROFILE.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full px-3 py-1.5"
                  style={{
                    background: 'rgba(254,60,114,0.15)',
                    border: '1px solid rgba(254,60,114,0.4)',
                    color: '#FE3C72',
                    fontSize: '13px',
                    fontWeight: 500,
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </ProfileCard>

          {/* Music Mode */}
          <ProfileCard title="Music Mode">
            <div className="flex items-center gap-3">
              <div
                className="rounded-xl overflow-hidden flex-shrink-0"
                style={{
                  width: 52,
                  height: 52,
                  background: 'linear-gradient(135deg, #1DB954, #157a38)',
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span style={{ fontSize: 24 }}>🎵</span>
                </div>
              </div>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  My Anthem
                </p>
                <p style={{ color: 'white', fontSize: '15px', fontWeight: 600 }}>
                  {USER_PROFILE.anthem.title}
                </p>
                <p style={{ color: '#8E8E93', fontSize: '13px' }}>
                  {USER_PROFILE.anthem.artist}
                </p>
              </div>
              <div className="ml-auto">
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{ width: 36, height: 36, background: '#1DB954' }}
                >
                  <span style={{ color: 'white', fontSize: '14px' }}>▶</span>
                </div>
              </div>
            </div>
          </ProfileCard>

          {/* Astrology Mode */}
          <ProfileCard title="Astrology Mode">
            <div className="flex items-center gap-3">
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: 52,
                  height: 52,
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  fontSize: 26,
                }}
              >
                {USER_PROFILE.sign.split(' ')[0]}
              </div>
              <div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Birth Chart
                </p>
                <p style={{ color: 'white', fontSize: '15px', fontWeight: 600 }}>
                  {USER_PROFILE.sign}
                </p>
                <p style={{ color: '#8E8E93', fontSize: '13px' }}>
                  Add your birth date & time
                </p>
              </div>
            </div>
          </ProfileCard>

          {/* Edit button */}
          <button
            className="w-full rounded-2xl flex items-center justify-center gap-2"
            style={{
              height: 54,
              background: 'linear-gradient(90deg, #FD297B, #FF655B)',
              marginBottom: 16,
            }}
          >
            <Edit3 size={18} color="white" />
            <span style={{ color: 'white', fontSize: '16px', fontWeight: 700 }}>
              Edit Info
            </span>
          </button>
        </div>
      </div>

      <BottomTabBar activeTab="profile" />
    </div>
  );
}

function ProfileCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl p-4"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '0.5px solid rgba(255,255,255,0.08)',
      }}
    >
      <p
        style={{
          color: 'white',
          fontSize: '16px',
          fontWeight: 700,
          marginBottom: 12,
        }}
      >
        {title}
      </p>
      {children}
    </div>
  );
}