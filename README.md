# The Yard Search

A semantic search engine for The Yard videos, powered by AI. This application allows users to search through video content using natural language queries, finding specific moments and topics across episodes.

## Features

- 🔍 Semantic search using OpenAI embeddings
- 🎯 Precise video timestamp linking
- 🎬 Integrated video playback
- 🚀 Real-time search results
- 🔄 Rate limiting to ensure fair usage
- 📱 Responsive design for all devices

## Technology Stack

- **Frontend**: Next.js 15.2, React 19
- **AI**: OpenAI API (text-embedding-ada-002 model)
- **Vector Database**: Pinecone
- **Caching**: Redis
- **Analytics**: Vercel Analytics
- **Styling**: Tailwind CSS

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
OPENAI_API_KEY=your_openai_key
PINECONE_API_KEY=your_pinecone_key
PINECONE_INDEX=your_index_name
REDIS_URL=your_redis_url
REDIS_PASSWORD=your_redis_password
YOUTUBE_API_KEY=your_youtube_api_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## API Endpoints

### POST /api/search
Performs semantic search across video content
- Rate limited
- Returns video timestamps with relevant metadata
- Includes YouTube video information

## Development

The project structure:
- `/components` - React components
- `/pages` - Next.js pages and API routes
- `/services` - Business logic and external service integrations
- `/types` - TypeScript type definitions

## Deployment

The application is optimized for deployment on Vercel

## License

All rights reserved. This project is proprietary and confidential.
