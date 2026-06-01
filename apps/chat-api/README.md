# Chat API - Google Gemini Powered Portfolio Assistant

A lightweight, modular Fastify-based API service that powers the portfolio's AI chat assistant using Google's free Gemini API.

## Features

- **Free Tier** - No costs, uses Google Gemini API free tier (60 requests/minute)
- **Rate Limited** - IP-based rate limiting (20 requests per 5 minutes per IP)
- **Modular Architecture** - Atomic utilities, pure functions, swappable implementations
- **Type Safe** - Full TypeScript support
- **Production Ready** - Health checks, error handling, CORS enabled

## Quick Start

### Prerequisites

- Node.js >= 18
- pnpm >= 9.15.9
- Google API Key (free from [ai.google.dev](https://ai.google.dev))

### Setup

1. **Get Google API Key**
   - Visit [ai.google.dev](https://ai.google.dev)
   - Click "Get API key"
   - Copy your API key

2. **Configure Environment**
   ```bash
   cd apps/chat-api
   # Create .env file
   echo "GOOGLE_API_KEY=your_api_key_here" > .env
   echo "PORT=4001" >> .env
   ```

3. **Install Dependencies**
   ```bash
   pnpm install
   ```

4. **Start Development Server**
   ```bash
   pnpm run dev
   ```

   Server will start at `http://localhost:4001`

## API Endpoint

### POST `/api/chat/message`

Send a message to the chat assistant.

**Request Body:**
```json
{
  "message": "What services do you offer?",
  "sessionId": "optional-session-id",
  "locale": "en"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "message": "Response from assistant...",
    "timestamp": 1234567890,
    "sessionId": "optional-session-id"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT",
    "message": "You have exceeded the rate limit..."
  }
}
```

### GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

## Error Codes

- `VALIDATION_ERROR` (400) - Invalid request format
- `RATE_LIMIT` (429) - IP rate limit exceeded
- `QUOTA_EXCEEDED` (429) - Gemini API quota exceeded (60 req/min)
- `API_ERROR` (503) - Gemini API error
- `UNKNOWN_ERROR` (500) - Unexpected error

## Rate Limiting

- **Per IP:** 20 requests per 5 minutes
- **Global:** 60 requests per minute (Gemini free tier limit)

When rate limit is exceeded, retry after the specified window.

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GOOGLE_API_KEY` | Yes | - | Google Generative AI API key |
| `PORT` | No | 4001 | Port to run server on |
| `NODE_ENV` | No | development | Environment mode |

## Development

### Scripts

```bash
pnpm run dev          # Start dev server with auto-reload
pnpm run build        # Build for production
pnpm run lint         # Run ESLint
pnpm run lint:fix     # Fix ESLint issues
pnpm run typecheck    # Run TypeScript type checking
pnpm run test         # Run tests
pnpm run test:watch   # Run tests in watch mode
pnpm run test:coverage # Generate coverage report
```

### Project Structure

```
src/
├── config/          # Configuration & env validation
├── types/           # TypeScript type definitions
├── utils/           # Atomic utilities (validators, transformers, errors, quota)
├── services/        # External service wrappers (Gemini, system prompts)
├── middleware/      # Fastify middleware (rate limiting)
├── routes/          # API route handlers
├── __tests__/       # Test files
├── index.ts         # Server entry point
└── api.ts           # Fastify server setup
```

### Key Utilities

**validators.ts** - Pure validation functions
- `validateMessage()` - Validates chat message
- `validateChatRequest()` - Validates entire request

**transformers.ts** - Pure data transformation
- `createSuccessResponse()` - Format success response
- `createErrorResponse()` - Format error response
- `sanitizeMessage()` - Escape HTML entities

**errors.ts** - Custom error classes
- `ChatApiError` - Base error class
- `ValidationError` - 400 error
- `RateLimitError` - 429 error
- `QuotaExceededError` - 429 error
- `GeminiApiError` - 503 error

**quota-manager.ts** - In-memory quota tracking
- `hasIpQuotaRemaining()` - Check IP quota
- `decrementIpQuota()` - Track IP request
- `hasGlobalQuotaRemaining()` - Check global quota
- `decrementGlobalQuota()` - Track global request

### Testing

All utilities are pure functions and independently testable:

```typescript
// Example: Test validator
import { validateMessage } from './utils/validators';

const result = validateMessage('Hello');
expect(result.valid).toBe(true);

const invalid = validateMessage('');
expect(invalid.valid).toBe(false);
```

## Docker Deployment

### Build Image

```bash
docker build -f apps/chat-api/docker/Dockerfile -t chat-api:latest .
```

### Run Container

```bash
docker run -p 4001:4001 \
  -e GOOGLE_API_KEY=your_key_here \
  chat-api:latest
```

### With docker-compose

See root `docker-compose.yaml` for multi-service setup.

## Troubleshooting

### "Missing GOOGLE_API_KEY environment variable"
- Ensure `.env` file has `GOOGLE_API_KEY=your_key`
- Or set environment variable: `export GOOGLE_API_KEY=your_key`

### "Rate limited" errors
- Too many requests from your IP
- Wait 5 minutes before retrying
- Production: Use Redis for quota manager

### "Gemini API error"
- Check Google API key is valid
- Verify quota hasn't exceeded 60 requests/minute globally
- Check internet connection

## Future Enhancements

- Redis-backed quota manager for distributed systems
- Message history persistence (optional)
- Support for additional AI models (Claude, Gemini Pro)
- Conversation analytics
- Custom system prompts per user

## License

Proprietary - Part of @notadream/portfolio
