
import dotenv from 'dotenv';
import path from 'path';

// Explicitly load environment variables from the root .env file.
dotenv.config({ path: path.resolve(process.cwd(), '.env') });


// By re-exporting the flows here, we ensure they are registered with the Genkit server
// when running `genkit:watch`. This is a more robust method than relying on
// side-effect imports.
// export * from './flows/bodhi-ai-move-flow';
// export * from './flows/daily-wisdom-flow';
// export * from './flows/image-generator-flow';
export * from './flows/content-processor-flow';
