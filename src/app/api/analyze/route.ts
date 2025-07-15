import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get API URL from environment variables
    const apiUrl = process.env.API_URL || process.env.PYTHON_API_URL || 'http://localhost:8000';
    
    console.log(`Attempting to connect to Python API at: ${apiUrl}`);
    
    // Forward the request to the Python API
    const response = await fetch(`${apiUrl}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Python API error (${response.status}):`, errorText);
      throw new Error(`Python API responded with status: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Request timeout - Python API took too long to respond' },
          { status: 504 }
        );
      }
      if (error.message.includes('ECONNREFUSED')) {
        return NextResponse.json(
          { error: 'Cannot connect to Python API. Please check if the API_URL environment variable is set correctly.' },
          { status: 503 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to analyze documents', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
