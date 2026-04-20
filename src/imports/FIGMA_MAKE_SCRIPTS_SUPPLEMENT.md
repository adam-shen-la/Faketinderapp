# Figma Make — Scripted Conversations Supplement

**⚠️ This supplements the main `FIGMA_MAKE_COMPLETE_PROMPT.md` — use both together.**

This document provides the **actual conversation content** that should appear in chat view mockups. Using these exact phrases will create realistic, pre-wired demo screens that match the code's scripted reply system.

---

## How to use this supplement

When designing the **Chat view frames** (both Messages app and Tinder app), populate the conversation bubbles with the example exchanges below — NOT Lorem Ipsum or generic placeholder text.

Why this matters: the production code has these exact trigger keywords + replies hardcoded. Designing around the same content means the visual mockup will look identical to the actual running app during demo.

---

## TINDER — Olivia chat (primary demo conversation)

**Context:** Olivia (25, SoHo fashion designer) is the only profile in the demo that triggers a Match. After matching, she's the contact the director will demo chat with.

### Recommended Chat view mockup content

Show this exchange as the default populated state in the Tinder chat view:

> **User (sent, pink bubble):** hey
>
> **Olivia (received, gray bubble):** hey you 😊
>
> **Olivia:** finally someone with taste
>
> **User:** what are you up to this weekend?
>
> **Olivia:** i could be free 😏
>
> **Olivia:** what did you have in mind?

### Alternate mockup (emphasizes food/flirting):

> **User:** do you love pizza as much as your profile says?
>
> **Olivia:** omg a man who gets it 🍕
>
> **Olivia:** wanna grab a slice at Joe's this weekend?

### Other Olivia response banks (use for secondary variations):

| User says | Olivia replies with |
|---|---|
| "drink" / "coffee" | "i like how you think 🍷" + "know any good spots in soho?" |
| "dog" | "OMG you have a dog???" + "send pics immediately 🐶" |
| "cute" / "pretty" | "aww thanks 🥰" + "you're not so bad yourself" |

---

## MESSAGES — Emma chat (emotional/romantic demo)

**Context:** Emma is the user's girlfriend. Warm, loving, sometimes vulnerable.

### Recommended Chat view mockup content

This is the most emotionally resonant example — use it to show read receipts and typing indicators in the Messages chat view.

> **[Timestamp divider:] Today 3:40 PM**
>
> **User (sent, blue bubble):** hey beautiful
>
> **Emma (received, gray bubble):** Hey you 😊
>
> **User:** i love you
>
> *(typing indicator appears for 2 seconds)*
>
> **Emma:** I love you too ❤️
>
> *(typing indicator again, 1.5 sec)*
>
> **Emma:** More than you know
>
> **[Read receipt below last user message:]** Read 3:42 PM

### Alternate mockup (dramatic tension — good for showing emotion):

> **User:** we need to talk
>
> *(long typing pause — 4 sec)*
>
> **Emma:** Okay
>
> *(typing, 3 sec)*
>
> **Emma:** You're scaring me

---

## MESSAGES — Jake chat (casual friend demo)

**Context:** Jake is the user's best friend. Super casual texting style.

### Recommended Chat view mockup content

> **User:** yo
>
> **Jake:** Yooo 👋
>
> **User:** you around tonight?
>
> **Jake:** Yeah I'm down
>
> **Jake:** What time?

---

## MESSAGES — Mom chat (warm, worried)

**Context:** User's mom. Caring, slightly anxious, uses emojis enthusiastically.

### Recommended Chat view mockup content

> **User:** hi mom
>
> **Mom:** Hi sweetheart! 🥰 How are you? Did you eat today?
>
> **User:** i love you
>
> **Mom:** I love you too sweetheart! So much! 😘 Call me when you can!
>
> **[Read receipt:]** Read Today 2:10 PM

---

## MESSAGES — Dad chat (long preloaded thread — for Scene 80 reference)

**Context:** User's estranged father in Beijing. He has been texting repeatedly with no reply. This is the **emotional anchor** of the whole app — make this one feel weighty.

### Recommended Chat view mockup content

**All messages are RECEIVED (gray bubbles). No sent bubbles.** Show about 10 messages spread across different days. Each message should have its own timestamp divider to show the gap.

> **[Timestamp:] Monday 8:14 AM**
>
> **Dad:** Hello, Charlotte. This is your dad.
>
> **Dad:** I hope New York is treating you well.
>
> **[Timestamp:] Tuesday 9:02 AM**
>
> **Dad:** The weather is getting colder here.
>
> **Dad:** Remember to wear a sweater.
>
> **[Timestamp:] Wednesday 7:41 AM**
>
> **Dad:** Your mother misses you.
>
> **[Timestamp:] Thursday 10:15 AM**
>
> **Dad:** Have you talked to your sister?
>
> **Dad:** She is going through a difficult time.
>
> **Dad:** Please be patient with her.
>
> **[Timestamp:] Friday 11:22 AM**
>
> **Dad:** Alright... please call me when you can.
>
> **Dad:** I love you.

The visual impression should be: **a wall of unanswered messages building up over a week**. This is dramatic — make sure the scroll view feels long and the timestamps emphasize the passage of time.

---

## MESSAGES — List view mockup content

For the conversation list view, populate the 6 rows like this (copy verbatim for mockups):

| Avatar letter | Name | Last preview | Time | Unread count |
|---|---|---|---|---|
| E | Emma | "hey where are you??" | 2:41 PM | 2 |
| J | Jake | "You: yeah dude" | 1:15 PM | 0 |
| M | Mom | "Did you eat lunch? I'm worried about you sweetie" | 11:22 AM | 1 |
| D | Dad | "I love you." | Yesterday | **10** ⭐ |
| A | Arjun | "You: sounds good" | Yesterday | 0 |
| AL | Agnes Lawyer | "Please call me back when you can." | Monday | 3 |

The **Dad row with 10 unread** is the visual standout — it should carry a sense of neglect.

---

## TINDER — List view mockup content (Matches tab)

Show the state AFTER matching with Olivia. Design both sections:

### New Matches section (horizontal scroll)
- Just one avatar: Olivia
- Circle with 2px Tinder pink border
- Name below: "Olivia"

### Messages section
- One row: Olivia's avatar + "Olivia" (name) + "Say hi to Olivia!" (preview) + "now" (time)

### Empty state variant
- Also design one variant where no matches exist yet:
- Centered text: "No matches yet." / "Keep swiping! 🔥"

---

## Don't over-populate

Each chat view mockup should show **no more than ~6–8 bubbles** to keep the design feeling fresh and not overwhelming. The exception is the Dad thread — that one SHOULD feel overwhelming.

---

## Design-to-code mapping

These conversations are already encoded in:
- `tinder.js` → `SCRIPTS.p6` (Olivia's triggers)
- `messages.js` → `SCRIPTS.c1` (Emma), `.c2` (Jake), `.c3` (Mom)
- `messages.js` → `LONG_HISTORY.c4` (Dad's 10-message thread)

When the designer hands off, the visual should map 1:1 to these data structures. The director can later edit the scripts via Google Sheets (Stage 4) — so treat these as **placeholder demo content**, not the final production version.

---

## Summary — what the designer must produce

**1 Tinder chat mockup** — Olivia exchange (6 bubbles, hey/flirty)
**3 Messages chat mockups:**
- Emma — romantic (includes Read receipt + typing indicator states)
- Jake — casual (5 bubbles)
- Dad — **10 received messages across 5 days, no replies** (the dramatic one)

Plus the **list views** populated as described above.
