import { OAuthStrategy, createClient } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import { cookies } from "next/headers";

export const wixClientServer = async () => {
  let refreshToken

  try {
    const cookiesStore = cookies()
    refreshToken = JSON.parse(cookiesStore.get("refreshToken")?.value || "{}")
  } catch(e) {}


  const wixClient = createClient({
    modules: {
      products,
      collections,
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        accessToken: {
          value: '',
          expiresAt: 0
        },
        refreshToken,
      }
    })
  })

  return wixClient
}