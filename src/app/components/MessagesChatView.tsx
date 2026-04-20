import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from '../navigation';
import { ChevronLeft, Camera, ArrowUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CONTACTS, AVATAR_GRADIENTS, Message } from '../data/messagesData';
import { getMessages, addMessage, markRead, useMessagesStore } from '../data/messageStore';

export function MessagesChatView() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const contact = CONTACTS.find((c) => c.id === id) ?? CONTACTS[0];
  const [g1, g2] = AVATAR_GRADIENTS[contact.gradientIndex];

  // Use global store for persistent messages
  const storeSnapshot = useMessagesStore();
  const messages = getMessages(id ?? '');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Mark as read when entering chat
  useEffect(() => {
    if (id) markRead(id);
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [storeSnapshot, isTyping]);

  function scrollToBottom() {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }

  async function handleSend() {
    const text = inputText.trim();
    if (!text) return;

    const contactId = id ?? '';
    addMessage(contactId, {
      id: String(Date.now()),
      sent: true,
      text,
      time: formatTime(new Date()),
    });
    setInputText('');

    // Simulate a reply
    if (messages.length < 20) {
      setTimeout(() => setIsTyping(true), 900);
      setTimeout(() => {
        setIsTyping(false);
        addMessage(contactId, {
          id: String(Date.now() + 1),
          sent: false,
          text: getAutoReply(contact.id),
          time: formatTime(new Date()),
        });
      }, 2600);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const lastSentIdx = [...messages].reverse().findIndex((m) => m.sent);
  const lastSentId = lastSentIdx >= 0 ? messages[messages.length - 1 - lastSentIdx].id : null;

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: 'white' }}
    >
      {/* ── Nav bar ── */}
      <div
        style={{
          paddingTop: 'env(safe-area-inset-top, 44px)',
          background: 'rgba(247,247,247,0.94)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '0.33px solid rgba(0,0,0,0.2)',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        <div className="flex items-center" style={{ height: 44 }}>
          {/* Back */}
          <button
            onClick={() => navigate('/messages')}
            className="flex items-center gap-0.5 pl-2"
            style={{ color: '#007AFF', minWidth: 80, height: 44, fontSize: '17px', position: 'relative', zIndex: 2 }}
          >
            <ChevronLeft size={22} />
            <span>Messages</span>
          </button>

          {/* Center: avatar + name (absolute, pointer-events: none so back button works) */}
          <div
            className="absolute left-0 right-0 flex flex-col items-center justify-center"
            style={{ top: 'env(safe-area-inset-top, 44px)', height: 44, pointerEvents: 'none' }}
          >
            <button
              style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
              onClick={() => navigate(`/messages/${id}/info`)}
            >
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: 28,
                  height: 28,
                  background: `linear-gradient(135deg, ${g1}, ${g2})`,
                  marginBottom: 1,
                }}
              >
                <span style={{ color: 'white', fontSize: '11px', fontWeight: 500 }}>{contact.initial}</span>
              </div>
              <div className="flex items-center gap-0.5">
                <span style={{ color: '#000', fontSize: '11px', fontWeight: 400 }}>{contact.name}</span>
                <span style={{ color: 'rgba(0,0,0,0.3)', fontSize: '12px' }}>›</span>
              </div>
            </button>
          </div>

          {/* Right: info */}
          <div className="ml-auto pr-4" style={{ position: 'relative', zIndex: 2 }}>
            <button
              onClick={() => navigate(`/messages/${id}/info`)}
              style={{ color: '#007AFF', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
            >
              <Info size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Messages area ── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-4"
        style={{ background: 'white', overscrollBehavior: 'contain' }}
      >
        {messages.map((msg, idx) => {
          const prev = messages[idx - 1];
          const next = messages[idx + 1];
          const isFirstInGroup = !prev || prev.sent !== msg.sent;
          const isLastInGroup = !next || next.sent !== msg.sent;
          const showDateLabel = !!msg.dateLabel;
          const isLastSent = msg.id === lastSentId;

          const sentR = msg.sent
            ? isFirstInGroup && isLastInGroup
              ? '18px 18px 5px 18px'
              : isFirstInGroup
              ? '18px 18px 10px 18px'
              : isLastInGroup
              ? '18px 18px 5px 18px'
              : '18px 18px 10px 18px'
            : undefined;
          const recvR = !msg.sent
            ? isFirstInGroup && isLastInGroup
              ? '18px 18px 18px 5px'
              : isFirstInGroup
              ? '18px 18px 18px 10px'
              : isLastInGroup
              ? '18px 18px 18px 5px'
              : '18px 18px 18px 10px'
            : undefined;

          return (
            <div key={msg.id}>
              {showDateLabel && (
                <div className="flex justify-center mb-3 mt-2">
                  <span style={{ color: '#8E8E93', fontSize: '11px' }}>{msg.dateLabel}</span>
                </div>
              )}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="flex"
                style={{
                  justifyContent: msg.sent ? 'flex-end' : 'flex-start',
                  marginBottom: isLastInGroup ? 8 : 2,
                  transformOrigin: msg.sent ? 'right bottom' : 'left bottom',
                }}
              >
                {!msg.sent && (
                  <div
                    className="rounded-full flex items-center justify-center flex-shrink-0 self-end mr-2"
                    style={{
                      width: 28,
                      height: 28,
                      background: isLastInGroup ? `linear-gradient(135deg, ${g1}, ${g2})` : 'transparent',
                    }}
                  >
                    {isLastInGroup && (
                      <span style={{ color: 'white', fontSize: '11px', fontWeight: 500 }}>{contact.initial}</span>
                    )}
                  </div>
                )}

                <div
                  style={{
                    maxWidth: '72%',
                    background: msg.sent ? '#007AFF' : '#E9E9EB',
                    borderRadius: msg.sent ? sentR : recvR,
                    padding: '8px 13px',
                  }}
                >
                  <p
                    style={{
                      color: msg.sent ? 'white' : '#000',
                      fontSize: '17px',
                      lineHeight: 1.3,
                      letterSpacing: '-0.2px',
                      wordBreak: 'break-word',
                    }}
                  >
                    {msg.text}
                  </p>
                </div>
              </motion.div>

              {isLastSent && isLastInGroup && (
                <p
                  style={{
                    color: '#8E8E93',
                    fontSize: '11px',
                    textAlign: 'right',
                    marginBottom: 8,
                    marginTop: -4,
                  }}
                >
                  Read {msg.time}
                </p>
              )}
            </div>
          );
        })}

        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="flex items-end gap-2 mb-2"
              style={{ transformOrigin: 'left bottom' }}
            >
              <div
                className="rounded-full flex items-center justify-center flex-shrink-0"
                style={{ width: 28, height: 28, background: `linear-gradient(135deg, ${g1}, ${g2})` }}
              >
                <span style={{ color: 'white', fontSize: '11px', fontWeight: 500 }}>{contact.initial}</span>
              </div>
              <div
                className="flex items-center gap-1 px-4 py-3 rounded-2xl"
                style={{ background: '#E9E9EB', borderRadius: '18px 18px 18px 5px' }}
              >
                <TypingDots />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Input bar ── */}
      <div
        style={{
          background: 'rgba(247,247,247,0.94)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '0.33px solid rgba(0,0,0,0.2)',
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 6,
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 6px)',
          flexShrink: 0,
        }}
      >
        <div className="flex items-end gap-2">
          <button
            className="rounded-full flex items-center justify-center flex-shrink-0"
            style={{ width: 32, height: 32, background: '#E9E9EB', marginBottom: 1 }}
          >
            <Camera size={16} color="#8E8E93" />
          </button>

          <div
            className="flex-1 relative"
            style={{
              border: '0.5px solid #C7C7CC',
              borderRadius: 17,
              minHeight: 34,
              background: 'white',
            }}
          >
            <textarea
              ref={inputRef}
              className="w-full bg-transparent outline-none resize-none"
              placeholder="iMessage"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              style={{
                fontSize: '17px',
                color: '#000',
                padding: '7px 38px 7px 12px',
                minHeight: 34,
                maxHeight: 100,
                overflowY: inputText.split('\n').length > 3 ? 'auto' : 'hidden',
              }}
            />
            <motion.button
              onClick={handleSend}
              animate={{ opacity: inputText.trim() ? 1 : 0, scale: inputText.trim() ? 1 : 0.7 }}
              className="absolute rounded-full flex items-center justify-center"
              style={{
                right: 3,
                bottom: 3,
                width: 28,
                height: 28,
                background: '#007AFF',
              }}
            >
              <ArrowUp size={14} color="white" strokeWidth={3} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Home indicator ── */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 6px)',
          paddingTop: 2,
          background: 'rgba(247,247,247,0.94)',
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
            width: 8,
            height: 8,
            background: '#8E8E93',
            animation: `iosBounce 1.1s ease-in-out ${i * 0.18}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes iosBounce {
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

const REPLIES: Record<string, string[]> = {
  emma: ['Hey you 😊', 'I love you too ❤️', 'More than you know', "You're scaring me", 'Okay'],
  jake: ['Yooo 👋', "Yeah I'm down", 'What time?', 'facts facts facts'],
  mom: ['Hi sweetheart! 🥰 How are you? Did you eat today?', 'I love you too sweetheart! So much! 😘 Call me when you can!', 'Make sure you drink water!', "Don't forget to call grandma"],
  dad: ['👍', 'Proud of you.', "We'll talk soon.", 'Take care of yourself.'],
  arjun: ['cool', '👌', 'will do', 'noted'],
  agnes: ['Call me at your earliest convenience.', 'This is time sensitive.', 'I understand, thank you.'],
};
function getAutoReply(contactId: string): string {
  const list = REPLIES[contactId] ?? ['okay', 'got it', '👍'];
  return list[Math.floor(Math.random() * list.length)];
}
