import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'  
// import NextCors from "nextjs-cors";
 
type ResponseData = {
  message: string
}

// method 1
// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   // if (req.method === 'POST') {
//     // Process a POST request
//     const body = JSON.parse(req.body)
//     console.log(body)
//     res.status(200).json({ message: 'Hello from Next.js!' })
//   // } else {
//   //   // Handle any other HTTP method
//   // }
// }

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     // Process a POST request
//     const body = JSON.parse(req.body)
//     console.log(body)
//     console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
//     console.log("request received")
//     res.status(200).json({ message: 'Hello from Next.js!' })
//   } else {
//     // Handle any other HTTP method
//   }
// }


// method 2

// export function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseData>
// ) {
//   res.status(200).json({ message: 'Hello from Next.js!' })
//   // return (<div>Hello World!</div>)
// }

export async function POST(request: NextApiRequest) {
  console.log(`!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`)
  console.log(request)
  console.log(`?????????????????????????`)

  let body;

  try {
    // Read the request body and parse it as JSON
    body = JSON.parse(await request.text());
  } catch (error) {
    console.error("Error parsing request body as JSON:", error);
    return NextResponse.error("Invalid JSON in the request body", 400);
  }

  console.log(body);

  return NextResponse.json({ message: 'Hello from Next.js!' });
  // const body = JSON.parse(request.body)
  // console.log(body) 
  // return NextResponse.json({ message: 'Hello from Next.js!' })
}

// export async function GET(request: Request) {
//   return NextResponse.json({ message: 'Hello from Next.js!' })
//   // return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
// }