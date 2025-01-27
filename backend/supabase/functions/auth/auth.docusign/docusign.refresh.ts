import { corsHeaders } from "../_shared/cors.ts";

import {
  DOCUSIGN_CLIENT_ID,
  DOCUSIGN_CLIENT_SECRET,
  DOCUSIGN_TOKEN_URL,
} from "../../_shared/credentials.ts";

// requesting token refresh
export default async function handler(req: Request) {
  try {
    if (req.method !== "POST") {
      throw new Error("Method not allowed");
    }

    // will load the account-table row to get the refresh token
    const { refresh_token } = await req.json();

    if (!refresh_token) {
      throw new Error("Refresh token is required");
    }

    const tokenResponse = await fetch(DOCUSIGN_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
        client_id: DOCUSIGN_CLIENT_ID!,
        client_secret: DOCUSIGN_CLIENT_SECRET!,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(tokenData.error || "Failed to refresh token");
    }

    // TODO: store the new tokens in the database
    // differentiate refresh token supabase table and from provider table
    // i think this function is to request the new tokens from the provider
    return new Response(
      JSON.stringify({
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_in: tokenData.expires_in,
        token_type: tokenData.token_type,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
}
