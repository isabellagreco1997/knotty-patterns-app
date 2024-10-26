# KnottyPatterns - Crochet Pattern Generator

A modern web application for creating, managing, and sharing crochet patterns. Built with React, TypeScript, and Tailwind CSS.

## Features

- Interactive pattern builder with common crochet stitches
- Magic ring starter
- Round-by-round pattern creation
- Pattern export (copy, download, print)
- User authentication
- Responsive design

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Supabase (Authentication & Database)
- Zustand (State Management)
- React Router
- Lucide Icons

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/knotty-patterns.git
```

2. Install dependencies:
```bash
cd knotty-patterns
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Environment Variables

Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.