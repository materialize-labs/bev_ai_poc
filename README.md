# Bev Brand AI

An AI-powered beverage brand development platform that helps entrepreneurs create and refine their beverage brands through interactive conversations.

## Features

- 🤖 Interactive AI Chat Interface
- 📊 Market Research Analysis
- 👥 Consumer Persona Development
- 🎨 Brand Design & Logo Generation
- 🧪 Product Formulation
- 🔄 Test Mode for Offline Development

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **AI Integration:** OpenAI GPT-4 & DALL-E 3
- **Real-time:** Server-Sent Events (SSE)
- **Deployment:** Vercel (planned)

## Getting Started

### Prerequisites

- Node.js 18.18.0 or later
- npm or yarn
- OpenAI API key (optional for test mode)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/materialize-labs/bev_ai_poc.git
   cd bev_ai_poc
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_api_key_here  # Required for live mode only
   NEXT_PUBLIC_TEST_MODE=true        # Optional: Enable test mode
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Modes

### Live Mode
- Requires OpenAI API key
- Real-time AI responses
- Full functionality with GPT-4 and DALL-E 3

### Test Mode
- No API key required
- Instant responses for rapid development
- Pre-defined test data for all features
- Visual indicator in UI
- Toggle with `NEXT_PUBLIC_TEST_MODE` environment variable

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/         # React components
│   ├── chat/          # Chat interface components
│   └── ui/            # Shared UI components
├── lib/               # Utility functions
└── styles/            # Global styles
```

## Features in Detail

### Market Research
- Real-time market trend analysis
- Competitor research
- Consumer preference insights
- Growth opportunity identification

### Consumer Persona Development
- Interactive demographic profiling
- Behavior pattern analysis
- Target market visualization
- Preference mapping

### Brand Development
- AI-powered name generation with three unique options
- Markdown-formatted brand stories
- Direct container mockup generation
- Multiple container type options
- Brand identity development

### Product Formulation
- Recipe development
- Nutritional analysis
- Ingredient optimization
- Compliance checking

## Development

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests (coming soon)

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [OpenAI](https://openai.com/)
- [Vercel](https://vercel.com/)
