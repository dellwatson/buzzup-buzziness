// import { supabase } from "../client";
// import { Provider } from "../types/type.account";
// import { OAuthConfig, AuthState } from "../types/type.auth";

// PKCE Helper functions
export function generateCodeVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64URLEncode(array);
}

export async function generateCodeChallenge(verifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return base64URLEncode(new Uint8Array(hash));
}

export function base64URLEncode(buffer: Uint8Array) {
  return btoa(String.fromCharCode(...buffer))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// export async function generateAuthUrl(config: OAuthConfig, groupId?: string) {
//   const state = crypto.randomUUID();
//   const authUrl = new URL(config.authUrl);

//   // Base params
//   authUrl.searchParams.set("response_type", "code");
//   authUrl.searchParams.set("client_id", config.clientId);
//   authUrl.searchParams.set("state", state);
//   authUrl.searchParams.set("scope", config.scopes.join(" "));

//   // Add PKCE if provider uses it
//   let codeVerifier: string | undefined;
//   if (config.usesPKCE) {
//     codeVerifier = generateCodeVerifier();
//     const codeChallenge = await generateCodeChallenge(codeVerifier);
//     authUrl.searchParams.set("code_challenge", codeChallenge);
//     authUrl.searchParams.set("code_challenge_method", "S256");
//   }

//   // Store state
//   await supabase.from("auth_states").insert({
//     provider: config.provider,
//     group_id: groupId,
//     state,
//     code_verifier: codeVerifier,
//     expires_at: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
//   });

//   return authUrl.toString();
// }

// export async function handleOAuthCallback(
//   provider: Provider,
//   code: string,
//   state: string
// ) {
//   // Validate state and get verifier if exists
//   const { data: authState } = await supabase
//     .from("auth_states")
//     .select("*")
//     .eq("state", state)
//     .single();

//   if (!authState || new Date(authState.expires_at) < new Date()) {
//     throw new Error("Invalid or expired auth state");
//   }

//   // Get provider config
//   const config = getOAuthConfig(provider);

//   // Exchange code for tokens
//   const tokenResponse = await exchangeCodeForTokens(
//     config,
//     code,
//     authState.code_verifier
//   );

//   // Clean up auth state
//   await supabase.from("auth_states").delete().eq("state", state);

//   return tokenResponse;
// }
