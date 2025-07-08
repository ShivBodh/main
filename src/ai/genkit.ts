import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// The .env file is loaded by `src/ai/dev.ts` for development
// and automatically by Next.js in production.

export const ai = genkit({
  // The googleAI() plugin will automatically look for the
  // GOOGLE_API_KEY in the environment variables.
  plugins: [googleAI()],
  // It's best practice to specify the model in each AI call
  // instead of setting a global default. This avoids confusion,
  // especially when using different models for different tasks
  // (e.g., text vs. image generation).
});
