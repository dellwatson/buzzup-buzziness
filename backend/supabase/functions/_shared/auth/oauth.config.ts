import { Provider } from "../types/type.account.ts";
import {
  DOCUSIGN_CLIENT_ID,
  DOCUSIGN_CLIENT_SECRET,
  DOCUSIGN_URL,
  DOCUSIGN_AUTH_URL,
  DOCUSIGN_TOKEN_URL,
} from "../credentials.ts";

export interface OAuthConfig {
  provider: Provider;
  usesPKCE: boolean;
  authUrl: string;
  tokenUrl: string;
  userInfoUrl?: string;
  scopes: string[];
  clientId: string;
  clientSecret?: string;
}

export const OAUTH_CONFIGS: Record<Provider, OAuthConfig> = {
  docusign: {
    provider: "docusign",
    usesPKCE: true,
    authUrl: DOCUSIGN_AUTH_URL,
    tokenUrl: DOCUSIGN_TOKEN_URL,
    userInfoUrl: `${DOCUSIGN_URL}/oauth/userinfo`,
    scopes: ["signature", "extended"],
    clientId: DOCUSIGN_CLIENT_ID,
    clientSecret: DOCUSIGN_CLIENT_SECRET,
  },
  // other providers...
  //lens
  lens: {
    provider: "lens",
    usesPKCE: false,
    authUrl: "https://api.lens.xyz/oauth/authorize",
    tokenUrl: "https://api.lens.xyz/oauth/token",
    scopes: ["profile", "email"],
    clientId: Deno.env.get("LENS_API_KEY")!,
  },
  //youtube
  youtube: {
    provider: "youtube",
    usesPKCE: false,
    authUrl: "https://accounts.google.com/o/oauth2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    scopes: ["profile", "email"],
    clientId: Deno.env.get("YOUTUBE_API_KEY")!,
  },
  //tiktok
  //linkedin
  //mastodon
  //twitter
};
