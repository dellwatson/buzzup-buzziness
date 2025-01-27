import { corsHeaders } from "./cors.ts";

export type HandlerFunction = (req: Request) => Promise<Response>;

// todo: making auth wrapper and store state to prevent XSRF

export function createPlatformHandler(
  handlers: Record<string, HandlerFunction>
) {
  return async (req: Request) => {
    const url = new URL(req.url);
    const path = url.pathname.split("/").pop();

    if (!path) {
      return new Response(JSON.stringify({ error: "Invalid path" }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    const handler = handlers[path];
    if (!handler) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    return await handler(req);
  };
}
