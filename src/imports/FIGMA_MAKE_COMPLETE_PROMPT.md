# Figma Make — Film Prop Phone App (Complete UI System)

## Project Overview

Design a pixel-perfect interactive phone prop for a feature film production. Actors will hold and operate this app on camera during shooting. The app runs as a PWA (Progressive Web App) on iPhones and Androids — installed to the home screen, fully offline-capable, looks exactly like a real iOS phone.

The prop consists of **one unified experience** with three parts:
1. **Fake iOS Home Screen** — launcher with app icons
2. **Messages App** — iOS 18 iMessage replica
3. **Tinder App** — Tinder 2026 "Sparks" redesign replica

All three are bundled together and share a consistent visual system. When an actor taps an app icon, it zooms open with the signature iOS animation; swiping up from the bottom closes it back to the home screen.

**All UI text in English. US production.**

---

## CRITICAL DESIGN PRINCIPLES

1. **Photorealistic fidelity** — audiences must not be able to tell this from a real phone in any shot, including close-ups.
2. **iOS 18 visual language** — liquid glass materials, SF Pro/SF Pro Rounded typography, rounded corners, subtle depth through blur not shadow.
3. **One cohesive design system** — all three parts share the same base tokens (colors, typography, spacing, motion).
4. **Touch-first** — all touch targets minimum 44×44pt. Respect safe area insets (notch, home indicator).
5. **Dark mode aware** — designs must work in both light and dark mode seamlessly.

---

## GLOBAL DESIGN TOKENS

### Typography
- **Primary font:** SF Pro Text (or `-apple-system`)
- **Display font:** SF Pro Rounded (for logos, large titles)
- **Weights used:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Letter spacing:** slightly negative on larger sizes (-0.3 to -0.5px)

### Color System

**iOS System Colors:**
- iOS Blue: `#007AFF` — primary tint, links, send button
- iOS Green: `#34C759` — online status, success
- iOS Red: `#FF3B30` — delete, urgent
- iOS Orange: `#FF9500`
- iOS Gray: `#8E8E93` — secondary text
- iOS Light Gray: `#E9E9EB` — received bubble, input bg
- iOS Separator: `rgba(0,0,0,0.1)` light mode, `rgba(255,255,255,0.1)` dark

**Tinder Brand Colors:**
- Tinder Pink: `#FE3C72` — primary
- Tinder Gradient: `#FD297B → #FE5268 → #FF655B` (logo, match bg)
- Like Green: `#00D68F`
- Nope Red: `#FF3B30`
- Super Like Blue: `#24A0ED`
- Rewind Yellow: `#F2CF45`
- Boost Purple: `#A020F0`

### Motion
- Standard easing: `cubic-bezier(0.28, 0.7, 0.3, 1)` (iOS spring)
- App open/close: 400ms
- Screen transitions: 300-350ms slide
- Micro-interactions: 150-220ms
- Respect `prefers-reduced-motion`

### Radii
- Small elements (pills, buttons): 8–12px
- Medium (cards, inputs): 16–20px
- Large (app icons, modal corners): 22–28px
- Pill shapes: `radius = height/2`

### Glass Materials
- Light glass: `rgba(255,255,255,0.18)` + `backdrop-filter: blur(30px) saturate(180%)`
- Dark glass: `rgba(0,0,0,0.55)` + same blur
- Used for: status bar, top nav bars, action bars, dock

---

# PART 1 — FAKE iOS HOME SCREEN

The entry point. Simulates an iPhone home screen with app icons arranged in a grid + a dock at the bottom.

## Layout

**Wallpaper:** Multi-radial gradient background with purple + pink + blue blobs over dark navy (`#1e1b4b → #312e81`). Looks like a dreamy, non-photographic wallpaper.

**Vertical stack (top to bottom):**
1. Status bar (44pt)
2. Date label (small, uppercase, tracked wide)
3. Large clock (86px, ultra-light weight)
4. App grid (4 columns × 3 rows)
5. Dock (4 icons, glass material)
6. Home indicator bar (5px white pill)

## Status Bar (global — appears on every screen)

- 44pt height + safe area top inset
- Left: time `9:41` (SF Pro, 16px, weight 600, letter-spacing -0.3)
- Right: signal bars, WiFi icon, battery pill
- Color adapts: white text on dark backgrounds, black on light ones (animates on app switch)

## App Grid

4 columns, 12 apps in the demo:

### Apps to design (with icon treatment):

**Messages** — green gradient square `#5AF466 → #00C833`, white speech bubble  
**Tinder** — pink gradient square `#FE5268 → #FD297B`, white flame  
**Calendar** — white, red "MON" text top, black "14" big number  
**Photos** — white, classic iOS 8-petal radial flower (yellow/orange/red/pink/purple/blue/cyan/green)  
**Camera** — dark gray, simple lens outline  
**Maps** — green gradient `#B7EC50 → #6FCF45 → #3EB0AB`, red pin centered  
**Mail** — blue gradient `#53C9FD → #0B8CFF`, white envelope with V fold  
**Settings** — gray radial `#B3B3B3 → #6B6B6B`, thin gear outline  
**Music** — red-pink gradient `#FB5C74 → #FA233B`, two eighth notes  
**Notes** — yellow gradient top band `#FFF2A8 → #FCDA6B`, thin ruled lines  
**Safari** — blue radial `#fff → #2979FF`, compass needle (red/white)  

### App Icon Spec
- 62×62pt rounded square, border-radius 14px
- Very subtle shadow `0 1px 3px rgba(0,0,0,0.35)`
- Label below: 12px SF Pro, white with 1px dark text-shadow

## Dock

- Horizontal strip at bottom, 12pt horizontal margin, 12-14pt internal padding
- Glass background (light glass)
- Border-radius: 28px (pill)
- 4 icons in a row: Safari, Messages, Music, Settings (no labels in dock)
- Above safe area home indicator

## Clock / Date

- Date: "MONDAY, OCTOBER 14" — 14px, weight 500, letter-spacing 1px, 85% opacity
- Clock: huge 86px, weight 300, letter-spacing -3px, line-height 0.95
- Both centered, stacked, white

## App Open Animation

When user taps an app icon:
1. Home screen scales up to 1.4× and blurs out (400ms, opacity fades to 0)
2. The app view scales up from 0.28× with rounded corners 14px → 0, opacity 0→1 (400ms)
3. Status bar text color transitions dark/light depending on target app

On close (swipe up):
1. Reverse of the above, 350ms

---

# PART 2 — MESSAGES APP (iOS 18 iMessage)

## Screens to design

1. Conversation list
2. Chat view
3. Contact info
4. New message modal

---

## Screen 2.1 — Conversation List (Main Messages View)

### Top bar (glass)
- Padding-top = safe-area-inset-top + 4pt
- Background: `rgba(247,247,247,0.94)` + blur(20) saturate(180%)
- Border-bottom: 0.33px hairline

**Row 1 — Nav buttons:**
- Left: hamburger/filter icon (22px, stroke 2, iOS blue)
- Right: compose icon (22px pencil-in-square, iOS blue)
- Both have 44×44pt touch target

**Row 2 — Title:**
- "Messages" — 34px, weight 700, letter-spacing -0.5, padding 0 16pt 8pt
- Left-aligned (NOT centered — iOS 18 large title style)

**Row 3 — Filter pills (horizontal scroll):**
- "All Messages" (active, blue `#007AFF` bg, white text)
- "Unread"
- "Drafts"
- Each pill: 6px vertical, 14px horizontal padding, radius 16, font 14px weight 500
- Inactive pills: bg `#E9E9EB`, text black
- 8px gap between pills

**Row 4 — Search bar:**
- Rounded rect, bg `#E9E9EB`, height 36px, radius 10
- Magnifier icon (15px, gray `#8E8E93`) + placeholder "Search" (16px, gray)

### Conversation rows
Each row:
- Full width, 10px vertical padding, 16px horizontal
- Hairline border bottom `rgba(0,0,0,0.1)`

**Row contents (left to right):**
1. Unread indicator: 10×10px blue circle `#007AFF` (or empty 10px spacer if read)
2. Avatar: 56×56 circle, colored gradient background, white single letter initial (20px, weight 500)
3. Middle stack:
   - Name: 17px, weight 600, letter-spacing -0.2
   - Preview: 15px, gray `#8E8E93`, max 2 lines with ellipsis
4. Right column:
   - Time: 14px, gray
   - Chevron: `›` thin, 14px, gray 50% opacity

### Swipe-to-reveal actions
Swiping a row LEFT reveals two buttons hidden behind it:
- "Mute" — 80px wide, gray `#8E8E93` bg, white text
- "Delete" — 80px wide, red `#FF3B30` bg, white text
- Row translates left by 160px with spring animation
- Tap elsewhere or swipe right to close

### Avatar color palette
6 gradient combos — one assigned per contact via stable hash:
- `#FF6B6B → #FF4757` (coral)
- `#4ECDC4 → #26D0CE` (teal)
- `#FFA07A → #FF7F50` (peach)
- `#95E1D3 → #3FC1C9` (mint)
- `#F38181 → #AA96DA` (rose-purple)
- `#B8B5FF → #7978FF` (lavender)
- `#FCBAD3 → #FF8FA3` (pink)
- `#FFE66D → #FFA502` (amber)

### Demo contacts (6)
Design placeholder rows showing:
- **Emma** (girlfriend) — "hey where are you??" · 2:41 PM · 2 unread
- **Jake** (friend) — "You: yeah dude" · 1:15 PM · read
- **Mom** — "Did you eat lunch? I'm worried about you sweetie" · 11:22 AM · 1 unread
- **Dad** — "I love you." · Yesterday · 10 unread *(emotional anchor row)*
- **Arjun** (work) — "You: sounds good" · Yesterday · read
- **Agnes Lawyer** — "Please call me back when you can." · Monday · 3 unread

---

## Screen 2.2 — Chat View

Slides in from the right (350ms spring) when a conversation is tapped.

### Top nav bar (glass)
- Same glass as list nav
- Height: 64pt + safe area top

**Left side:**
- Back chevron `‹` + "Messages" label, iOS blue, 17px

**Center (absolute positioned, centered):**
- Vertical stack: small 32×32 avatar + contact name below
- Name: 11px, black, weight 400, with small `›` chevron beside (suggests tappable)
- Tappable → opens Contact Info view

### Messages area
- White background, fills remaining height
- Scroll view, bottom-anchored

**Timestamp dividers:**
- Centered, 11px gray
- Example: **Mon 3:42 PM**
- Shown when messages group changes time context

**Sent bubbles (right aligned):**
- Background: iOS blue `#007AFF`
- Text: white, 17px, line-height 1.3, letter-spacing -0.2
- Padding: 8px 13px
- Border-radius: 18px all corners EXCEPT bottom-right is 5px (tail)
- Max-width: 72% of screen width
- Entry animation: scale 0.5 → 1 with bounce, 220ms, origin bottom-right

**Received bubbles (left aligned):**
- Background: `#E9E9EB`
- Text: black, same size specs
- Same border-radius style, tail on bottom-left
- Entry animation origin: bottom-left

**Consecutive bubbles** (same sender in a row): inner corner radii reduce to 5px, outer stay 18px — creates a flowing "grouped" look.

**Read receipt:**
- Right-aligned, 11px gray, below last sent bubble
- Text: "Read 3:42 PM" or "Delivered"
- Only shown on most recent sent if next message is received or if it's the last message

**Typing indicator:**
- Received-style bubble with 3 animated dots
- Dots: 8×8px, gray `#8E8E93`, bounce up 5px with stagger (180ms between each)
- Full animation cycle: 1.1s

### Input bar (glass)
- Padding: 6px 10px
- Padding-bottom: 42px + safe area inset bottom
- Border-top: hairline
- Background: same glass as nav

**Contents (left to right):**
1. Camera button: 32×32 circle, gray bg `#E9E9EB`, camera icon 18×18, gray `#8E8E93`
2. Text input + inline send button (relative positioned):
   - Text area: flex 1, min-height 34px, max 100px
   - Border: 0.5px gray `#C7C7CC`, radius 17px
   - Padding: 7px 34px 7px 12px (right padding accounts for send button)
   - Placeholder: "iMessage", 17px gray
   - Send button: absolute positioned right: 3px bottom: 3px, 28×28 blue circle `#007AFF`
   - Send icon: white up-arrow, 14×14
   - Disabled state: opacity 0 (button fades away when input is empty)

---

## Screen 2.3 — Contact Info View

Slides in from right when user taps contact name in chat.

### Nav
- Back button: `‹ Back`, iOS blue, 17px

### Body (gray bg `#F2F2F7`)

**Hero section:**
- Large 100×100 avatar circle, centered, same gradient as list avatar but bigger
- Initial text: 40px, weight 500, white
- 16px gap below
- Contact name: 24px, weight 500, centered

**Info card:**
- White rounded card, 10px radius, 20px margins, 0 padding
- Two rows, separated by 0.33px hairline:
  - "Phone" label (15px gray) + phone number (15px black)
  - "Notes" label (15px gray) + note text (15px black)
- 12px vertical, 16px horizontal padding per row

---

## Screen 2.4 — New Message Modal

Slides UP from bottom (300ms spring) when compose icon is tapped.

### Nav
- Left: "Cancel" button, iOS blue, 17px
- Center: "New Message" title, 17px, weight 600
- Right: placeholder (empty 50px for visual balance)

### To: field
- Horizontal strip below nav, 8px vertical padding, hairline bottom
- "To:" label (15px gray) + text input (15px black)
- Placeholder: "Type a name or phone"
- Auto-focuses on open

### Contact suggestions list
- Section header: "CONTACTS" — 13px gray uppercase, 14px padding, gray bg `#F2F2F7` band
- Then list of contacts using same row style as main list (avatar + name + phone + chevron)
- Tapping a row: close modal + open that contact's chat view

---

# PART 3 — TINDER APP (Tinder 2026 "Sparks" Edition)

Following Tinder's March 2026 redesign, the app moved to a full-bleed, immersive, glassmorphic aesthetic.

## Screens to design

1. Swipe / Discover (main card deck)
2. Match! overlay
3. Matches list
4. Chat
5. Own profile (minimal — rarely on camera)

---

## Screen 3.1 — Swipe View

Dark theme by default. Entire screen fills with the profile photo.

### Top bar (glass over photo)
- Height: 56pt + safe area top
- Background: `rgba(255,255,255,0.12)` + blur(30) sat(180%)
- Border-bottom: 0.5px white 15%

**Contents:**
- Left: profile button, 36×36 circle, light glass, person silhouette (stroke white)
- Center: Tinder logo — lowercase "tinder" wordmark + small flame icon
  - Flame: gradient fill `#FE5268 → #FD297B`, ~26×26px
  - Wordmark: 24px, weight 700, letter-spacing -0.5, gradient `#FD297B → #FE5268 → #FF655B`, SF Pro Rounded
- Right: notification bell button, 36×36 circle, light glass

### Card stack area (fills remaining height above action bar)

**Card structure (each card):**

*Full-bleed photo* — fills entire card area, no margin, no border, no shadow on card itself (card IS the photo).

*Photo progress bars* (top of card, Instagram Stories style):
- 12pt from top, 12pt side margins
- One bar per photo, equal widths, 3px tall, radius 3
- Active: white `#fff`
- Inactive: white 35%
- 4px gap between bars
- For 3 photos: 3 bars fill the width evenly

*Gradient overlay at bottom:*
- Linear gradient transparent (from 40% height) → `rgba(0,0,0,0.75)` at bottom
- Ensures text is legible on any photo

*Info overlay (absolute bottom):*
- Padding 120px 20px 24px (top padding is huge so info sits low)
- Name: 30px, weight 600, letter-spacing -0.5, white
- Inline age: 28px, weight 400 (e.g., "Jessica 27")
- Verified badge (optional): small 18×18 blue `#24A0ED` circle with white ✓, inline next to name
- Location row: 📍 emoji + city name, 14px, 95% white
- Distance: 13px, 80% white (e.g., "3 miles away")
- Bio: 14px, line-height 1.45, max 2 lines with overflow hidden
- Interest tags row: horizontal pills, each 4px 9px padding, radius 20, white 18% bg + 25% border, small blur backdrop, 11px text

*Swipe stamps (appear during drag):*
- "LIKE": top-left, green `#00D68F`, 44px bold, 4px border, radius 10, rotate -18°, letter-spacing 2px, text-shadow for punch
- "NOPE": top-right, red `#FF3B30`, same style but rotate +18°
- "SUPER LIKE": top-center, blue `#24A0ED`, 40px (slightly smaller), no rotation
- All opacity 0 by default, fade in based on drag distance

### Card stack depth
- Front card: full size, active gestures
- Second card (behind): scale(0.95), brightness(0.85), no pointer events
- Third card: scale(0.90), brightness(0.70), z-index below

### Action bar (floats above bottom tabs, glass)
- 72pt tall
- 20pt margin from left, right, and bottom (50pt from bottom + safe area)
- Radius 40 (pill)
- Background: `rgba(255,255,255,0.18)` + blur(40) sat(180%)
- Border: 0.5px white 30%
- Shadow: `0 4px 30px rgba(0,0,0,0.2)`

**5 circular buttons evenly spaced:**

| Button | Size | Icon stroke color | Icon |
|---|---|---|---|
| Rewind | 42px | `#F2CF45` yellow | counter-clockwise arrow |
| Nope | 56px | `#FF3B30` red | X mark |
| Super Like | 42px | `#24A0ED` blue | filled star |
| Like | 56px | `#00D68F` green | filled heart |
| Boost | 42px | `#A020F0` purple | filled lightning bolt |

- All buttons: white circular background, no border
- Press state: scale(0.88) for 100ms

### Bottom tab bar (dark glass)
- Height: 48pt + safe area bottom
- Background: `rgba(0,0,0,0.92)` + blur(20)
- Border-top: 0.5px white 10%
- 5 equal-flex tabs, centered icons, no labels
- Icons 26×26
- Active tab: Tinder pink `#FE3C72`
- Inactive: white 40%

**Tabs (order):**
1. Home (flame, filled when active)
2. Explore (compass)
3. Matches (speech bubble) — shows a 8×8 pink dot in top-right when new matches exist
4. Profile (person)
5. Gold (crown, premium)

### Gesture system (design reference for prototyping)
- Drag horizontally > 90pt → commit like (right) / nope (left)
- Drag vertically up > 90pt → commit super like
- Card rotates ±8° based on drag X distance
- On commit: card flies off screen 450ms ease-out with rotation continuing
- On release below threshold: spring back to center
- Tap on card without dragging: left 40% = previous photo, right 60% = next photo

---

## Screen 3.2 — Match! Overlay

Full-screen takeover after a mutual right-swipe.

### Background
- Linear gradient 135°: `#FD297B 0% → #FF655B 100%`
- Confetti particles falling from top (white and gold small circles + hearts)
- Fades in over 300ms

### Contents (centered vertical stack)

**Title:**
- "It's a match!" — 42px, weight 800, white, SF Pro Rounded
- Drop shadow: `0 4px 20px rgba(0,0,0,0.3)`
- Entry: pop-in from scale 0.5 + rotate -5° → 1, bouncy easing, 500ms

**Subtitle:**
- "You and Olivia liked each other." — 15px white 95%
- Entry: pop-in 300ms delay

**Avatar pair:**
- Two 140×140 circles, overlapping by 30%
- Each: white 4px border, shadow `0 8px 30px rgba(0,0,0,0.3)`
- Left avatar = user's photo, rotates -8°, slides in from left with scale 0.5 → 1
- Right avatar = match's first photo, rotates +8°, slides in from right
- Staggered entry: left at 200ms, right at 350ms

**Input field:**
- Width max 380px, height 48px, radius 24
- Background: white 20% + blur(20)
- Border: 0.5px white 35%
- Placeholder: "Say something nice…" white 75%
- Font: 15px, white text

**Buttons (stacked, full max-width 380px, 52px tall):**
- Primary "Send a message": white bg, Tinder pink `#FD297B` text, weight 600
- Secondary "Keep swiping": transparent bg, white 1px border, white text

---

## Screen 3.3 — Matches List

Clean white screen showing matches and conversations.

### Nav bar
- Matches title 18px weight 700 SF Pro Rounded, centered
- White bg with hairline bottom
- Height: 56pt + safe area top

### Body

**New Matches section:**
- Section header "New Matches" — 11px gray uppercase, weight 600, 16pt padding
- Horizontal scroll row:
  - Each item: 68×68 circle with 2px Tinder pink `#FE3C72` border, photo fill
  - Name below: 12px, black
  - Vertical stack, gap 6px
  - 12px gap between items

**Messages section:**
- Section header "Messages" — same styling as above
- Vertical list:
  - Each row: 12px 16px padding, hairline bottom
  - 58×58 avatar circle + small 12×12 green online dot bottom-right with 2px white border
  - Middle: name (16px weight 600) + preview (14px gray)
  - Right: "now" timestamp (12px gray)
  - Active row: subtle `rgba(0,0,0,0.03)` background

### Empty state
- "No matches yet. Keep swiping! 🔥"
- 60px vertical padding, centered, 15px gray, line-height 1.7

---

## Screen 3.4 — Tinder Chat View

Slides in from right when match is tapped.

### Top nav bar (white, not glass this time)
- Height: 64pt + safe area top
- Border-bottom: 0.5px

**Contents:**
- Back arrow: Tinder pink `#FE3C72`, 44×44 touch target
- 40×40 avatar circle (match's photo)
- Name stack: name 16px weight 600 + "Active now" 12px gray
- Right: 3-dot menu, gray

### Match preview banner (below nav, top of chat)
- Padding: 24px 16px 20px
- Background: subtle pink tint gradient `rgba(253,41,123,0.05)` → transparent
- Hairline bottom border

**Centered stack:**
- Two 64×64 avatars overlapping (user + match, same rotation as match screen but smaller)
- 2.5px white border, soft shadow
- Text: "You matched with Olivia" — 15px weight 600, Tinder pink, SF Pro Rounded
- Subtitle: "Say hi!" — 12px gray

### Messages area
- White bg, scroll view
- Message rows left-padded by 56px when received (leaves space for avatar)

**Received bubbles:**
- Background `#F2F2F7`, black text
- Same styling logic as iMessage (radius 20, tail bottom-left 5px)
- 32×32 avatar shown next to first bubble of a consecutive received group

**Sent bubbles:**
- Background Tinder pink `#FE3C72`, white text
- Tail bottom-right

### Typing indicator
- Received-style bubble with 3 animated dots (same as iMessage but uses Tinder pink scheme? No — keep gray for consistency)

### Input bar (white, not glass)
- Border-top hairline

**Contents (left to right):**
- GIF button: 32×32 square, Tinder pink icon outline
- Text area: pill-shaped (radius 18), border 0.5px `#C7C7CC`, placeholder "Message Olivia…"
- Send button: 36×36 circle, Tinder pink `#FE3C72`, white up-arrow

---

## Screen 3.5 — Own Profile (minimal, rarely on camera)

Just a placeholder screen — design with standard iOS settings style:
- Large photo at top (edge-to-edge, full width)
- Name + age overlay on photo
- Settings gear top-right
- Below photo: list of setting cards (Photos, Bio, Interests, etc.)
- "Edit Info" primary button

Minimal detail needed — this screen is deferred in the prop spec.

---

# UNIVERSAL ELEMENTS (reused across all apps)

## Home Indicator Bar

- 134×5px white pill
- 8pt from bottom
- Centered horizontally
- Opacity 0.85
- On some apps this is black (light-bg apps like Messages list, white app views)
- Tappable — swipe up gesture closes the current app back to home

## App Zoom Transition

The signature iOS move:
- App opens: icon scales from its grid position to fill screen, corners round from 14px → 0, 400ms spring
- App closes: reverses — scales down, corners round, 350ms

## Status Bar

Always visible on top:
- Time (left)
- Signal bars + WiFi + Battery (right)
- Color auto-switches based on app context (white for Tinder/dark apps, black for Messages/light apps)

---

# FIGMA MAKE DELIVERABLES

Please design each of these as separate frames:

### Home Screen
1. Home screen — default state
2. Home screen — app launch transition (mid-animation)

### Messages App
3. Conversation list — 6 rows populated
4. Conversation list — one row swipe-revealed (Mute/Delete shown)
5. Conversation list — empty search state
6. Chat view — with mix of sent/received messages + typing indicator
7. Chat view — with read receipt visible
8. Contact info view
9. New message modal

### Tinder App
10. Swipe view — Jessica profile (first photo)
11. Swipe view — mid-drag right (LIKE stamp showing, card rotating)
12. Swipe view — mid-drag left (NOPE stamp)
13. Match! overlay — fully animated in
14. Matches list — populated with matches + conversations
15. Matches list — empty state
16. Chat view — conversation with match banner at top
17. Chat view — with typing indicator

### States to cover
- Light mode AND dark mode for every Messages screen (Tinder is already dark-themed by default)
- With/without safe area insets (notch vs. no-notch simulation)

---

# DESIGN SYSTEM HANDOFF NOTES

The production code is built as **modular self-contained apps**:
- Each app (Messages, Tinder) is a single JS + CSS file pair
- Each app exposes `window.AppName.mount(element)` and `.reset()`
- A **CONFIG block at the top of each file** holds all design tokens (colors, icon paths, avatar palettes, animation timings)

### When designing, organize tokens so they map cleanly to code CONFIG:

```js
// Example from messages.js
var CONFIG = {
  colors: {
    sent: '#007AFF',
    recv: '#E9E9EB',
    accent: '#007AFF'
  },
  avatarPalette: [ /* 8 gradient pairs */ ]
};
```

```js
// Example from tinder.js
var CONFIG = {
  brandColor: '#FE3C72',
  logoGradient: ['#FD297B', '#FE5268', '#FF655B'],
  actionButtons: {
    rewind: '#F2CF45',
    nope: '#FF3B30',
    super: '#24A0ED',
    like: '#00D68F',
    boost: '#A020F0'
  }
};
```

### When the designer is done:
- Export all icons as SVG paths (production uses inline SVG, not images)
- Provide hex codes for every color (no named CSS colors)
- Document any font weights used so code can match exactly
- Deliver the final Figma file + a small JSON spec mapping Figma component names to CONFIG keys

---

# CONSTRAINTS

- **English only** — US production
- **No real third-party branding misuse** — Tinder look-alike is for fictional in-film use only, not a real integration
- **Photos for Tinder demo**: the production build generates abstract cartoon avatars via SVG (for licensing safety); designer can propose better avatar styles but they must be SVG-generable (no real photographs unless the designer secures licensing)
- **Mobile Safari + mobile Chrome compatible** — PWA, installed to home screen
- **Touch targets minimum 44×44pt**
- **Safe area insets respected everywhere**
- **Dark mode required** — Messages auto-adapts to system dark mode; Tinder is always dark-themed

---

# WHAT THIS PROMPT REPLACES

This single prompt supersedes any earlier Messages or Tinder Figma prompts. It covers the **complete unified phone prop app** with all its interconnected screens and shared design system.

Every design decision here has a corresponding implementation in the production code — please stay faithful to the specs so that the designer's work can drop directly into the existing build.

---

*This prop will be used on-camera during filming of an independent feature film. Fidelity to real iOS and real Tinder visual language is essential for suspension of disbelief. When in doubt, reference screenshots from actual iOS 18 / Tinder March 2026 builds.*
