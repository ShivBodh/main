import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import dotenv from 'dotenv';
import path from 'path';

// Explicitly load environment variables from the root .env file.
// This is the first file loaded in the AI chain, ensuring the
// GOOGLE_API_KEY is available before any plugins are initialized.
dotenv.config({ path: path.resolve(process.cwd(), '.env') });


export const ai = genkit({
  // The googleAI() plugin will automatically look for the
  // GOOGLE_API_KEY in the environment variables.
  plugins: [googleAI()],
  // It's best practice to specify the model in each AI call
  // instead of setting a global default. This avoids confusion,
  // especially when using different models for different tasks
  // (e.g., text vs. image generation).
});
