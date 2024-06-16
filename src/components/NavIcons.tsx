"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

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
        <div className="absolute p-4 top-12 left-0 text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          <Link href="/">Profile</Link>
          <div className="mt-2 cursor-pointer">Logout</div>
        </div>
      )}
      <Image src="/notification.png" alt="" height={22} width={22} className="cursor-pointer" />
      <Image 
        src="/cart.png" 
        alt="" 
        height={22} 
        width={22} 
        className="cursor-pointer" 
        onClick={() => setIsCartOpen(prev => !prev)}
      />
      {isCartOpen && (
        <div className="">Cart</div>
      )}
    </div>
  )
}

export default NavIcons