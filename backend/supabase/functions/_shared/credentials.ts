// import "jsr:@supabase/functions-js/edge-runtime.d.ts"

// docusign
export const DOCUSIGN_CLIENT_ID = Deno.env.get("DOCUSIGN_CLIENT_ID")!;
export const DOCUSIGN_CLIENT_SECRET = Deno.env.get("DOCUSIGN_CLIENT_SECRET")!;
export const DOCUSIGN_REDIRECT_URI = Deno.env.get("DOCUSIGN_REDIRECT_URI")!;
export const DOCUSIGN_URL = Deno.env.get("DOCUSIGN_URL")!;
export const DOCUSIGN_AUTH_URL = `${DOCUSIGN_URL}/oauth/auth`;
export const DOCUSIGN_TOKEN_URL = `${DOCUSIGN_URL}/oauth/token`;

// lens
export const LENS_API_KEY = Deno.env.get("LENS_API_KEY")!;

// YouTube API Key (should be loaded from environment variables)
export const YOUTUBE_API_KEY = Deno.env.get("YOUTUBE_API_KEY")!;

// Twitter Bearer Token (should be loaded from environment variables)
export const TWITTER_BEARER_TOKEN = Deno.env.get("TWITTER_BEARER_TOKEN");

// supabase -->
export const SUPABASE_URL = Deno.env.get("S_URL")!;
export const SUPABASE_ANON_KEY = Deno.env.get("S_ANON_KEY")!;
// export const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
// export const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
