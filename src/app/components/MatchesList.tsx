import { useState } from 'react';
import { useNavigate } from '../navigation';
import { Search } from 'lucide-react';
import { BottomTabBar } from './BottomTabBar';
import { MATCHES } from '../data/profiles';
import { useTinderMatchStore } from '../data/messageStore';

const FILTER_TABS = ['My Turn', 'Their Turn', 'Unread', 'Gold Likes'];

export function MatchesList() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('My Turn');

  const liveMatches = useTinderMatchStore();
  const newMatches = liveMatches.filter((m) => m.isNew);
  const conversations = liveMatches.filter((m) => !m.isNew);

  return (
    <div className="flex flex-col h-full" style={{ background: '#F2F2F7' }}>
      {/* Nav bar */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4"
        style={{
          height: 56,
          background: 'rgba(247,247,247,0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '0.5px solid rgba(0,0,0,0.12)',
        }}
      >
        <div style={{ minWidth: 36 }} />
        <p
          style={{
            color: '#000',
            fontSize: '18px',
            fontWeight: 700,
            fontFamily: '"Nunito", system-ui, sans-serif',
            letterSpacing: '-0.3px',
          }}
        >
          Matches
        </p>
        <button style={{ color: '#FE3C72', minWidth: 36, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Search size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ overscrollBehavior: 'contain', background: 'white' }}>

        {/* ── New Matches section ── */}
        <div style={{ borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          <p
            className="px-4 pt-4 pb-2"
            style={{ color: '#8E8E93', fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}
          >
            New Matches
          </p>

          <div className="flex gap-3 overflow-x-auto px-4 pb-4" style={{ scrollbarWidth: 'none' }}>
            {/* Likes You teaser */}
            <div className="flex-shrink-0 flex flex-col items-center" style={{ width: 72 }}>
              <div
                className="rounded-full overflow-hidden relative flex-shrink-0"
                style={{
                  width: 68, height: 68,
                  background: 'linear-gradient(135deg, #FD297B, #FF655B)',
                  border: '2px solid #FE3C72',
                  boxSizing: 'border-box',
                }}
              >
                <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', opacity: 0.4, filter: 'blur(3px)' }}>
                  <img src="https://images.unsplash.com/photo-1570666291894-f46aef938a73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200" className="w-full h-full object-cover" alt="" />
                  <img src="https://images.unsplash.com/photo-1632227899642-743d963c8bfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200" className="w-full h-full object-cover" alt="" />
                </div>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '17px', fontWeight: 900, color: 'white', lineHeight: 1 }}>99+</span>
                  <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>Likes</span>
                </div>
              </div>
              <p style={{ color: '#8E8E93', fontSize: '12px', marginTop: 6, textAlign: 'center' }}>Likes You</p>
            </div>

            {/* New match avatars */}
            {newMatches.map((match) => (
              <button
                key={match.id}
                onClick={() => navigate(`/tinder/matches/${match.id}`)}
                className="flex-shrink-0 flex flex-col items-center"
                style={{ width: 72 }}
              >
                <div
                  className="rounded-full overflow-hidden"
                  style={{
                    width: 68,
                    height: 68,
                    border: `2px solid ${match.superLiked ? '#24A0ED' : '#FE3C72'}`,
                    boxSizing: 'border-box',
                  }}
                >
                  <img src={match.photo} alt={match.name} className="w-full h-full object-cover" />
                </div>
                <p style={{ color: '#000', fontSize: '12px', marginTop: 6, textAlign: 'center', fontWeight: 500 }}>
                  {match.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* ── Filter tabs ── */}
        <div className="px-4 py-3 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none', borderBottom: '0.5px solid rgba(0,0,0,0.08)' }}>
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className="flex-shrink-0 rounded-full"
              style={{
                height: 32,
                padding: '0 14px',
                fontSize: '13px',
                fontWeight: activeFilter === tab ? 700 : 400,
                background: activeFilter === tab ? 'linear-gradient(90deg, #FD297B, #FF655B)' : 'rgba(0,0,0,0.06)',
                color: activeFilter === tab ? 'white' : '#8E8E93',
                border: activeFilter === tab ? 'none' : '0.5px solid rgba(0,0,0,0.1)',
                transition: 'all 0.15s',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Messages section ── */}
        <p
          className="px-4 pt-4 pb-2"
          style={{ color: '#8E8E93', fontSize: '11px', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}
        >
          Messages
        </p>

        {conversations.length === 0 && (
          <div className="flex justify-center py-16 px-8">
            <p style={{ color: '#8E8E93', fontSize: '15px', textAlign: 'center', lineHeight: 1.7 }}>
              No matches yet. Keep swiping! 🔥
            </p>
          </div>
        )}

        {conversations.map((match, idx) => (
          <button
            key={match.id}
            onClick={() => navigate(`/tinder/matches/${match.id}`)}
            className="w-full flex items-center gap-3 px-4"
            style={{
              height: 76,
              borderBottom: idx < conversations.length - 1 ? '0.5px solid rgba(0,0,0,0.07)' : 'none',
              background: 'white',
            }}
          >
            {/* Avatar + online dot */}
            <div className="relative flex-shrink-0">
              <div className="rounded-full overflow-hidden" style={{ width: 58, height: 58 }}>
                <img src={match.photo} alt={match.name} className="w-full h-full object-cover" />
              </div>
              <div
                className="absolute rounded-full"
                style={{ width: 12, height: 12, background: '#34C759', border: '2px solid white', bottom: 1, right: 1 }}
              />
            </div>

            {/* Name + message */}
            <div className="flex-1 min-w-0 text-left">
              <p style={{ color: '#000', fontSize: '16px', fontWeight: match.unread ? 700 : 600, lineHeight: 1 }}>
                {match.name}
              </p>
              <p
                style={{
                  color: match.unread ? '#000' : '#8E8E93',
                  fontSize: '14px',
                  fontWeight: match.unread ? 500 : 400,
                  marginTop: 3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {match.lastMessage}
              </p>
            </div>

            {/* Timestamp */}
            <p style={{ color: '#8E8E93', fontSize: '12px', flexShrink: 0 }}>{match.timestamp}</p>
          </button>
        ))}
      </div>

      <BottomTabBar activeTab="matches" />
    </div>
  );
}