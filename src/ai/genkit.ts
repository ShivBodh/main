
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// The .env file should be automatically loaded by Next.js in development.
// In a deployed App Hosting environment, these variables are set in the runtime.
//
// Note: The `genkit` command-line tool may not automatically load .env files.
// If you're using the Genkit CLI directly, you might need to use a package
// like `dotenv` to load your environment variables.

export const ai = genkit({
  // The Google AI plugin is configured to use the GEMINI_API_KEY from the environment.
  // This is a secure and flexible approach for both local development and deployment.
  plugins: [googleAI({apiKey: process.env.GEMINI_API_KEY})],

  // It's best practice to specify the model in each AI call
  // instead of setting a global default. This avoids confusion,
  // especially when using different models for different tasks
  // (e.g., text vs. image generation).
});
