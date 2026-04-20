import { useNavigate, useParams } from '../navigation';
import { ChevronLeft, Phone, MessageCircle, Video, Mail } from 'lucide-react';
import { CONTACTS, CONVERSATIONS, AVATAR_GRADIENTS } from '../data/messagesData';

export function ContactInfoView() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const contact = CONTACTS.find((c) => c.id === id) ?? CONTACTS[0];
  const [g1, g2] = AVATAR_GRADIENTS[contact.gradientIndex];

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: '#F2F2F7' }}
    >
      {/* ── Nav ── */}
      <div
        style={{
          paddingTop: 'env(safe-area-inset-top, 44px)',
          background: 'rgba(247,247,247,0.94)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '0.33px solid rgba(0,0,0,0.2)',
          flexShrink: 0,
        }}
      >
        <div className="flex items-center px-4" style={{ height: 44 }}>
          <button
            onClick={() => navigate(`/messages/${id}`)}
            className="flex items-center gap-0.5"
            style={{ color: '#007AFF', fontSize: '17px', minWidth: 70, height: 44 }}
          >
            <ChevronLeft size={22} />
            <span>Back</span>
          </button>
          <div className="flex-1" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto" style={{ overscrollBehavior: 'contain' }}>
        {/* ── Hero ── */}
        <div className="flex flex-col items-center pt-8 pb-6 px-4">
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: 100,
              height: 100,
              background: `linear-gradient(135deg, ${g1}, ${g2})`,
              marginBottom: 14,
            }}
          >
            <span style={{ color: 'white', fontSize: '40px', fontWeight: 500 }}>
              {contact.initial}
            </span>
          </div>
          <p style={{ color: '#000', fontSize: '24px', fontWeight: 500, textAlign: 'center' }}>
            {contact.name}
          </p>
        </div>

        {/* ── Action buttons ── */}
        <div className="flex justify-center gap-5 px-8 mb-6">
          {[
            { icon: <MessageCircle size={22} />, label: 'message', color: '#007AFF' },
            { icon: <Phone size={22} />, label: 'call', color: '#34C759' },
            { icon: <Video size={22} />, label: 'video', color: '#34C759' },
            { icon: <Mail size={22} />, label: 'mail', color: '#007AFF' },
          ].map(({ icon, label, color }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div
                className="rounded-xl flex items-center justify-center"
                style={{ width: 54, height: 54, background: 'rgba(120,120,128,0.12)' }}
              >
                <span style={{ color }}>{icon}</span>
              </div>
              <span style={{ color: '#007AFF', fontSize: '11px' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* ── Info card ── */}
        <div
          className="mx-5 rounded-xl overflow-hidden"
          style={{ background: 'white' }}
        >
          <div
            className="flex items-center px-4"
            style={{ height: 48, borderBottom: '0.33px solid rgba(0,0,0,0.12)' }}
          >
            <span style={{ color: '#8E8E93', fontSize: '15px', minWidth: 70 }}>Phone</span>
            <span style={{ color: '#000', fontSize: '15px' }}>{contact.phone}</span>
          </div>
          <div className="flex items-start px-4" style={{ paddingTop: 12, paddingBottom: 12 }}>
            <span style={{ color: '#8E8E93', fontSize: '15px', minWidth: 70, paddingTop: 1 }}>Notes</span>
            <span style={{ color: '#000', fontSize: '15px' }}>{contact.note}</span>
          </div>
        </div>

        {/* ── Send message button ── */}
        <div className="mx-5 mt-4">
          <button
            onClick={() => navigate(`/messages/${id}`)}
            className="flex items-center gap-0.5"
            style={{ color: '#007AFF', fontSize: '17px', minWidth: 70, height: 44 }}
          >
            Send Message
          </button>
        </div>

        {/* ── Danger zone ── */}
        <div className="mx-5 mt-4 mb-8">
          <button
            className="w-full flex items-center justify-center"
            style={{
              height: 50,
              background: 'white',
              borderRadius: 12,
              color: '#FF3B30',
              fontSize: '17px',
              fontWeight: 400,
            }}
          >
            Block this Contact
          </button>
        </div>
      </div>

      {/* ── Home indicator ── */}
      <div
        style={{
          background: '#F2F2F7',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 8,
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 6px)',
          flexShrink: 0,
        }}
      >
        <button onClick={() => navigate('/')}>
          <div style={{ width: 134, height: 5, background: 'rgba(0,0,0,0.2)', borderRadius: 4 }} />
        </button>
      </div>
    </div>
  );
}