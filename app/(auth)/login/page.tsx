'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (res?.error) {
      setError('Invalid email or password.')
    } else {
      router.push('/dashboard')
    }
  }

  async function handleGoogle() {
    await signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 bg-[#060f0c] overflow-hidden">

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(93,202,165,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(93,202,165,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_30%,transparent_100%)]" />

      {/* Glow */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[radial-gradient(ellipse,rgba(15,110,86,0.2)_0%,transparent_70%)] pointer-events-none" />

      {/* Card */}
      <div className="relative w-full max-w-md bg-[#0a1813]/90 backdrop-blur-md border border-[#5DCAA5]/20 rounded-2xl p-8 animate-[fadeUp_0.5s_ease_both]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-[#e1f5ee] font-bold text-lg mb-6">
          <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
            <rect width="32" height="32" rx="7" fill="#0F6E56" />
            <polygon points="16,6 25,20 7,20" fill="white" />
            <circle cx="16" cy="26" r="3" fill="#5DCAA5" />
          </svg>
          Flowk
        </Link>

        <h1 className="text-2xl font-bold text-[#e1f5ee] mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-[#e1f5ee]/50 mb-6">
          Sign in to your account
        </p>

        {/* Google */}
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border border-[#5DCAA5]/20 bg-white/5 text-[#e1f5ee]/80 text-sm hover:bg-white/10 hover:border-[#5DCAA5]/40 transition"
        >
          <svg viewBox="0 0 24 24" width="17" height="17">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5 text-xs text-[#e1f5ee]/30">
          <div className="flex-1 h-px bg-[#5DCAA5]/10" />
          or
          <div className="flex-1 h-px bg-[#5DCAA5]/10" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#e1f5ee]/60">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-[#5DCAA5]/20 text-sm text-[#e1f5ee] placeholder:text-[#e1f5ee]/30 focus:outline-none focus:border-[#5DCAA5]/50 focus:bg-[#5DCAA5]/5"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label className="text-xs text-[#e1f5ee]/60">Password</label>
              <Link href="/forgot-password" className="text-xs text-[#5DCAA5]/70 hover:text-[#5DCAA5]">
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3 py-2.5 rounded-lg bg-white/5 border border-[#5DCAA5]/20 text-sm text-[#e1f5ee] placeholder:text-[#e1f5ee]/30 focus:outline-none focus:border-[#5DCAA5]/50 focus:bg-[#5DCAA5]/5"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-[#F0997B] bg-[#F0997B]/10 border border-[#F0997B]/20 px-3 py-2 rounded-md">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full flex items-center justify-center py-2.5 rounded-lg bg-[#0F6E56] text-[#9FE1CB] font-semibold border border-[#5DCAA5]/30 hover:bg-[#1D9E75] hover:text-white transition disabled:opacity-60"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-[#9FE1CB]/30 border-t-[#9FE1CB] rounded-full animate-spin" />
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-[#e1f5ee]/40 mt-5">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-[#5DCAA5] hover:text-[#9FE1CB]">
            Create one
          </Link>
        </p>

      </div>
    </div>
  )
}