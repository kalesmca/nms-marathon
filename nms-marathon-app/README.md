# NMS Marathon Application

A modern React-based web application for managing marathon event registrations for NMS Sports Club.

## 🏃 Features

### Public Features (Pre-login)
- **Login with Mobile Number** - Simple authentication using player's mobile number
- **Category Maps** - View marathon route maps for different age categories:
  - Open Category
  - Under 19
  - Under 14
  - Under 10

### Registered User Features
- **Player Registration** - Register for the marathon with personal details
- **Dashboard** - View registered players and payment status
- **Multiple Player Registration** - Add more players under the same mobile number

### Admin Features
- **Player List** - View all registered players
- **Edit Players** - Modify player details
- **Payment Status Management** - Update payment confirmations

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | Frontend framework |
| **Redux** | State management |
| **React Router v6** | Navigation |
| **React Bootstrap** | UI components |
| **SCSS** | Styling with modern glassmorphism effects |
| **Firebase** | Backend database & hosting |

## 📁 Project Structure

```
nms-marathon-app/
├── src/
│   ├── assets/images/          # Images (banner, maps, QR codes)
│   ├── config/                 # Constants, context, utilities
│   ├── container/
│   │   ├── common/modals/      # Reusable modal component
│   │   ├── layout/             # Authenticated layout & header
│   │   ├── login/              # Login page components
│   │   ├── player-dashboard/   # Dashboard for registered users
│   │   ├── player-list/        # Admin player management
│   │   └── registration/       # Player registration form
│   ├── redux/                  # Redux store, actions, reducers
│   ├── App.js                  # Main app with routing
│   └── index.js                # Entry point
├── public/
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the app directory
cd nms-marathon-app

# Install dependencies
npm install

# Start development server
npm start
```

The app will run at `http://localhost:3000`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run development server |
| `npm run build` | Build for production |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check formatting |

## 🎨 UI Design

The application features a modern UI with:
- **Glassmorphism** - Frosted glass effect on cards and containers
- **Gradient accents** - Teal gradient (#1abc9c → #16a085) for buttons and headers
- **Responsive design** - Mobile-first with card-based layouts on small screens
- **Square corners** - Clean, modern aesthetic

## ☁️ Deployment

### Firebase Hosting

```bash
# Build the production bundle
npm run build

# Deploy to Firebase
firebase deploy
```

## 📄 Configuration

Firebase configuration is located in `src/firebase-config.js`. Update with your Firebase project credentials for deployment.

## 👥 User Roles

| Role | Access |
|------|--------|
| **Player** | Registration, Dashboard |
| **Admin** | Player List, Edit Players |
| **Super Admin** | Full access including Source Data |

## 📱 Responsive Breakpoints

| Breakpoint | Description |
|------------|-------------|
| < 480px | Mobile - stacked layouts, card views |
| < 600px | Small tablets - adjusted spacing |
| ≥ 768px | Desktop - full table views |

## 🔧 Environment

No external environment variables required. Firebase config is bundled in the app.

---

**NMS Sports Club** - Marathon Event Management System
