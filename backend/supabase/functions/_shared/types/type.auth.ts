import { Provider } from "./type.account";

// Add to your existing types
export interface AuthState {
  id: string;
  group_id?: string;
  provider: Provider;
  state: string;
  code_verifier?: string; // Optional for PKCE-enabled providers
  created_at: Date;
  expires_at: Date;
}

// Add OAuth helper types
export interface OAuthConfig {
  provider: Provider;
  usesPKCE?: boolean;
  authUrl: string;
  tokenUrl: string;
  userInfoUrl?: string;
  scopes: string[];
  clientId: string;
  clientSecret?: string;
}
