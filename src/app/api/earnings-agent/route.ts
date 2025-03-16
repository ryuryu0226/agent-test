import { getEarnings } from "@/lib/get-earnings";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function GET() {
  const answer = await getEarnings();
  console.log(answer);
  return new Response(JSON.stringify({ answer: answer }));
}
