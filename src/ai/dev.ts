// By importing the flows here, we ensure they are registered with the Genkit server
// when running `genkit:watch`.
import './flows/bodhi-ai-move-flow';
import './flows/daily-wisdom-flow';
import './flows/image-generator-flow';

// We explicitly export the contentProcessorFlow to ensure it's registered
// for the scraper script to call.
export { contentProcessorFlow } from './flows/content-processor-flow';
