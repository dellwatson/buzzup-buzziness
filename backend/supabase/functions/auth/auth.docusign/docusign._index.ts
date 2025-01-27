import { createPlatformHandler } from "../../_shared/platform.wrapper.ts";

const handlers = {
  login: async (req: Request) => {
    const { default: loginHandler } = await import("./docusign.login.ts");
    return await loginHandler(req);
  },
  callback: async (req: Request) => {
    const { default: callbackHandler } = await import("./docusign.callback.ts");
    return await callbackHandler(req);
  },
  refresh: async (req: Request) => {
    const { default: refreshHandler } = await import("./docusign.refresh.ts");
    return await refreshHandler(req);
  },
};

export default createPlatformHandler(handlers);

// handleRoute
// -> callback, login
// -> refresh

// // auth/youtube/index.ts - Initial auth route
// serve(async (req) => {
//     // Generate random state
//     const state = crypto.randomUUID()

//     // Store state temporarily (usually in session/db)
//     await supabase.from('oauth_states').insert({
//       state,
//       created_at: new Date(),
//       expires_at: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
//     })

//     const authUrl = `${YOUTUBE_AUTH_URL}?${new URLSearchParams({
//       client_id: Deno.env.get('GOOGLE_CLIENT_ID') || '',
//       redirect_uri: `${Deno.env.get('API_URL')}/auth/youtube/callback`,
//       response_type: 'code',
//       state, // Include state in auth request
//       scope: ['youtube.readonly'].join(' ')
//     })}`

//     return new Response(JSON.stringify({ url: authUrl }))
//   })

// // auth/youtube/routes.ts
// export const routes = {
//   // Initial auth route
//   auth: "/auth/youtube",
//   // Callback route
//   callback: "/auth/youtube/callback",
//   // Token refresh route
//   refresh: "/auth/youtube/refresh",
// };

// // Different security policies per route
// export const security = {
//   [routes.auth]: {
//     cors: ["*"],
//     methods: ["GET"],
//   },
//   [routes.callback]: {
//     cors: [FRONTEND_URL],
//     methods: ["GET"],
//     validateState: true,
//   },
//   [routes.refresh]: {
//     cors: [FRONTEND_URL],
//     methods: ["POST"],
//     requireAuth: true,
//   },
// };
