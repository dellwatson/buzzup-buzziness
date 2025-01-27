// config/oauth.ts
export const oauthConfig = {
  youtube: {
    authEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
    scopes: ["youtube.readonly", "userinfo.email"],
    routes: {
      auth: "/auth/youtube",
      callback: "/auth/youtube/callback",
    },
    // Different redirect URIs per environment
    redirectUris: {
      development: "http://localhost:54321/auth/youtube/callback",
      staging: "https://staging-api.example.com/auth/youtube/callback",
      production: "https://api.example.com/auth/youtube/callback",
    },
  },
  // ... other providers
};
