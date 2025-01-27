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
