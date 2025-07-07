// The Genkit CLI automatically loads the .env file.
// This file can be used for any other development-specific initializations if needed.

// By importing the flows here, we ensure they are registered with the Genkit server
// when running `genkit:watch`.
import './flows/bodhi-ai-move-flow';
import './flows/content-processor-flow';
import './flows/daily-wisdom-flow';
import './flows/dharma-art-flow';
import './flows/image-generator-flow';
import './flows/kids-guide-flow';
import './flows/thumbnail-generator-flow';
