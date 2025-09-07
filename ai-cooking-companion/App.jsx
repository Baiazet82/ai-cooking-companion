/*
AI Cooking Companion - Cursor Project Scaffold (React Native + Supabase + GPT placeholders)

This single-file scaffold (App.jsx) is designed to be a ready-to-run starting point for Cursor.
It includes:
- Project overview & setup steps (below)
- package.json & .env suggestions
- Full React Native (Expo) App skeleton with Navigation, screens and components for:
  - Auth (Supabase)
  - RecipeExtraction (paste link or upload video/photo)
  - KitchenProfile (appliances & utensils)
  - CommunityFeed (photo post -> AI caption)
  - MealPlanner (upload recipes -> weekly plan)
  - ScanAndCook (photo of fridge -> suggestions)
  - VoiceCookMode (voice-guided steps - placeholder)
  - Settings & Profile
- Supabase client helper (placeholder)
- GPT integration placeholders (serverless / edge function endpoints assumed)

--- SETUP ---
Recommended stack:
- Expo (React Native)
- React Navigation
- NativeWind (Tailwind for RN)
- @supabase/supabase-js
- openai / or fetch to your AI edge functions

Quick start (local):
1. Install Expo CLI: `npm install -g expo-cli` (or use `npx expo`)
2. Create project: `expo init ai-cooking-companion` -> choose blank (managed) template
3. Replace App.js with this App.jsx content (rename if necessary)
4. Install deps:
   npm install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
   npm install @supabase/supabase-js
   npm install nativewind tailwindcss
   npm install expo-av expo-file-system
   (optionally) expo install react-native-gesture-handler react-native-reanimated
5. Set up Tailwind NativeWind per docs.
6. Create a Supabase project and get SUPABASE_URL and SUPABASE_ANON_KEY
7. Add environment vars (see .env.example below) and implement serverless AI endpoints for recipe extraction and captioning.

.env.example
REACT_NATIVE_SUPABASE_URL="https://xyz.supabase.co"
REACT_NATIVE_SUPABASE_ANON_KEY="public-anon-key"
AI_EDGE_BASE_URL="https://your-edge-functions.example.com" // endpoints: /extract, /caption, /mealplan, /scan

package.json (partial suggestions)
{
  "name": "ai-cooking-companion",
  "version": "0.1.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  }
}

--- Notes ---
- This scaffold focuses on structure and integration points. AI calls are routed to placeholder functions that expect server-side endpoints (recommended: host edge functions that call OpenAI and any nutrition APIs). Expect to implement CORS / auth and rate-limiting.
- For video parsing from Instagram/TikTok, using the platform APIs or asking user to upload the video will be more reliable and privacy-friendly.

*/

import React, { useEffect, useState, useRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Image, FlatList, ScrollView, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createClient } from '@supabase/supabase-js';

// === Supabase client setup (replace with env vars) ===
const SUPABASE_URL = process.env.REACT_NATIVE_SUPABASE_URL || 'REACT_NATIVE_SUPABASE_URL';
const SUPABASE_ANON_KEY = process.env.REACT_NATIVE_SUPABASE_ANON_KEY || 'REACT_NATIVE_SUPABASE_ANON_KEY';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// === AI Edge base URL (serverless functions that call GPT/Whisper/Nutrition APIs) ===
const AI_EDGE_BASE = process.env.AI_EDGE_BASE_URL || 'https://your-edge-functions.example.com';

// === Navigation ===
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="RecipeExtractor" component={RecipeExtractorScreen} />
        <Stack.Screen name="KitchenProfile" component={KitchenProfileScreen} />
        <Stack.Screen name="CommunityFeed" component={CommunityFeedScreen} />
        <Stack.Screen name="MealPlanner" component={MealPlannerScreen} />
        <Stack.Screen name="ScanAndCook" component={ScanAndCookScreen} />
        <Stack.Screen name="VoiceCook" component={VoiceCookScreen} />
        <Stack.Screen name="PostCreate" component={PostCreateScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// -------------------- Home --------------------
function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <ScrollView>
        <Text style={{ fontSize: 28, fontWeight: '700', marginBottom: 12 }}>AI Cooking Companion</Text>

        <SectionButton onPress={() => navigation.navigate('RecipeExtractor')} title="Extract Recipe from Link / Upload" />
        <SectionButton onPress={() => navigation.navigate('KitchenProfile')} title="My Kitchen Profile" />
        <SectionButton onPress={() => navigation.navigate('CommunityFeed')} title="Community Feed" />
        <SectionButton onPress={() => navigation.navigate('MealPlanner')} title="Weekly Meal Planner" />
        <SectionButton onPress={() => navigation.navigate('ScanAndCook')} title="Scan & Cook (fridge)" />
        <SectionButton onPress={() => navigation.navigate('VoiceCook')} title="Voice-guided Cooking Mode" />

        <View style={{ height: 32 }} />
        <Text style={{ fontSize: 20, fontWeight: '600' }}>Quick actions</Text>
        <Button title="Create Post" onPress={() => navigation.navigate('PostCreate')} />
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionButton({ onPress, title }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 14, backgroundColor: '#f3f4f6', borderRadius: 10, marginVertical: 8 }}>
      <Text style={{ fontSize: 18 }}>{title}</Text>
    </TouchableOpacity>
  );
}

// -------------------- Auth (placeholder) --------------------
function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signUp() {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) Alert.alert('Error', error.message);
    else Alert.alert('Success', 'Check your email for confirmation');
  }

  async function signIn() {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) Alert.alert('Error', error.message);
    else Alert.alert('Signed in');
  }

  return (
    <SafeAreaView style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>Sign in / Sign up</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, padding: 10, marginBottom: 8 }} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, padding: 10, marginBottom: 8 }} />
      <Button title="Sign in" onPress={signIn} />
      <View style={{ height: 8 }} />
      <Button title="Sign up" onPress={signUp} />
    </SafeAreaView>
  );
}

// -------------------- Recipe Extractor --------------------
function RecipeExtractorScreen() {
  const [link, setLink] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function extract() {
    if (!link) return Alert.alert('Please paste a link or upload a file');
    setLoading(true);
    try {
      // Call your edge function which will fetch the video/transcript and call OpenAI to extract recipe
      const res = await fetch(`${AI_EDGE_BASE}/extract`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: link })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Paste a recipe link (YouTube/TikTok/Instagram) or upload video</Text>
      <TextInput placeholder="https://" value={link} onChangeText={setLink} style={{ borderWidth: 1, padding: 10, marginVertical: 12 }} />
      <Button title={loading ? 'Extracting...' : 'Extract Recipe'} onPress={extract} disabled={loading} />

      {result && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: '700' }}>Shopping List</Text>
          <FlatList data={result.shopping_list || []} keyExtractor={(i, idx) => String(idx)} renderItem={({ item }) => <Text>- {item}</Text>} />

          <Text style={{ fontSize: 18, fontWeight: '700', marginTop: 8 }}>Steps</Text>
          <FlatList data={result.steps || []} keyExtractor={(i, idx) => String(idx)} renderItem={({ item, index }) => <Text>{index + 1}. {item}</Text>} />

          <Text style={{ marginTop: 8 }}>Estimated time: {result.time_estimate || '—'}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

// -------------------- Kitchen Profile --------------------
function KitchenProfileScreen() {
  const [profile, setProfile] = useState({ appliances: ['pan', 'oven'], utensils: ['knife', 'cutting board'] });
  const [newItem, setNewItem] = useState('');

  function addItem() {
    if (!newItem) return;
    setProfile(prev => ({ ...prev, appliances: [...prev.appliances, newItem] }));
    setNewItem('');
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Kitchen Profile</Text>
      <Text style={{ marginTop: 12, fontWeight: '700' }}>Appliances</Text>
      {profile.appliances.map((a, i) => <Text key={i}>• {a}</Text>)}

      <Text style={{ marginTop: 12, fontWeight: '700' }}>Utensils</Text>
      {profile.utensils.map((u, i) => <Text key={i}>• {u}</Text>)}

      <TextInput placeholder="Add appliance (e.g., air fryer)" value={newItem} onChangeText={setNewItem} style={{ borderWidth: 1, padding: 10, marginTop: 12 }} />
      <Button title="Add" onPress={addItem} />

      <View style={{ marginTop: 16 }}>
        <Text style={{ fontWeight: '600' }}>How the app uses this:</Text>
        <Text>- Recipes are adapted to your devices (e.g., no air fryer -> oven method)</Text>
        <Text>- Save frequently used profiles: Home / Travel / Work</Text>
      </View>
    </SafeAreaView>
  );
}

// -------------------- Community Feed --------------------
function CommunityFeedScreen({ navigation }) {
  // Demo static posts; in reality you'd fetch from Supabase table 'posts' and subscribe to realtime
  const [posts, setPosts] = useState([
    { id: '1', user: 'ChefAnna', image: null, caption: '10-minute shakshuka', likes: 12 },
  ]);

  return (
    <SafeAreaView style={{ flex: 1, padding: 12 }}>
      <Button title="Create Post" onPress={() => navigation.navigate('PostCreate')} />
      <FlatList data={posts} keyExtractor={p => p.id} renderItem={({ item }) => (
        <View style={{ padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
          <Text style={{ fontWeight: '700' }}>{item.user}</Text>
          <Text>{item.caption}</Text>
          <Text>Likes: {item.likes}</Text>
        </View>
      )} />
    </SafeAreaView>
  );
}

// -------------------- Post Create (photo -> AI caption + format) --------------------
function PostCreateScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  async function pickImage() {
    Alert.alert('Pick image', 'Implement image picker (expo-image-picker)');
  }

  async function generateCaption() {
    if (!imageUri) return Alert.alert('Upload a photo first');
    setLoading(true);
    try {
      // Send image to caption endpoint which runs vision + GPT to create caption + formatted recipe
      const res = await fetch(`${AI_EDGE_BASE}/caption`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageUri })
      });
      const data = await res.json();
      setCaption(data.caption);
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  }

  async function publish() {
    // Save to Supabase posts: image, caption, user
    Alert.alert('Publish', 'Implement uploading to Supabase storage and insert to posts table');
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Create Post</Text>
      <TouchableOpacity onPress={pickImage} style={{ marginTop: 12, padding: 12, backgroundColor: '#f3f4f6', borderRadius: 8 }}>
        <Text>{imageUri ? 'Change Photo' : 'Upload Photo'}</Text>
      </TouchableOpacity>
      <View style={{ height: 12 }} />
      <Button title={loading ? 'Generating...' : 'Generate Caption & Recipe Card'} onPress={generateCaption} />
      <TextInput placeholder="Caption" value={caption} onChangeText={setCaption} multiline style={{ borderWidth: 1, padding: 10, marginTop: 12, minHeight: 80 }} />
      <Button title="Publish" onPress={publish} />
    </SafeAreaView>
  );
}

// -------------------- Meal Planner --------------------
function MealPlannerScreen() {
  const [uploadedRecipes, setUploadedRecipes] = useState([]); // each: {id, title, ingredients, nutrients}
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  async function createPlan() {
    if (uploadedRecipes.length === 0) return Alert.alert('Upload recipes first');
    setLoading(true);
    try {
      const res = await fetch(`${AI_EDGE_BASE}/mealplan`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipes: uploadedRecipes, preferences: { calories_target: 2000 } })
      });
      const data = await res.json();
      setPlan(data);
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Weekly Meal Planner</Text>
      <Text style={{ marginTop: 8 }}>Upload recipes or pick from your saved recipes to generate a week plan that balances nutrients.</Text>
      <TouchableOpacity style={{ marginTop: 12, padding: 12, backgroundColor: '#f3f4f6', borderRadius: 8 }} onPress={() => Alert.alert('Upload', 'Implement recipe upload picker') }>
        <Text>Upload Recipe</Text>
      </TouchableOpacity>

      <Button title={loading ? 'Creating plan...' : 'Generate Weekly Plan'} onPress={createPlan} />

      {plan && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: '700' }}>Your Plan</Text>
          {plan.days?.map((d, i) => (
            <View key={i} style={{ marginTop: 8 }}>
              <Text style={{ fontWeight: '700' }}>{d.day}</Text>
              {d.meals.map((m, j) => <Text key={j}>- {m.title} ({m.servings})</Text>)}
            </View>
          ))}

          <Text style={{ marginTop: 8, fontWeight: '700' }}>Consolidated Shopping List</Text>
          <FlatList data={plan.shopping_list || []} keyExtractor={(i, idx) => String(idx)} renderItem={({ item }) => <Text>- {item}</Text>} />
        </View>
      )}
    </SafeAreaView>
  );
}

// -------------------- Scan & Cook --------------------
function ScanAndCookScreen() {
  const [image, setImage] = useState(null);
  const [suggestions, setSuggestions] = useState(null);

  async function scanFridge() {
    Alert.alert('Scan', 'Implement image picker and upload. Calls /scan endpoint that runs vision + recipe retrieval');
  }

  async function getSuggestions() {
    if (!image) return Alert.alert('Upload a fridge photo first');
    try {
      const res = await fetch(`${AI_EDGE_BASE}/scan`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ image }) });
      const data = await res.json();
      setSuggestions(data);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 12 }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Scan & Cook</Text>
      <Button title="Upload fridge photo" onPress={scanFridge} />
      <Button title="Get Suggestions" onPress={getSuggestions} />
      {suggestions && (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: '700' }}>Suggested recipes</Text>
          {suggestions.recipes?.map((r, i) => <Text key={i}>- {r.title}</Text>)}
        </View>
      )}
    </SafeAreaView>
  );
}

// -------------------- Voice-guided Cooking Mode --------------------
function VoiceCookScreen() {
  const [steps, setSteps] = useState(['Preheat oven to 180°C', 'Mix flour and eggs', 'Bake 30 minutes']);
  const [index, setIndex] = useState(0);

  function nextStep() { setIndex(i => Math.min(i + 1, steps.length - 1)); }
  function prevStep() { setIndex(i => Math.max(i - 1, 0)); }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Voice-guided Cooking</Text>
      <Text style={{ marginTop: 12, fontSize: 18 }}>{index + 1}. {steps[index]}</Text>
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <Button title="Previous" onPress={prevStep} />
        <View style={{ width: 12 }} />
        <Button title="Next" onPress={nextStep} />
      </View>
      <View style={{ marginTop: 12 }}>
        <Text>Implement voice playback with expo-av and text-to-speech. Also allow voice commands ("next", "repeat").</Text>
      </View>
    </SafeAreaView>
  );
}

// ================= Helper utilities & notes =================

/*
Implementation notes (where to connect AI):

1) /extract endpoint
   - Accepts { url } OR raw uploaded video
   - Steps: fetch video/transcript -> run Whisper (if audio) -> call GPT with instructions to extract:
     - Title
     - Ingredients (with quantities if possible)
     - Step-by-step instructions
     - Time estimates
     - Nutrition estimation (call nutrition API or GPT with nutrition database)
   - Return structured JSON: { title, shopping_list: [], steps: [], time_estimate, nutrition }

2) /caption endpoint
   - Accepts image (or image url)
   - Run vision (CLIP / vision model) and GPT to produce an engaging caption, tags, and optional formatted recipe card.

3) /mealplan endpoint
   - Accepts uploaded recipes list (with nutrients)
   - Apply constraints (calorie targets, dislikes, allergies, appliances available) and return week plan + consolidated shopping list.

4) /scan endpoint
   - Accepts fridge photo, returns list of detected ingredients and suggested recipes.

Security & Privacy:
- For user-uploaded videos/images, store in Supabase Storage with appropriate RLS policies.
- Keep AI keys server-side (never embed in app). Use signed endpoints or serverless functions.
- Use Supabase Row-Level Security and policies for multi-tenant data safety.

Potential DB schema (Supabase Postgres):
- users (auth)
- kitchens (user_id, appliances: jsonb, utensils: jsonb)
- posts (id, user_id, image_url, caption, recipe_json)
- recipes (id, user_id, title, ingredients_json, steps_json, nutrients_json, source_url)
- meal_plans (id, user_id, plan_json, shopping_list_json)

Extras to implement later:
- Live cooking mode (synchronised timers & multi-user)
- Gamification & badges
- Follow/follower social graph
- Ingredient auto-substitute suggestions (e.g., vegan swap)
- Offline caching of recipes and shopping lists

*/

// EOF

