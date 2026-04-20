export interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  distance: string;
  bio: string;
  photos: string[];
  interests: string[];
  verified: boolean;
  alwaysMatch?: boolean;
}

export interface Match {
  id: string;
  name: string;
  age: number;
  photo: string;
  lastMessage?: string;
  timestamp?: string;
  unread?: boolean;
  superLiked?: boolean;
  isNew?: boolean;
}

export interface ChatMessage {
  id: string;
  sent: boolean;
  text: string;
  time: string;
}

export const USER_PROFILE = {
  name: 'Alex',
  age: 28,
  location: 'New York, NY',
  bio: "Software engineer by day, terrible chef by night. Dog lover. Looking for my partner in crime.",
  photo: 'https://images.unsplash.com/photo-1736574905057-324569436218?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
  photos: [
    'https://images.unsplash.com/photo-1736574905057-324569436218?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ],
  interests: ['🎮 Gaming', '🐶 Dogs', '☕ Coffee', '🎵 Music'],
  anthem: { title: 'Cruel Summer', artist: 'Taylor Swift' },
  sign: '♊ Gemini',
};

export const SWIPE_PROFILES: Profile[] = [
  {
    id: 'olivia',
    name: 'Olivia',
    age: 25,
    location: 'SoHo, NY',
    distance: '2 miles away',
    bio: 'Fashion designer by day, pizza connoisseur by night. Dog mom. Looking for someone with taste. 🐶🍕',
    photos: [
      'https://images.unsplash.com/photo-1759873821511-05c06ce184d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      'https://images.unsplash.com/photo-1565979612809-d90c6ca38df9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    interests: ['👗 Fashion', '🐶 Dogs', '🍕 Foodie'],
    verified: true,
    alwaysMatch: true,
  },
  {
    id: 'emma',
    name: 'Emma',
    age: 24,
    location: 'Manhattan, NY',
    distance: '5 miles away',
    bio: 'Art history student by day, amateur chef by night 🎨🍝 Ask me about my sourdough.',
    photos: [
      'https://images.unsplash.com/photo-1758272420706-36a5b46a673d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    interests: ['🎨 Art', '🍕 Foodie', '✈️ Travel'],
    verified: false,
  },
  {
    id: 'mia',
    name: 'Mia',
    age: 25,
    location: 'Jersey City, NJ',
    distance: '6 miles away',
    bio: 'Yoga teacher. Plant collector. Currently learning guitar 🌿🎸',
    photos: [
      'https://images.unsplash.com/photo-1760552069335-07d43ca826f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    interests: ['🧘 Yoga', '🌿 Plants', '♈ Astrology'],
    verified: true,
    alwaysMatch: false,
  },
  {
    id: 'luna',
    name: 'Luna',
    age: 28,
    location: 'Hoboken, NJ',
    distance: '8 miles away',
    bio: 'Actress / writer. Lover of dive bars and rooftop sunsets 🌅 Probably reading right now.',
    photos: [
      'https://images.unsplash.com/photo-1570666291894-f46aef938a73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    interests: ['🎭 Theater', '✍️ Writing', '🍸 Cocktails'],
    verified: false,
  },
  {
    id: 'yuki',
    name: 'Yuki',
    age: 26,
    location: 'NYC',
    distance: '2 miles away',
    bio: 'Fashion designer. Always chasing the next adventure ✨ Tokyo → NYC',
    photos: [
      'https://images.unsplash.com/photo-1611261948613-795501ef0a34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    ],
    interests: ['👗 Fashion', '📸 Photography', '🌸 Art'],
    verified: true,
  },
];

export const MATCHES: Match[] = [
  {
    id: 'olivia',
    name: 'Olivia',
    age: 25,
    photo: 'https://images.unsplash.com/photo-1759873821511-05c06ce184d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    lastMessage: 'what did you have in mind?',
    timestamp: 'now',
    unread: true,
    isNew: true,
  },
];

export const CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  olivia: [
    { id: '1', sent: true, text: 'hey', time: '3:20 PM' },
    { id: '2', sent: false, text: 'hey you 😊', time: '3:21 PM' },
    { id: '3', sent: false, text: 'finally someone with taste', time: '3:21 PM' },
    { id: '4', sent: true, text: 'what are you up to this weekend?', time: '3:25 PM' },
    { id: '5', sent: false, text: 'i could be free 😏', time: '3:27 PM' },
    { id: '6', sent: false, text: 'what did you have in mind?', time: '3:27 PM' },
  ],
};