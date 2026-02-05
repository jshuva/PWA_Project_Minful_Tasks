# 💎 MINDFUL. | Premium Task Manager PWA

![PWA Badge](https://img.shields.io/badge/PWA-Ready-blue?style=for-the-badge&logo=pwa)
![Vite Badge](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)
![JavaScript Badge](https://img.shields.io/badge/Vanilla-JS-F7DF1E?style=for-the-badge&logo=javascript)

**Mindful Tasks** is a high-performance, premium Progressive Web App (PWA) designed for "mindful achievers." It combines clean task management with daily motivational inspiration, ensuring you stay productive even when the world goes offline.

---

## ✨ Features

### 🧠 Mindful Wisdom (Online/Offline Quotes)
- **Dynamic Online Mode**: Every refresh fetches a fresh motivational quote from the `DummyJSON` API.
- **Stable Offline Mode**: Uses `localStorage` to lock the last seen quote. If you refresh while offline, the quote stays exactly the same, preventing "refresh-fatigue."
- **CORS & Cache Optimized**: Implements unique URL timestamps to ensure background caches don't serve "stale" quotes while you're online.

### 📅 Smart Task Management
- **Persistence**: Powered by **IndexedDB (via Dexie.js)**. Your tasks survive page reloads, browser restarts, and even clearing your standard browser cache.
- **Visual Deadlines**: Intelligent color-coding based on urgency:
  - 🔴 **Overdue**: Tasks where the deadline has passed.
  - 🟠 **Urgent**: Deadlines in less than 3 days.
  - 🟡 **Approaching**: Deadlines in less than 7 days.
  - 🟢 **Plan Ahead**: Future tasks.
- **Flexible Scheduling**: Full support for selecting past, present, or future dates.

### 🎨 Premium Design System
- **Glassmorphism**: A deep sapphire theme with blurred translucent layers.
- **Fluid Layout**: Fully responsive from mobile devices to ultra-wide monitors.
- **Micro-animations**: Smooth entry transits, pulsing offline indicators, and glowing interactive states.

---

## 🛠️ Technical Stack

- **Core**: Vanilla JavaScript (ESM)
- **Styling**: Modern CSS (Custom Properties, Flexbox, Grid, Glassmorphism)
- **Database**: Dexie.js (IndexedDB wrapper)
- **Build Tool**: Vite
- **PWA**: `vite-plugin-pwa` (managing Manifest & Workbox Service Workers)

---

## 🚀 Getting Started

### 1. Installation
Install the necessary dependencies:
```bash
npm install
```

### 2. Development
Run the local development server:
```bash
npm run dev
```

### 3. Production & PWA Testing
To test the full PWA features (Service Worker, Offline Manifest), you must build and preview:
```bash
# Build the production assets
npm run build

# Preview the local build
npm run preview
```

---

## 📂 Project Structure

```text
├── index.html       # Optimized SEO-friendly structure
├── style.css        # Premium design system & animations
├── main.js          # App logic & Quote API orchestration
├── db.js            # Dexie.js Database configuration
├── vite.config.js   # PWA & Workbox setup
└── package.json     # Project dependencies
```

---

## 📝 Assumptions & Notes
- **Browser Compatibility**: Best experienced on Chromium-based browsers (Chrome, Edge) to ensure full PWA installation support.
- **Offline Logic**: The "Offline Badge" at the bottom uses the `navigator.onLine` API to detect network shifts in real-time.
- **API Reliability**: Switched from Quotable to DummyJSON for enhanced SSL stability and consistent uptime.

---
*Created for the MCDA5550 PWA Assignment.*
