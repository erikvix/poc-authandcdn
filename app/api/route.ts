"use server";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export async function GET() {
  return new Response(JSON.stringify({ message: "Hello World" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
