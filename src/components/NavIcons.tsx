"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import CartModal from "./CartModal"

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const isLogin = true
  const router = useRouter()

  const handleProfile = () => {
    if (!isLogin) {
      router.push("/login")
      return
    }
    setIsProfileOpen(prev => !prev)
  }

  return (
    <div className="flex justify-items-center gap-4 xl:gap-6 relative">
      <Image 
        src="/profile.png" 
        alt="" height={22} 
        width={22} 
        className="cursor-pointer" 
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute p-4 top-12 left-0 text-sm bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/">Profile</Link>
          <div className="mt-2 cursor-pointer">Logout</div>
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
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-badgeNumber rounded-full text-white text-sm flex items-center justify-center">2</div>
      </div>
      {isCartOpen && (
        <CartModal />
      )}
    </div>
  )
}

export default NavIcons