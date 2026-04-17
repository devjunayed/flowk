'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/transactions', label: 'Transactions' },
    { href: '/debts', label: 'Debts' },
    { href: '/monthly', label: 'Monthly' },
    { href: '/yearly', label: 'Yearly' },
  ]

  return (
    <header>
      <nav className="sticky top-0 z-50 flex items-center justify-between h-15 px-6 bg-[#081410]/90 backdrop-blur-md border-b border-[#5DCAA5]/10">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div>
            <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
              <rect width="32" height="32" rx="7" fill="#0F6E56" />
              <polygon points="16,6 25,20 7,20" fill="white" />
              <circle cx="16" cy="26" r="3" fill="#5DCAA5" />
            </svg>
          </div>
          <span className="text-[18px] font-bold tracking-tight text-[#e1f5ee]">
            Flowk
          </span>
        </Link>

        {/* Desktop Links */}
        {session && (
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-sm transition 
                  ${pathname.startsWith(link.href)
                    ? 'text-[#5DCAA5] bg-[#5DCAA5]/10'
                    : 'text-[#e1f5ee]/50 hover:text-[#e1f5ee] hover:bg-[#5DCAA5]/10'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Right */}
        <div className="flex items-center gap-2 relative">

          {status === 'loading' ? (
            <div className="w-20 h-8 rounded-md bg-[#5DCAA5]/10 animate-pulse" />
          ) : session ? (
            <div className="flex items-center gap-2 relative">

              <span className="hidden md:block text-sm text-[#e1f5ee]/60">
                {session.user?.name?.split(' ')[0]}
              </span>

              <button
                onClick={() => setMenuOpen(prev => !prev)}
                className="w-8 h-8 rounded-full bg-[#0F6E56] text-[#9FE1CB] border border-[#5DCAA5]/30 flex items-center justify-center font-bold text-sm"
              >
                {session.user?.name?.[0]?.toUpperCase() ?? 'U'}
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 rounded-xl bg-[#0d1f18] border border-[#5DCAA5]/20 shadow-xl p-1">

                  <Link
                    href="/settings"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 text-sm rounded-md text-[#e1f5ee]/70 hover:bg-[#5DCAA5]/10 hover:text-white"
                  >
                    Settings
                  </Link>

                  <div className="h-px bg-[#5DCAA5]/10 my-1" />

                  <button
                    onClick={() => {
                      signOut({ callbackUrl: '/' })
                      setMenuOpen(false)
                    }}
                    className="w-full text-left px-3 py-2 text-sm rounded-md text-[#F0997B]/80 hover:bg-[#F0997B]/10 hover:text-[#F0997B]"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login" className="text-sm text-[#e1f5ee]/60 hover:text-white">
                Sign in
              </Link>
              <Link href="/register" className="px-4 py-1.5 rounded-md text-sm font-semibold bg-[#0F6E56] text-[#9FE1CB] border border-[#5DCAA5]/30 hover:bg-[#1D9E75] hover:text-white transition">
                Get started
              </Link>
            </div>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="md:hidden flex flex-col gap-1 p-1"
          >
            <span className="w-5 h-[1.5px] bg-[#e1f5ee]/70"></span>
            <span className="w-5 h-[1.5px] bg-[#e1f5ee]/70"></span>
            <span className="w-5 h-[1.5px] bg-[#e1f5ee]/70"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && session && (
        <div className="md:hidden flex flex-col bg-[#0d1f18] border-b border-[#5DCAA5]/10 px-4 py-3">

          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 rounded-md text-sm transition 
                ${pathname.startsWith(link.href)
                  ? 'text-[#5DCAA5] bg-[#5DCAA5]/10'
                  : 'text-[#e1f5ee]/60 hover:bg-[#5DCAA5]/10 hover:text-[#5DCAA5]'
                }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="h-px bg-[#5DCAA5]/10 my-2" />

          <Link href="/settings" className="px-3 py-2 text-sm text-[#e1f5ee]/60">
            Settings
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-left px-3 py-2 text-sm text-[#F0997B]/80"
          >
            Sign out
          </button>
        </div>
      )}
    </header>
  )
}