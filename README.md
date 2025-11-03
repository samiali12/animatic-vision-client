## 🎬 Animatic Vision — Client (Next.js)

The frontend for the Animatic Vision platform. Built with Next.js App Router, it provides user authentication, a projects dashboard, project creation, and triggers server-side story segmentation. It communicates with the FastAPI backend using secure HttpOnly cookies.

## 🚀 Features
- 🔐 **Authentication** — Register, login, logout, auto-refresh tokens, and load current user
- 📁 **Projects Dashboard** — List, create, and view projects
- 🧩 **Story Segmentation Trigger** — Call server to segment story into scenes
- 🧭 **App Router** — Modern Next.js routing with layouts and route groups
- 🎨 **Responsive UI** — Tailwind CSS 4 with shadcn/ui components

## 🏗️ Tech Stack
| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 / React 19 |
| State / Data | Redux Toolkit + RTK Query |
| API Handling | RTK Query `fetchBaseQuery` (cookies included) |
| Styling | Tailwind CSS 4, shadcn/ui (Radix UI) |
| Auth | HttpOnly cookies (JWT) with FastAPI backend |

## 📂 Notable Structure
```
src/
  app/
    (auth)/              # login, register, forget/reset password
    (main)/dashboard/    # dashboard and project detail pages
    StoreProvider.tsx    # Redux provider wrapper
    UnifiedProvider.tsx  # App-level providers
  redux/
    api/apiSlice.ts      # base query, refresh-token + me bootstrap
    features/auth/*      # auth slice and endpoints
    features/project/*   # project slice and endpoints
  components/
    Project/*            # project UI components
    ui/*                 # shadcn/ui primitives
```

## ⚙️ Setup & Installation

1. Clone the client
   ```bash
   git clone https://github.com/your-org/animatic_vision_client.git
   cd animatic-vision-client
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables
   Create a `.env.local` in the project root:
   ```env
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Build for production
   ```bash
   npm run build
   npm start
   ```

## 🔌 Client-Server Integration
- Cookies are HttpOnly and set by the server; the client sends them with requests via `credentials: "include"`.
- On app init, the store dispatches `refreshToken` then `loadUser` to bootstrap auth state.
- Ensure the server CORS allows your client origin (default includes `http://localhost:3000`).

## 🧪 NPM Scripts
```bash
npm run dev      # Start Next.js in development
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🧾 License
This project is licensed under the MIT License — you are free to use and modify it.

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to improve.
