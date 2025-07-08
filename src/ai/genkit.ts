import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// The .env file is now loaded in `dev.ts`, which is the entry point
// for the Genkit server. This ensures the environment variables are
// available before this file is even imported.

export const ai = genkit({
  // Explicitly passing the API key to the plugin is a more robust
  // way to ensure it's loaded correctly.
  plugins: [googleAI({apiKey: process.env.GOOGLE_API_KEY})],
  // It's best practice to specify the model in each AI call
  // instead of setting a global default. This avoids confusion,
  // especially when using different models for different tasks
  // (e.g., text vs. image generation).
});
