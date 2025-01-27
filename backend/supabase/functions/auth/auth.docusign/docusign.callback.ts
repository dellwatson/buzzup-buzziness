import { corsHeaders } from "../../_shared/cors.ts";
import { getQueryParams } from "../../_shared/utils.ts";
import { supabase } from "../../_shared/supabase.ts";
import { getUserInfo } from "../../_shared/utils/user.utils.ts";
// import { exchangeCodeForTokens } from "../../_shared/docusign.ts";

function exchangeCodeForTokens(code: string, codeVerifier: string) {
  // TODO: Implement this
  return {
    access_token: "mock_access_token",
    refresh_token: "mock_refresh_token",
    expires_in: 3600,
    token_type: "Bearer",
  };
}

export async function handler(req: Request) {
  try {
    const { code, state } = getQueryParams(req);

    if (!code || !state) {
      throw new Error("Missing code or state parameter");
    }

    // Retrieve stored code verifier using state
    const codeVerifier = await getStoredCodeVerifier(state);
    if (!codeVerifier) {
      throw new Error("Invalid state parameter");
    }

    // Retrieve and validate PKCE data
    const { data: authState } = await supabase
      .from("auth_state")
      .select("*")
      .eq("state", state)
      .single();

    if (!authState || new Date(authState.expires_at) < new Date()) {
      throw new Error("Invalid or expired auth state");
    }

    // Exchange code for tokens...
    const tokens = await exchangeCodeForTokens(code, authState.code_verifier);

    // Get DocuSign user info
    const userInfo = await getUserInfo("docusign", tokens.access_token);

    // Store integration data
    await supabase.from("accounts").upsert({
      account_id: authState.account_id, // -> `docusign_${userInfo.sub}`
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: new Date(Date.now() + tokens.expires_in * 1000),
      docusign_user_id: userInfo.sub,
      docusign_account_id: userInfo.accounts[0].account_id,
      docusign_base_uri: userInfo.accounts[0].base_uri,
    });

    // Clean up auth state
    await supabase.from("auth_state").delete().eq("state", state);

    return new Response(
      JSON.stringify({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_in: tokens.expires_in,
        token_type: tokens.token_type,
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
