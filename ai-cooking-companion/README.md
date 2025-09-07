# AI Cooking Companion (Expo + Supabase) Scaffold

This repository contains a single-file scaffold (`App.jsx`) to bootstrap an AI-assisted cooking app using Expo (React Native), Supabase, and serverless AI endpoints.

## Quick Start

1) Create an Expo project (or use an existing one):

```bash
npx create-expo-app ai-cooking-companion
```

2) Replace the generated `App.js` with the provided `App.jsx` from this folder.

3) Install recommended dependencies:

```bash
npm install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
npm install @supabase/supabase-js
npm install nativewind tailwindcss
npm install expo-av expo-file-system
# optional (often installed by Expo projects already):
expo install react-native-gesture-handler react-native-reanimated
```

4) Configure NativeWind (Tailwind) as per docs if you plan to use it.

5) Create a Supabase project and obtain `SUPABASE_URL` and `SUPABASE_ANON_KEY`.

6) Set environment variables. Copy `.env.example` to your environment manager. For Expo projects, consider using `app.config.js` or `expo-constants` to pass runtime values.

```
REACT_NATIVE_SUPABASE_URL="https://xyz.supabase.co"
REACT_NATIVE_SUPABASE_ANON_KEY="public-anon-key"
AI_EDGE_BASE_URL="https://your-edge-functions.example.com"
```

7) Implement the serverless AI endpoints (recommended to host behind Edge Functions):

- `POST /extract` — Given a video URL or upload, returns structured recipe JSON
- `POST /caption` — Given an image, returns caption + recipe card
- `POST /mealplan` — Given uploaded recipes and preferences, returns a weekly plan
- `POST /scan` — Given a fridge photo, returns detected ingredients and suggested recipes

8) Run the app:

```bash
npm run start
```

## Notes

- Keep AI API keys on the server-side only. The mobile app should call your secure edge functions.
- Use Supabase Row Level Security (RLS) policies to keep user data safe.
- The UI includes placeholders for image/video picking; wire up `expo-image-picker`, `expo-av`, etc.

