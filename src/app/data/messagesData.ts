export interface Contact {
  id: string;
  name: string;
  initial: string;
  phone: string;
  note: string;
  gradientIndex: number;
}

export interface Message {
  id: string;
  sent: boolean;
  text: string;
  time: string;
  dateLabel?: string;
}

export interface Conversation {
  contactId: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: Message[];
}

export const AVATAR_GRADIENTS: [string, string][] = [
  ['#FF6B6B', '#FF4757'],
  ['#4ECDC4', '#26D0CE'],
  ['#FFA07A', '#FF7F50'],
  ['#95E1D3', '#3FC1C9'],
  ['#F38181', '#AA96DA'],
  ['#B8B5FF', '#7978FF'],
  ['#FCBAD3', '#FF8FA3'],
  ['#FFE66D', '#FFA502'],
];

export const CONTACTS: Contact[] = [
  {
    id: 'emma',
    name: 'Emma',
    initial: 'E',
    phone: '+1 (212) 555-0171',
    note: 'Girlfriend ❤️',
    gradientIndex: 6,
  },
  {
    id: 'jake',
    name: 'Jake',
    initial: 'J',
    phone: '+1 (917) 555-0143',
    note: 'College buddy',
    gradientIndex: 1,
  },
  {
    id: 'mom',
    name: 'Mom',
    initial: 'M',
    phone: '+1 (718) 555-0102',
    note: 'Call every Sunday 💛',
    gradientIndex: 2,
  },
  {
    id: 'dad',
    name: 'Dad',
    initial: 'D',
    phone: '+1 (718) 555-0103',
    note: '❤️',
    gradientIndex: 7,
  },
  {
    id: 'arjun',
    name: 'Arjun',
    initial: 'A',
    phone: '+1 (646) 555-0187',
    note: 'Work — product team',
    gradientIndex: 3,
  },
  {
    id: 'agnes',
    name: 'Agnes Lawyer',
    initial: 'A',
    phone: '+1 (212) 555-0198',
    note: 'Civil attorney',
    gradientIndex: 5,
  },
];

export const CONVERSATIONS: Conversation[] = [
  {
    contactId: 'emma',
    lastMessage: 'hey where are you??',
    timestamp: '2:41 PM',
    unreadCount: 2,
    messages: [
      { id: '1', sent: true, text: 'hey beautiful', time: '3:40 PM', dateLabel: 'Today 3:40 PM' },
      { id: '2', sent: false, text: 'Hey you 😊', time: '3:40 PM' },
      { id: '3', sent: true, text: 'i love you', time: '3:41 PM' },
      { id: '4', sent: false, text: 'I love you too ❤️', time: '3:42 PM' },
      { id: '5', sent: false, text: 'More than you know', time: '3:42 PM' },
    ],
  },
  {
    contactId: 'jake',
    lastMessage: 'You: yeah dude',
    timestamp: '1:15 PM',
    unreadCount: 0,
    messages: [
      { id: '1', sent: true, text: 'yo', time: '1:10 PM', dateLabel: 'Today 1:10 PM' },
      { id: '2', sent: false, text: 'Yooo 👋', time: '1:11 PM' },
      { id: '3', sent: true, text: 'you around tonight?', time: '1:12 PM' },
      { id: '4', sent: false, text: 'Yeah I\'m down', time: '1:14 PM' },
      { id: '5', sent: false, text: 'What time?', time: '1:15 PM' },
    ],
  },
  {
    contactId: 'mom',
    lastMessage: "Did you eat lunch? I'm worried about you sweetie",
    timestamp: '11:22 AM',
    unreadCount: 1,
    messages: [
      { id: '1', sent: true, text: 'hi mom', time: '9:05 AM', dateLabel: 'Today 9:05 AM' },
      { id: '2', sent: false, text: 'Hi sweetheart! 🥰 How are you? Did you eat today?', time: '9:08 AM' },
      { id: '3', sent: true, text: 'i love you', time: '10:12 AM' },
      { id: '4', sent: false, text: 'I love you too sweetheart! So much! 😘 Call me when you can!', time: '10:14 AM' },
    ],
  },
  {
    contactId: 'dad',
    lastMessage: 'I love you.',
    timestamp: 'Yesterday',
    unreadCount: 10,
    messages: [
      { id: '1', sent: false, text: 'Hello, Charlotte. This is your dad.', time: '8:14 AM', dateLabel: 'Monday 8:14 AM' },
      { id: '2', sent: false, text: 'I hope New York is treating you well.', time: '8:15 AM' },
      { id: '3', sent: false, text: 'The weather is getting colder here.', time: '9:02 AM', dateLabel: 'Tuesday 9:02 AM' },
      { id: '4', sent: false, text: 'Remember to wear a sweater.', time: '9:03 AM' },
      { id: '5', sent: false, text: 'Your mother misses you.', time: '7:41 AM', dateLabel: 'Wednesday 7:41 AM' },
      { id: '6', sent: false, text: 'Have you talked to your sister?', time: '10:15 AM', dateLabel: 'Thursday 10:15 AM' },
      { id: '7', sent: false, text: 'She is going through a difficult time.', time: '10:16 AM' },
      { id: '8', sent: false, text: 'Please be patient with her.', time: '10:17 AM' },
      { id: '9', sent: false, text: 'Alright... please call me when you can.', time: '11:22 AM', dateLabel: 'Friday 11:22 AM' },
      { id: '10', sent: false, text: 'I love you.', time: '11:23 AM' },
    ],
  },
  {
    contactId: 'arjun',
    lastMessage: 'You: sounds good',
    timestamp: 'Yesterday',
    unreadCount: 0,
    messages: [
      { id: '1', sent: false, text: 'Hey, pushing the standup to 11?', time: '9:30 AM', dateLabel: 'Sun 9:30 AM' },
      { id: '2', sent: true, text: 'sounds good', time: '9:45 AM' },
    ],
  },
  {
    contactId: 'agnes',
    lastMessage: 'Please call me back when you can.',
    timestamp: 'Monday',
    unreadCount: 3,
    messages: [
      { id: '1', sent: false, text: 'Hi, this is Agnes from the law office.', time: '3:42 PM', dateLabel: 'Mon 3:42 PM' },
      { id: '2', sent: false, text: 'We need to discuss your case before the deadline.', time: '3:43 PM' },
      { id: '3', sent: false, text: 'Please call me back when you can.', time: '3:44 PM' },
    ],
  },
];