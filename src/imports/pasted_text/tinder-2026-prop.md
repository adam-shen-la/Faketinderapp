# Figma Make — Film Prop Tinder App (2026 Edition)

## Project Context

Design a pixel-perfect **Tinder 2026** replica for use as an interactive film prop. Actors will hold and operate this app on camera during shooting. The UI must be indistinguishable from the real Tinder app launched globally in March 2026 (the "Sparks 2026" redesign). Built as a PWA web app (runs in a mobile browser, installed to home screen). All UI text in English.

This app is part of a two-app prop package (Messages + Tinder) with a shared fake iOS home screen. Reference the separate Messages prompt for the shared home screen visual system.

---

## CRITICAL DESIGN REFERENCE — Tinder Sparks 2026

Following Tinder's March 2026 keynote, the app has undergone its biggest redesign in years. Key characteristics:

- **Full-screen profile photos** — photos fill edge-to-edge, no card margins
- **Edge blur** — subtle blur at photo edges where info overlays
- **Liquid glass Like/Nope bar** — semi-transparent blurred action bar, iOS 26 liquid glass material
- **Cleaner, more minimal** — less chrome, more photo
- **Rounded corners on everything** — 24px radius is common

This is NOT the classic 2018-2023 Tinder look (with cards floating on gray background with shadows). The 2026 version is immersive and edge-to-edge.

---

## BRAND SYSTEM

**Logo:** Lowercase `tinder` wordmark, custom font (proprietary, use close equivalent — rounded geometric sans). Paired with the flame icon.

**Flame icon:** Tinder's signature red/pink gradient flame, simplified silhouette.

**Colors:**
- Primary gradient: `#FD297B` → `#FE5268` → `#FF655B` (pink to red-orange)
- Pure Tinder pink: `#FE3C72`
- Super Like blue: `#24A0ED`
- Boost purple: `#A020F0`
- Gold (premium): `#FFD700`
- Rewind yellow: `#F2CF45`

**Typography:**
- Headings: rounded bold sans (Gotham Rounded Bold, or fallback to system rounded: `-apple-system-rounded`, `SF Pro Rounded`)
- Body: `-apple-system`, `SF Pro Text`

---

## SCREEN 1 — Main Swipe View (Discover)

### Layout (top to bottom)

**Status bar** (44px + safe-area-inset-top): white or black text depending on photo brightness (should animate with photo change). Time left, signal/wifi/battery right.

**Top app bar** (56px) — liquid glass, `backdrop-filter: blur(30px)` over photo:
- Left: profile avatar (32px circle) → tapping goes to own profile
- Center: lowercase `tinder` wordmark + flame, 22px bold pink gradient
- Right: notification bell icon → with red dot badge if messages

### Profile Card (fills remaining screen)

**Full-bleed photo:** 
- Entire card area filled with current photo
- No border, no shadow, no card chrome
- `border-radius: 24px` only at top (bottom flows under action bar)
- Photo indicator pills at top (one short horizontal bar per photo, active bar is white, inactive is white 30% opacity), small margin from top

**Gradient overlay at bottom:**
- Linear gradient: transparent at 40% height → `rgba(0,0,0,0.75)` at bottom
- Ensures text legibility on any photo

**Profile info overlay** (bottom of photo, above action bar):
- Name + age: 32px bold white, e.g. `Jessica, 27`
- Verified badge: small blue checkmark circle next to name (optional)
- Location with pin icon: 16px white, e.g. `📍 Brooklyn, NY`
- Distance: 14px white 80% opacity, e.g. `3 miles away`
- Short bio preview: 15px white, 2 lines max, truncated
- Interest tags: small pills with icons (Music Mode, Astrology, etc.)

**Swipe gesture stamps** (appear during drag):
- `LIKE` — appears top-left when dragging right, green `#00D68F`, rotated -15°, thick border, 48px bold
- `NOPE` — appears top-right when dragging left, red `#FF3B30`, rotated +15°, same style
- `SUPER LIKE` — appears top-center when dragging up, blue `#24A0ED`, no rotation

**Card rotation during drag:**
- Photo rotates ±10° based on horizontal drag distance
- Origin: bottom center of card
- Slightly scales (0.95) behind card is visible (next card in deck)

### Action Bar (Liquid Glass)

- Floats at bottom with 20px margin on all sides
- Width: fills remaining width minus margins
- Height: 80px
- `background: rgba(255,255,255,0.15)` + `backdrop-filter: blur(40px) saturate(180%)`
- Border: `0.5px solid rgba(255,255,255,0.3)` (light mode) or `rgba(255,255,255,0.1)` (dark)
- Border-radius: 40px (pill shape)

**5 circular buttons inside** (horizontally centered, evenly spaced):

| Button | Size | Icon | Icon color | Notes |
|---|---|---|---|---|
| Rewind | 42px | Counter-clockwise arrow | `#F2CF45` yellow | |
| Nope | 54px | X mark | `#FF3B30` red | Larger |
| Super Like | 42px | Blue star | `#24A0ED` blue | |
| Like | 54px | Heart | `#00D68F` green | Larger |
| Boost | 42px | Lightning bolt | `#A020F0` purple | |

Each button:
- White circle background with 0.5px white-30% border
- Press state: scale(0.85), brief color flash

### Bottom Tab Bar (54px)

Sits below action bar. 5 tabs, centered icons, 11px label:

1. **Home** — flame icon (filled when active, pink gradient)
2. **Explore** — compass icon
3. **Matches** — chat bubble icon, with red dot badge if unread
4. **Profile** — person icon
5. **Gold** — crown icon, gold colored

Active tab: pink gradient fill on icon + label
Inactive: gray `#8E8E93` icon and label

---

## SCREEN 2 — Match! Animation

Triggered when right-swipe results in a mutual match.

**Full-screen overlay** (replaces entire screen):

- **Background:** Dark gradient, `linear-gradient(135deg, #FD297B 0%, #FF655B 100%)` 
- Alternative: dark reddish-pink with faded blurred profile photos of both users as backdrop

**Center composition:**

1. **"It's a match!"** text
   - 48px bold, white with subtle gradient
   - Slight glow / drop shadow
   - Positioned upper third

2. **Two overlapping avatars** (centered):
   - Each: 140px circle
   - User's photo on left, match's photo on right, overlapping ~30%
   - White 4px border on each
   - Animated entrance: scale from 0 with slight rotate, settle with bounce

3. **Subtitle:** `You and Jessica liked each other.` — 16px white 90%

4. **Message input field** (pill shape, 48px tall):
   - White background 15% opacity + blur
   - Placeholder: `Say something nice…`
   - Smile/sticker icon on right

5. **Two primary buttons** (stacked):
   - `Send a message` — solid white pill button, pink gradient text, 56px, full width minus 32px margins
   - `Keep swiping` — outlined white pill button, white text, same size

**Animation sequence:**
- Confetti/sparkle particles (small white circles and hearts) falling from top
- Background pulsates subtly
- Everything appears with stagger (100ms between elements)
- Scale-in + fade-in entry

---

## SCREEN 3 — Matches List

### Top bar
- Status bar (black text on white)
- Nav bar: `Matches` title left, 28px bold, `New Messages` subtitle below 14px gray

### New Matches strip (horizontal scroll)
- Section label: `NEW MATCHES` 11px uppercase gray letter-spacing 1px
- Horizontal scroll row of circular avatars (68px each)
- White inner border, pink 2px outer border if super-like match
- Name below each, 13px center
- First item: `Likes You` glass-blur card with face grid preview + count badge (premium teaser)

### Messages section
- Section label: `MESSAGES`
- Vertical list, each row:
  - Avatar circle (56px) with status dot (green if recently active) bottom-right
  - Name (bold, 16px)
  - Last message preview (14px gray, single line, ellipsis)
  - Timestamp (12px gray, right-aligned)
  - Unread: bold text + pink dot after name
- Row height: ~76px
- Divider: 0.5px, starts after avatar

### Filter tabs at top of list
- `My Turn` / `Their Turn` / `Unread` / `Gold Likes`
- Pill shapes, active = pink fill

---

## SCREEN 4 — Chat View

### Nav bar (64px)
- Back arrow left (pink)
- Center: small avatar (40px) + name (16px bold) + `Active 5m ago` (12px gray) stacked
- Right: info icon + flag icon

### Messages area
Similar to iMessage but with Tinder color palette:

**Sent bubbles (right):**
- Background: `#FE3C72` pink (solid, not gradient — keep flat)
- White text, 16px
- Border-radius: 20px with small tail bottom-right (4px)
- Max-width 72%

**Received bubbles (left):**
- Background: `#F2F2F7` (dark: `#2C2C2E`)
- Primary text color, 16px
- Same radius style, tail bottom-left

**Match's avatar:** 32px circle to the left of received bubbles (only shown on first bubble of a group)

### Message input bar
- Background: white (dark: `#1C1C1E`) with top border
- Smile/gif icon left (pink)
- Text field center, pill shape, `Message Jessica…` placeholder
- Send button (pink when text present, gray when empty)

### Special: Tinder Message Features (optional for prop)
- Photo attachment button (camera icon) — visual only, doesn't need to work
- GIF picker button — visual only
- Voice message button — visual only

---

## SCREEN 5 — Own Profile

Less detail needed for prop. Basic structure:
- Large photo at top (edge-to-edge)
- Settings gear top-right
- Name + age overlay on photo
- Below: profile edit card with:
  - Photos grid (up to 9 slots, 3×3)
  - Bio section
  - Interests section
  - Music Mode card (Spotify integration, show user's anthem)
  - Astrology Mode card
- `Edit Info` primary button

---

## SCREEN 6 — Hidden Menu (Bottom Sheet)

**Note:** Per the latest prop spec, the hidden menu will live in the fake home screen's Settings icon (global). So this Tinder app doesn't need its own hidden menu. Ignore this screen.

---

## KEY DIFFERENCES FROM CLASSIC TINDER

For Figma designers who know older Tinder layouts — here's what changed in 2026:

| Old | New (2026) |
|---|---|
| Cards float with gap around them | Photos fill edge-to-edge |
| Solid white buttons with colored icons | Liquid glass (transparent blur) action bar |
| Gray background visible | Photo fills whole viewport |
| Basic gradient on Like/Nope stamps | Modern outlined style with bigger borders |
| Photo progress dots at top | Thin bar indicators (like Instagram Stories) |
| Simple top bar | Transparent liquid glass top bar |
| Square corners on some elements | 24px radius dominant everywhere |

---

## ANIMATIONS & MICRO-INTERACTIONS

- **Swipe physics:** card follows finger with slight rotation, returns with spring if released before threshold, flies off with accelerating rotation when committed
- **Photo tap zones:** left 40% = previous photo, right 60% = next photo. Transition is crossfade 180ms.
- **Match!:** confetti particle system, avatar bounce-in, button reveal cascade
- **Like tap:** big pink heart scale-up and fade at tap point
- **Super Like tap:** blue star burst + upward swoosh
- **Rewind tap:** previous card flies back in from the direction it went
- **Boost tap:** purple shimmer + banner "You're being boosted!"

All animations: 
- CSS transform + opacity only (no layout-affecting properties)
- Duration 200-400ms typical
- Easing: cubic-bezier(0.28, 0.7, 0.3, 1) (iOS-like)
- Respect `prefers-reduced-motion`

---

## DATA STRUCTURE (for engineering reference)

### Profile object
```json
{
  "id": "profile_01",
  "name": "Jessica",
  "age": 27,
  "location": "Brooklyn, NY",
  "distance": "3 miles away",
  "bio": "Coffee addict. Dog mom. Looking for someone to watch bad movies with.",
  "photos": ["url1.jpg", "url2.jpg", "url3.jpg"],
  "interests": ["music", "coffee", "dogs"],
  "verified": true,
  "order": 1,
  "ai_persona": "Flirty, witty, responds quickly. Uses emojis. Doesn't play hard to get."
}
```

### Chat Script (same format as Messages app)
```json
{
  "profile_id": "profile_01",
  "trigger": "hey",
  "replies": [
    { "pause": 1.5, "text": "hey you 😏" },
    { "pause": 2.0, "text": "what are you up to?" }
  ],
  "read_receipt": "Read 3:42 PM"
}
```

### Notification object (for the fake push system)
```json
{
  "type": "new_match" | "new_message" | "message_count",
  "from_profile_id": "profile_01",
  "content": "You have 5 unread messages!",
  "trigger_after_seconds": 10
}
```

---

## CONSTRAINTS

- **English only** — this is a US production
- Must render correctly in mobile Safari and mobile Chrome (PWA)
- Touch targets minimum 44×44px
- Safe area insets respected (bottom home indicator, notch)
- Dark mode required — Tinder has auto dark mode based on system
- No `position: fixed` that breaks safe areas
- Photos: support both remote URLs (Google Drive) and local base64

---

## WHAT NOT TO DESIGN

Not needed for this prop:
- Video Speed Dating
- Passport / travel features
- Account settings/privacy controls
- Subscription purchase flows
- Read receipt purchase
- Camera Roll Scan UI
- Events feature
- Verification flow

Focus only on the primary user journey: **swipe → match → chat**. That's what actors will be shown doing on camera.

---

## DELIVERABLE PRIORITY

If time is limited, design in this order:
1. Swipe View (Screen 1) — most-used screen on camera
2. Chat View (Screen 4) — second most-used, this is where scripted dialogue happens
3. Match Animation (Screen 2) — cinematic moment
4. Matches List (Screen 3) — transitional screen
5. Own Profile (Screen 5) — rarely shown
6. Settings — not needed, handled elsewhere

---

*This prompt is for a film production prop. Functional fidelity over feature completeness. Every visible element must look photorealistic. The director, crew, and eventually audiences in theaters must not be able to tell this from a real Tinder app.*