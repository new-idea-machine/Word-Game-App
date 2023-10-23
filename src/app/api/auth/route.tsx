import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'  
 
type ResponseData = {
  message: string
}

export async function POST(request: NextApiRequest) {
  let body;

  try {
    // Read the request body and parse it as JSON
    body = JSON.parse(await request.text());
  } catch (error) {
    console.error("Error parsing request body as JSON:", error);
    return NextResponse.error();
  }

  console.log(body);

  return NextResponse.json({ message: 'Hello from Next.js!' });

}

