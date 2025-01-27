// supabase/functions/login/youtube.ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { AuthConfig } from "../../_shared/types.ts";

const config: AuthConfig = {
  clientId: Deno.env.get("YOUTUBE_CLIENT_ID") ?? "",
  clientSecret: Deno.env.get("YOUTUBE_CLIENT_SECRET") ?? "",
  redirectUri: `${Deno.env.get("BASE_URL")}/v1/auth/youtube/callback`,
  scope: ["https://www.googleapis.com/auth/youtube.readonly"],
};

export async function handleLogin(req: Request) {
  const authUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${config.clientId}&` +
    `redirect_uri=${encodeURIComponent(config.redirectUri)}&` +
    `scope=${encodeURIComponent(config.scope.join(" "))}&` +
    `response_type=code&` +
    `access_type=offline`;

  return new Response(JSON.stringify({ url: authUrl }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
