import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// The .env file is loaded automatically by Next.js and the Genkit CLI.
// There is no need to use the `dotenv` package.

export const ai = genkit({
  // By commenting out the googleAI plugin, we prevent initialization errors
  // when the GOOGLE_API_KEY is not set. This allows the mock flows to run.
  // plugins: [googleAI({apiKey: process.env.GOOGLE_API_KEY})],
  // It's best practice to specify the model in each AI call
  // instead of setting a global default. This avoids confusion,
  // especially when using different models for different tasks
  // (e.g., text vs. image generation).
});
