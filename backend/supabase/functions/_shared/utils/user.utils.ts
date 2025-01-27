// export async function getUserInfo(provider: Provider, accessToken: string) {
//   const config = getOAuthConfig(provider);
//   if (!config.userInfoUrl)
//     throw new Error("Provider does not support userinfo");

//   const response = await fetch(config.userInfoUrl, {
//     headers: { Authorization: `Bearer ${accessToken}` },
//   });

//   return response.json();
// }
