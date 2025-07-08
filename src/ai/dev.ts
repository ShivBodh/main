
import dotenv from 'dotenv';
import path from 'path';

// Explicitly load environment variables from the root .env file.
dotenv.config({ path: path.resolve(process.cwd(), '.env') });


// By importing the flows here, we ensure they are registered with the Genkit
// server when running in development mode. This is the standard pattern for Genkit.
import './flows/content-processor-flow';
import './flows/bodhi-ai-move-flow';
import './flows/daily-wisdom-flow';
import './flows/image-generator-flow';
