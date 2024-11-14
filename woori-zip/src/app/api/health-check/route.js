// src/app/api/health-check/route.js

export async function GET(req) {
    return new Response(JSON.stringify({ status: "OK", message: "Service is running" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
  