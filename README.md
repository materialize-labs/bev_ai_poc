# Bev Brand AI

An AI-powered beverage brand development platform built with Next.js, OpenAI, and Vercel.

## Features

- 🔍 Market Research Analysis
- 👥 Consumer Persona Development
- 🎨 Brand Identity Creation
- 🧪 Product Formulation
- 📊 Business Plan Generation
- 📱 Secure Authentication
- 🎨 Theme Support
- 📱 Mobile Responsive Design

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- OpenAI GPT-4
- DALL-E 3
- Vercel Edge Runtime

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/bev-brand-ai.git
cd bev-brand-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
OPENAI_API_KEY=your_api_key_here
NEXT_PUBLIC_TEST_MODE=false
AUTH_USERNAME=your_username_here
AUTH_PASSWORD=your_secure_password_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Authentication

The application uses secure cookie-based authentication with username/password protection. Protected routes include:

- `/create/*` - Brand creation wizard
- `/api/*` - API endpoints (except `/api/auth`)

Authentication credentials should be configured through environment variables for security.

## Deployment

The application is configured for deployment on Vercel:

1. Push your code to GitHub
2. Create a new project on Vercel
3. Import your GitHub repository
4. Configure environment variables:
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_TEST_MODE`
   - `AUTH_USERNAME`
   - `AUTH_PASSWORD`
5. Deploy

## Development Mode

For development without OpenAI API usage:

1. Set `NEXT_PUBLIC_TEST_MODE=true` in `.env`
2. Restart the development server

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── auth/           # Authentication
│   └── create/         # Protected routes
├── components/         # React components
├── lib/               # Utility functions
└── styles/            # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License - see LICENSE file for details
