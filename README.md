# 🍽️ Food Ordering Web Application

> A responsive Single Page Application (SPA) built with React.js and modern state management, enabling seamless meal discovery, cart management, and checkout processing against a RESTful backend service.

---

## 🌟 Key Features

- **Dynamic Catalog:** Asynchronously fetches meal items and descriptions from a REST API with animated loading skeletons and error boundaries.
- **Cart State Management:** Centralized cart handling with real-time total calculations, quantity modifications, and item removals.
- **Responsive Checkout Modal:** Multi-step modal checkout form validating user contact and delivery credentials.
- **Cross-Browser & Mobile-First:** Responsive CSS layout optimized across mobile viewports, tablets, and desktop resolutions.

---

## 🛠️ Architecture & Tech Stack

- **Framework:** React.js (Vite)
- **State Management:** React Context API / Redux
- **Styling:** Modular CSS3 with Flexbox and responsive media queries
- **Data Fetching:** Fetch API / Axios with custom asynchronous hooks
- **Testing:** Jest & React Testing Library

---

## 📂 Project Structure

```text
├── backend/              # Node/Express mock API server & meal dataset
├── public/               # Static assets and meal photography
├── src/
│   ├── assets/           # Icons and vector graphics
│   ├── components/       # Reusable UI primitives (Modal, Button, Input)
│   ├── context/          # Global Cart and User Progress state
│   ├── hooks/            # Custom reusable hooks (useHttp, etc.)
│   ├── App.jsx           # Root layout and component composition
│   └── main.jsx          # Entry point and provider hydration
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation & Setup

1. **Clone the repository:**
```bash
   git clone https://github.com/karun2001/FoodOrderingWebApplication.git
   cd FoodOrderingWebApplication
```

2. **Install frontend dependencies:**
```bash
   npm install
```

3. **Start the backend server:**
```bash
   cd backend
   npm install
   npm start
```

4. **Launch the frontend development server:**
```bash
   # From root directory
   npm run dev
```
