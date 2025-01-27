import { OAUTH_CONFIGS } from "./oauth.config";
import {
  generateCodeVerifier,
  generateCodeChallenge,
} from "../utils/crypto.utils";
import { Provider } from "../types/type.account";
import { supabase } from "../client";

export class OAuthService {
  static async generateAuthUrl(provider: Provider, groupId?: string) {
    const config = OAUTH_CONFIGS[provider];
    if (!config) throw new Error(`Unsupported provider: ${provider}`);

    const state = crypto.randomUUID();
    const authUrl = new URL(config.authUrl);

    // Set base params...
    const params: Record<string, string> = {
      response_type: "code",
      client_id: config.clientId,
      state,
      scope: config.scopes.join(" "),
    };

    // Add PKCE if enabled
    let codeVerifier: string | undefined;
    if (config.usesPKCE) {
      codeVerifier = generateCodeVerifier();
      params.code_challenge = await generateCodeChallenge(codeVerifier);
      params.code_challenge_method = "S256";
    }

    // Set all params
    Object.entries(params).forEach(([key, value]) =>
      authUrl.searchParams.set(key, value)
    );

    // Store auth state
    await this.storeAuthState(provider, state, codeVerifier, groupId);

    return authUrl.toString();
  }

  static async handleCallback(provider: Provider, code: string, state: string) {
    const { data: authState } = await supabase
      .from("auth_states")
      .select("*")
      .eq("state", state)
      .single();

    if (!authState || new Date(authState.expires_at) < new Date()) {
      throw new Error("Invalid or expired auth state");
    }
    const config = OAUTH_CONFIGS[provider];

    // making this into modularity based on params ?
    const tokens = await OAuthService.exchangeCodeForTokens(
      config,
      code,
      authState.code_verifier
    );

    // Clean up auth state
    await supabase.from("auth_states").delete().eq("state", state);

    return tokens;
  }

  private static async storeAuthState(
    provider: Provider,
    state: string,
    codeVerifier?: string,
    groupId?: string
  ) {
    return await supabase.from("auth_states").insert({
      provider,
      group_id: groupId,
      state,
      code_verifier: codeVerifier,
      expires_at: new Date(Date.now() + 10 * 60 * 1000),
    });
  }

  // ... other private methods
}
