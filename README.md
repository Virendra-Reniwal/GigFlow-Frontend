# GigFlow - Freelance Marketplace Platform

A modern full-stack freelance marketplace built with React, Next.js, Node.js, Express, and MongoDB.

## Features

- User authentication (JWT-based)
- Role-based access (Client & Freelancer)
- Post and browse gigs
- Bidding system with hiring logic
- Real-time notifications (Socket.io)
- Light/Dark theme toggle
- Responsive design

## Tech Stack

### Frontend
- **React 19.2** with Next.js 16
- **Tailwind CSS v4** for styling
- **TypeScript** for type safety
- **Context API** for state management
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Socket.io** for real-time updates
- **bcryptjs** for password hashing

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB installed and running locally, or MongoDB Atlas account
- npm or pnpm package manager

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gigflow
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the root directory (or frontend directory if separated)

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Create a `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm run dev
# or
pnpm dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/me` - Update user profile

### Gigs
- `GET /api/gigs` - Get all gigs (with filters)
- `GET /api/gigs/:id` - Get single gig
- `POST /api/gigs` - Create new gig (auth required)
- `PUT /api/gigs/:id` - Update gig (auth required)
- `DELETE /api/gigs/:id` - Delete gig (auth required)
- `GET /api/gigs/my/posted` - Get user's posted gigs (auth required)

### Bids
- `POST /api/bids` - Create new bid (auth required)
- `GET /api/bids/gig/:gigId` - Get all bids for a gig
- `GET /api/bids/my/submitted` - Get user's submitted bids (auth required)
- `POST /api/bids/:bidId/accept` - Accept a bid (auth required)
- `POST /api/bids/:bidId/reject` - Reject a bid (auth required)

## Project Structure

```
├── app/                      # Next.js app directory
│   ├── dashboard/           # Dashboard page
│   ├── gigs/               # Gig pages
│   ├── login/              # Login page
│   ├── register/           # Register page
│   ├── profile/            # Profile page
│   └── ...
├── components/              # React components
│   ├── ui/                 # UI components (shadcn)
│   ├── navbar.tsx          # Navigation bar
│   ├── gig-card.tsx        # Gig card component
│   └── ...
├── contexts/               # React contexts
│   ├── auth-context.tsx   # Authentication context
│   └── theme-context.tsx  # Theme context
├── services/               # API service layer
│   ├── auth.service.ts    # Auth API calls
│   ├── gig.service.ts     # Gig API calls
│   └── bid.service.ts     # Bid API calls
├── lib/                   # Utility functions
│   ├── api.ts            # API client
│   └── utils.ts          # Helper functions
└── backend/              # Backend API
    ├── controllers/      # Route controllers
    ├── models/          # MongoDB models
    ├── routes/          # API routes
    ├── middleware/      # Custom middleware
    └── server.js        # Express server
```

## Key Features Implementation

### Authentication
- JWT tokens stored in HttpOnly cookies
- Role-based access control (Client/Freelancer)
- Protected routes and API endpoints

### Hiring Logic (Important)
- Only one bid can be accepted per gig
- MongoDB transactions ensure data consistency
- Once a bid is accepted, the gig status changes to "in_progress"
- All other bids are automatically rejected
- Real-time notifications via Socket.io

### Theme System
- Persistent light/dark mode
- CSS custom properties for theming
- Smooth transitions between themes

## Development

- Frontend runs on port 3000
- Backend runs on port 5000

## Testing

Test the API endpoints using the examples in `backend/README.md` or use tools like Postman or Thunder Client.

## Production Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy

### Backend (Railway/Render/Heroku)
1. Push code to GitHub
2. Create new service
3. Add environment variables from `.env`
4. Deploy

## License

MIT License
