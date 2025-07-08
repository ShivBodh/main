import dotenv from 'dotenv';
import path from 'path';

// Explicitly load environment variables from the root .env file.
// This is the first file loaded when running `genkit:watch`, ensuring the
// GOOGLE_API_KEY is available before any plugins are initialized.
dotenv.config({ path: path.resolve(process.cwd(), '.env') });


// By importing the flows here, we ensure they are registered with the Genkit server
// when running `genkit:watch`.
import './flows/bodhi-ai-move-flow';
import './flows/daily-wisdom-flow';
import './flows/image-generator-flow';
import './flows/content-processor-flow';
