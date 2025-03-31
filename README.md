# Pokémon Explorer App

A full-stack application that allows users to browse and favorite Pokémon. Built with React, TypeScript, Node.js, Express, and MongoDB.

## Features

- Browse the first 150 Pokémon in a responsive grid layout
- Search for Pokémon by name, ID, or type
- View detailed information about each Pokémon (abilities, types, evolutions)
- Add or remove Pokémon from your favorites list
- Filter to view only favorited Pokémon
- Persistent storage of favorites using MongoDB

## Tech Stack

### Frontend
- React with TypeScript
- Material UI for styling
- Zustand with Immer for state management
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB with Mongoose
- Axios for PokéAPI requests

## Project Structure

```
pokemon-app/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API services
│   │   ├── store/        # Zustand store
│   │   ├── types/        # TypeScript type definitions
│   │   └── utils/        # Utility functions
│   └── public/           # Static assets
│
└── server/               # Backend Node.js application
    ├── src/
    │   ├── config/       # Configuration files
    │   ├── controllers/  # Route controllers
    │   ├── models/       # Mongoose models
    │   └── routes/       # Express routes
    └── .env              # Environment variables
```

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB

### Backend Setup
1. Navigate to the server directory: `cd pokemon-app/server`
2. Install dependencies: `npm install`
3. Create a `.env` file with your MongoDB connection string
4. Start the development server: `npm run dev`

### Frontend Setup
1. Navigate to the client directory: `cd pokemon-app/client`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`

## API Endpoints

### Pokémon
- `GET /api/pokemon` - Get all Pokémon (first 150)
- `GET /api/pokemon/:id` - Get a specific Pokémon by ID with details

### Favorites
- `GET /api/favorites` - Get all favorite Pokémon
- `POST /api/favorites` - Add a Pokémon to favorites
- `DELETE /api/favorites/:id` - Remove a Pokémon from favorites 