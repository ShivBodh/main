
import { NextResponse } from 'next/server';

/**
 * This is the API endpoint that will receive webhook notifications from Canva.
 * For example, when a user creates a design, Canva can send data about that design to this URL.
 *
 * @param request The incoming request from Canva.
 * @returns A JSON response indicating success or failure.
 */
export async function POST(request: Request) {
  try {
    // We get the data sent by Canva from the request body.
    const body = await request.json();

    // For now, we'll just log it to the server console.
    // In a real implementation, you would process this data:
    // e.g., save the design URL to the user's profile in Firestore.
    console.log('Received Canva Webhook:', body);

    // It's important to send back a successful response to let Canva know
    // that the webhook was received correctly.
    return NextResponse.json({ message: 'Webhook received successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error processing Canva webhook:', error);
    // If something goes wrong, return an error response.
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Canva may also send a GET request to verify the endpoint.
export async function GET() {
    return NextResponse.json({ message: 'Canva Webhook endpoint is active.' }, { status: 200 });
}
