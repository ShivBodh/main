import dotenv from 'dotenv';
import path from 'path';

// Explicitly load environment variables from the .env file in the project root.
// This ensures that the GOOGLE_API_KEY is available for Genkit plugin initialization,
// which is crucial for the `genkit:watch` script.
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// By importing the flows here, we ensure they are registered with the Genkit server
// when running `genkit:watch`.
import './flows/bodhi-ai-move-flow';
import './flows/content-processor-flow';
import './flows/daily-wisdom-flow';
import './flows/image-generator-flow';
