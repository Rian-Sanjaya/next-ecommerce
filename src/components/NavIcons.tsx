"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import CartModal from "./CartModal"
import { useWixClient } from "@/hooks/useWixClient"
import { useCartStore } from "@/hooks/useCartStore"

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()
  const pathName = usePathname();

  const wixClient = useWixClient()
  const isLoggedIn = wixClient.auth.loggedIn()

  // TEMPORARY
  // const isLoggedIn = true

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login")
    } else {
      setIsProfileOpen(prev => !prev)
    }
  }

  // AUTH WITH WIX-MANAGED AUTH

  // const wixClient = useWixClient();

  // const login = async () => {
  //   const loginRequestData = wixClient.auth.generateOAuthData(
  //     "http://localhost:3000"
  //   );

  //   console.log(loginRequestData);

  //   localStorage.setItem("oAuthRedirectData", JSON.stringify(loginRequestData));
  //   const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);
  //   window.location.href = authUrl;
  // };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
    // router.push("/login");
  };

  const { cart, counter, getCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  return (
    <div className="flex justify-items-center gap-4 xl:gap-6 relative">
      <Image 
        src="/profile.png" 
        alt="" height={22} 
        width={22} 
        className="cursor-pointer" 
        // onClick={login}
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute p-4 top-12 left-0 text-sm bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/">Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            {isLoading ? "Logging out" : "Logout"}
          </div>
        </div>
      )}
      <Image src="/notification.png" alt="" height={22} width={22} className="cursor-pointer" />
      <div className="relative cursor-pointer" onClick={() => setIsCartOpen(prev => !prev)}>
        <Image 
          src="/cart.png" 
          alt="" 
          height={22} 
          width={22} 
          className="cursor-pointer" 
        />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-badgeNumber rounded-full text-white text-sm flex items-center justify-center">
          {counter}
        </div>
      </div>
      {isCartOpen && (
        <CartModal />
      )}
    </div>
  )
}

export default NavIcons