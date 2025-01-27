// functions/auth/index.ts
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// Import handlers for different social providers
// import { handleYoutubeAuth } from "./auth.youtube/_index.ts";
// import { handleTwitterAuth } from "./auth.twitter/_index.ts";
import handleDocusignAuth from "./auth.docusign/_index.ts";
import { handleHelloAuth } from "./_auth.hello/hello._index.ts";

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const pathSegments = url.pathname.split("/").filter(Boolean);
  const providerIndex = pathSegments.indexOf("auth") + 1;
  const provider = pathSegments[providerIndex];

  console.log("provider", provider);

  switch (provider) {
    // case "youtube":
    //   return await handleYoutubeAuth(req);
    case "docusign":
      return await handleDocusignAuth(req);
    case "hello":
      return await handleHelloAuth(req);
    default:
      return new Response("Not found", { status: 404 });
  }
});
