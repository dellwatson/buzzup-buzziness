import { corsHeaders } from "../../_shared/cors.ts";
import {
  DOCUSIGN_AUTH_URL,
  DOCUSIGN_CLIENT_ID,
  DOCUSIGN_REDIRECT_URI,
} from "../../_shared/credentials.ts";
import { crypto } from "https://deno.land/std/crypto/mod.ts";
import { supabase } from "../../_shared/supabase.ts";

export default async function handler(req: Request) {
  try {
    const state = crypto.randomUUID();
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // // Store PKCE data temporarily
    // await supabase.from('docusign_auth_state').insert({
    //   state,
    //   code_verifier: codeVerifier,
    //   created_at: new Date(),
    //   expires_at: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    //   // account_id: req.user?.id  // if user is already logged in
    // });
    // Store the code verifier in your database or session
    // TODO: You need to implement this storage, for example:
    // await storeCodeVerifier(state, codeVerifier);

    // The complete URL will look like:
    // https://account-d.docusign.com/oauth/auth?
    //   response_type=code&
    //   client_id=9ae53936-1eb2-4fbc-b928-47aab33061a3&
    //   redirect_uri=https://0ad1-66-96-225-93.ngrok-free.app/functions/v1/auth/docusign/callback&
    //   scope=signature+extended&
    //   state=123e4567-e89b-12d3-a456-426614174000&
    //   code_challenge=abc123...&
    //   code_challenge_method=S256&
    //   prompt=login

    // Construct the OAuth authorization URL
    const authUrl = new URL(DOCUSIGN_AUTH_URL);
    authUrl.searchParams.append("response_type", "code");
    authUrl.searchParams.append("client_id", DOCUSIGN_CLIENT_ID!);
    authUrl.searchParams.append("redirect_uri", DOCUSIGN_REDIRECT_URI!);
    authUrl.searchParams.append("scope", "signature extended");
    authUrl.searchParams.append("prompt", "login");
    authUrl.searchParams.append("state", state);
    authUrl.searchParams.append("code_challenge", codeChallenge);
    authUrl.searchParams.append("code_challenge_method", "S256");

    // Return the authorization URL
    return new Response(
      JSON.stringify({
        url: authUrl.toString(),
        state,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
}
