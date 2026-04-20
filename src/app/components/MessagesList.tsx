import { useState } from 'react';
import { useNavigate } from '../navigation';
import { Edit, SlidersHorizontal, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CONTACTS, CONVERSATIONS, AVATAR_GRADIENTS, Contact, Conversation } from '../data/messagesData';
import { useMessagesStore, useUnreadStore, getMessages } from '../data/messageStore';

const FILTERS = ['All Messages', 'Unread', 'Drafts'];

export function MessagesList() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All Messages');
  const [swipedId, setSwipedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [composeOpen, setComposeOpen] = useState(false);

  // Use global stores for live data
  const msgState = useMessagesStore();
  const unreadState = useUnreadStore();

  // Build live conversation list from store
  const liveConversations = CONVERSATIONS.map((c) => {
    const msgs = getMessages(c.contactId);
    const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1] : null;
    return {
      ...c,
      lastMessage: lastMsg ? (lastMsg.sent ? `You: ${lastMsg.text}` : lastMsg.text) : c.lastMessage,
      unreadCount: unreadState[c.contactId] ?? c.unreadCount,
    };
  });

  const totalUnread = liveConversations.reduce((s, c) => s + c.unreadCount, 0);

  let filtered = liveConversations;
  if (activeFilter === 'Unread') filtered = liveConversations.filter((c) => c.unreadCount > 0);
  if (searchText) {
    filtered = liveConversations.filter((c) => {
      const contact = CONTACTS.find((ct) => ct.id === c.contactId);
      return contact?.name.toLowerCase().includes(searchText.toLowerCase());
    });
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: '#F2F2F7' }}
    >
      {/* ── iOS-style top bar ── */}
      <div
        style={{
          paddingTop: 'env(safe-area-inset-top, 44px)',
          background: 'rgba(247,247,247,0.94)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '0.33px solid rgba(0,0,0,0.2)',
          flexShrink: 0,
        }}
      >
        {/* Row 1: filter + compose icons */}
        <div className="flex items-center justify-between px-4" style={{ height: 44 }}>
          <button
            style={{
              color: '#007AFF',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <SlidersHorizontal size={20} />
          </button>
          <button
            onClick={() => setComposeOpen(true)}
            style={{
              color: '#007AFF',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Edit size={20} />
          </button>
        </div>

        {/* Row 2: Title + badge */}
        <div className="px-4 pb-1">
          <div className="flex items-center gap-2">
            <h1
              style={{
                fontSize: '34px',
                fontWeight: 700,
                color: '#000',
                letterSpacing: '-0.5px',
              }}
            >
              Messages
            </h1>
            {totalUnread > 0 && (
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  background: '#007AFF',
                  minWidth: 22,
                  height: 22,
                  padding: '0 6px',
                }}
              >
                <span style={{ color: 'white', fontSize: '13px', fontWeight: 600 }}>{totalUnread}</span>
              </div>
            )}
          </div>
        </div>

        {/* Search bar */}
        <div className="px-4 pb-2">
          <div
            className="flex items-center gap-2 px-3"
            style={{
              height: 36,
              background: 'rgba(118,118,128,0.12)',
              borderRadius: 10,
            }}
          >
            <Search size={16} color="#8E8E93" />
            <input
              className="flex-1 bg-transparent outline-none"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ fontSize: '16px', color: '#000' }}
            />
            {searchText && (
              <button onClick={() => setSearchText('')}>
                <X size={16} color="#8E8E93" />
              </button>
            )}
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 px-4 pb-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="flex-shrink-0 rounded-full"
              style={{
                height: 30,
                padding: '0 14px',
                fontSize: '13px',
                fontWeight: activeFilter === f ? 600 : 400,
                background: activeFilter === f ? '#007AFF' : 'rgba(118,118,128,0.12)',
                color: activeFilter === f ? 'white' : '#8E8E93',
                transition: 'all 0.15s',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Conversation list ── */}
      <div className="flex-1 overflow-y-auto" style={{ overscrollBehavior: 'contain' }}>
        {filtered.map((conv) => {
          const contact = CONTACTS.find((ct) => ct.id === conv.contactId);
          if (!contact) return null;
          const [g1, g2] = AVATAR_GRADIENTS[contact.gradientIndex];
          const isSwiped = swipedId === conv.contactId;

          return (
            <div
              key={conv.contactId}
              className="relative"
              style={{ overflow: 'hidden' }}
            >
              {/* Swipe-behind actions */}
              <div
                className="absolute right-0 top-0 bottom-0 flex"
                style={{ zIndex: 0 }}
              >
                <div
                  className="flex items-center justify-center"
                  style={{ width: 76, background: '#007AFF' }}
                >
                  <span style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>Read</span>
                </div>
                <div
                  className="flex items-center justify-center"
                  style={{ width: 76, background: '#FF3B30' }}
                >
                  <span style={{ color: 'white', fontSize: '13px', fontWeight: 500 }}>Delete</span>
                </div>
              </div>

              {/* Conversation row */}
              <motion.div
                animate={{ x: isSwiped ? -152 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                drag="x"
                dragConstraints={{ left: -152, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(_e, info) => {
                  if (info.offset.x < -60) {
                    setSwipedId(conv.contactId);
                  } else {
                    setSwipedId(null);
                  }
                }}
                onClick={() => {
                  if (!isSwiped) navigate(`/messages/${conv.contactId}`);
                  setSwipedId(null);
                }}
                className="flex items-center gap-3 px-4 relative"
                style={{
                  height: 76,
                  background: '#F2F2F7',
                  borderBottom: '0.33px solid rgba(0,0,0,0.12)',
                  cursor: 'pointer',
                  zIndex: 1,
                }}
              >
                {/* Avatar */}
                <div
                  className="rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 50,
                    height: 50,
                    background: `linear-gradient(135deg, ${g1}, ${g2})`,
                  }}
                >
                  <span style={{ color: 'white', fontSize: '19px', fontWeight: 500 }}>
                    {contact.initial}
                  </span>
                </div>

                {/* Name + preview */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p
                      style={{
                        color: '#000',
                        fontSize: '16px',
                        fontWeight: conv.unreadCount > 0 ? 700 : 400,
                        lineHeight: 1,
                      }}
                    >
                      {contact.name}
                    </p>
                    <p
                      style={{
                        color: conv.unreadCount > 0 ? '#007AFF' : '#8E8E93',
                        fontSize: '14px',
                        flexShrink: 0,
                        marginLeft: 8,
                      }}
                    >
                      {conv.timestamp}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <p
                      style={{
                        color: '#8E8E93',
                        fontSize: '14px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: 1,
                      }}
                    >
                      {conv.lastMessage}
                    </p>
                    {conv.unreadCount > 0 && (
                      <div
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: '#007AFF',
                          minWidth: 20,
                          height: 20,
                          padding: '0 5px',
                        }}
                      >
                        <span style={{ color: 'white', fontSize: '12px', fontWeight: 600 }}>
                          {conv.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ── Home indicator ── */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 6px)',
          paddingTop: 8,
          background: '#F2F2F7',
        }}
      >
        <button onClick={() => navigate('/')}>
          <div style={{ width: 134, height: 5, background: 'rgba(0,0,0,0.2)', borderRadius: 4 }} />
        </button>
      </div>
    </div>
  );
}
