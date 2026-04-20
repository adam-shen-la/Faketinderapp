import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from '../navigation';
import { ChevronLeft, MoreHorizontal, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MATCHES, ChatMessage, USER_PROFILE } from '../data/profiles';
import { getTinderMessages, addTinderMessage, markTinderRead, useTinderStore } from '../data/messageStore';

export function ChatView() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const match = MATCHES.find((m) => m.id === id) || MATCHES[0];

  // Use global store for persistent messages
  const chatSnapshot = useTinderStore();
  const messages = getTinderMessages(match.id);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    markTinderRead(match.id);
  }, [match.id]);

  useEffect(() => {
    scrollToBottom();
  }, [chatSnapshot, isTyping]);

  function scrollToBottom() {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }

  async function handleSend() {
    const text = inputText.trim();
    if (!text) return;

    addTinderMessage(match.id, {
      id: String(Date.now()),
      sent: true,
      text,
      time: formatTime(new Date()),
    });
    setInputText('');

    if (messages.length < 12) {
      setTimeout(() => setIsTyping(true), 800);
      setTimeout(() => {
        setIsTyping(false);
        addTinderMessage(match.id, {
          id: String(Date.now() + 1),
          sent: false,
          text: getAutoReply(text),
          time: formatTime(new Date()),
        });
      }, 2500);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSend();
  }

  return (
    <div className="flex flex-col h-full" style={{ background: 'white' }}>

      {/* ── Nav bar ── */}
      <div
        className="flex-shrink-0"
        style={{
          paddingTop: 'env(safe-area-inset-top, 0px)',
          background: 'white',
          borderBottom: '0.5px solid rgba(0,0,0,0.12)',
        }}
      >
        <div className="flex items-center px-3 gap-2" style={{ height: 64 }}>
          <button
            onClick={() => navigate('/tinder/matches')}
            style={{ color: '#FE3C72', minWidth: 44, height: 44, display: 'flex', alignItems: 'center' }}
          >
            <ChevronLeft size={26} />
          </button>

          <div className="flex items-center gap-2.5 flex-1">
            <div
              className="rounded-full overflow-hidden flex-shrink-0"
              style={{ width: 40, height: 40, border: '1.5px solid rgba(0,0,0,0.1)' }}
            >
              <img src={match.photo} alt={match.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <p style={{ color: '#000', fontSize: '16px', fontWeight: 600, lineHeight: 1 }}>{match.name}</p>
              <p style={{ color: '#8E8E93', fontSize: '12px', marginTop: 2 }}>Active now</p>
            </div>
          </div>

          <button style={{ color: '#8E8E93', minWidth: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <MoreHorizontal size={22} />
          </button>
        </div>
      </div>

      {/* ── Match preview banner ── */}
      <div
        style={{
          flexShrink: 0,
          background: 'linear-gradient(180deg, rgba(253,41,123,0.06) 0%, transparent 100%)',
          borderBottom: '0.5px solid rgba(0,0,0,0.06)',
          padding: '20px 16px 18px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div className="flex items-center justify-center relative" style={{ height: 72 }}>
          <div
            className="rounded-full overflow-hidden"
            style={{
              width: 64, height: 64,
              border: '2.5px solid white',
              boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
              marginRight: -16, zIndex: 1,
              transform: 'rotate(-6deg)',
            }}
          >
            <img src={USER_PROFILE.photo} alt="Me" className="w-full h-full object-cover" />
          </div>
          <div
            className="rounded-full overflow-hidden"
            style={{
              width: 64, height: 64,
              border: '2.5px solid white',
              boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
              zIndex: 2,
              transform: 'rotate(6deg)',
            }}
          >
            <img src={match.photo} alt={match.name} className="w-full h-full object-cover" />
          </div>
        </div>

        <p
          style={{
            color: '#FD297B',
            fontSize: '15px',
            fontWeight: 600,
            fontFamily: '"Nunito", system-ui, sans-serif',
            textAlign: 'center',
          }}
        >
          You matched with {match.name}
        </p>
        <p style={{ color: '#8E8E93', fontSize: '12px', textAlign: 'center', marginTop: -6 }}>Say hi!</p>
      </div>

      {/* ── Messages area ── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4"
        style={{ background: 'white', overscrollBehavior: 'contain' }}
      >
        <div className="flex items-center justify-center mb-4">
          <span style={{ color: '#8E8E93', fontSize: '11px' }}>Today</span>
        </div>

        {messages.map((msg, idx) => {
          const prev = messages[idx - 1];
          const isFirstInGroup = !prev || prev.sent !== msg.sent;

          return (
            <div
              key={msg.id}
              className="flex"
              style={{
                justifyContent: msg.sent ? 'flex-end' : 'flex-start',
                marginBottom: 4,
                alignItems: 'flex-end',
                gap: 8,
              }}
            >
              {!msg.sent && (
                <div
                  className="rounded-full overflow-hidden flex-shrink-0"
                  style={{
                    width: 32, height: 32,
                    visibility: isFirstInGroup ? 'visible' : 'hidden',
                  }}
                >
                  <img src={match.photo} alt="" className="w-full h-full object-cover" />
                </div>
              )}

              <div
                className="px-4 py-2.5"
                style={{
                  maxWidth: '72%',
                  background: msg.sent ? '#FE3C72' : '#F2F2F7',
                  borderRadius: msg.sent ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                }}
              >
                <p
                  style={{
                    color: msg.sent ? 'white' : '#000',
                    fontSize: '16px',
                    lineHeight: 1.4,
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.text}
                </p>
              </div>
            </div>
          );
        })}

        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-end gap-2 mt-1"
              style={{ transformOrigin: 'left bottom' }}
            >
              <div className="rounded-full overflow-hidden flex-shrink-0" style={{ width: 32, height: 32 }}>
                <img src={match.photo} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl px-4 py-3" style={{ background: '#F2F2F7', borderRadius: '20px 20px 20px 4px' }}>
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {messages.length > 0 && messages[messages.length - 1].sent && (
          <p style={{ color: '#8E8E93', fontSize: '11px', textAlign: 'right', marginTop: 4 }}>
            Read {messages[messages.length - 1].time}
          </p>
        )}
      </div>

      {/* ── Input bar ── */}
      <div
        className="flex-shrink-0 flex items-center gap-2 px-3"
        style={{
          borderTop: '0.5px solid rgba(0,0,0,0.1)',
          background: 'white',
          paddingBottom: 8,
          paddingTop: 10,
          minHeight: 64,
        }}
      >
        <button
          style={{
            minWidth: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1.5px solid #FE3C72',
            borderRadius: 6,
          }}
        >
          <span style={{ color: '#FE3C72', fontSize: '9px', fontWeight: 800, letterSpacing: '0.5px' }}>GIF</span>
        </button>

        <div
          className="flex-1 flex items-center px-4"
          style={{ border: '0.5px solid #C7C7CC', borderRadius: 18, height: 38 }}
        >
          <input
            className="flex-1 bg-transparent outline-none"
            placeholder={`Message ${match.name}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{ color: '#000', fontSize: '15px' }}
          />
        </div>

        <motion.button
          onClick={handleSend}
          animate={{ opacity: inputText.trim() ? 1 : 0.4 }}
          className="rounded-full flex items-center justify-center flex-shrink-0"
          style={{ width: 36, height: 36, background: '#FE3C72' }}
        >
          <ArrowUp size={18} color="white" strokeWidth={3} />
        </motion.button>
      </div>

      {/* ── Home indicator ── */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 6px)',
          paddingTop: 2,
          background: 'white',
        }}
      >
        <button onClick={() => navigate('/')}>
          <div style={{ width: 134, height: 5, background: 'rgba(0,0,0,0.2)', borderRadius: 4 }} />
        </button>
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1" style={{ height: 16 }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: 7,
            height: 7,
            background: '#8E8E93',
            animation: `tinderBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes tinderBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function getAutoReply(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('drink') || lower.includes('coffee'))
    return Math.random() > 0.5 ? 'i like how you think 🍷' : 'know any good spots in soho?';
  if (lower.includes('dog'))
    return Math.random() > 0.5 ? 'OMG you have a dog???' : 'send pics immediately 🐶';
  if (lower.includes('cute') || lower.includes('pretty'))
    return Math.random() > 0.5 ? 'aww thanks 🥰' : "you're not so bad yourself";
  if (lower.includes('pizza'))
    return Math.random() > 0.5 ? 'omg a man who gets it 🍕' : "wanna grab a slice at Joe's this weekend?";
  const replies = [
    'hey you 😊',
    'finally someone with taste',
    'i could be free 😏',
    'what did you have in mind?',
    'omg yes!! 🙌',
    "okay I'm obsessed with that 😍",
    'okay we definitely need to hang 👀',
    '😊',
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}