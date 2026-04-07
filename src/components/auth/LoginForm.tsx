'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { login, type AuthState } from '@/app/actions/auth'

const initialState: AuthState = {}

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, initialState)

  return (
    <form action={action} className="space-y-5">
      {state.message && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {state.message}
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="login" className="block text-sm text-[#86868b]">
          Телефон или email
        </label>
        <input
          id="login"
          name="login"
          type="text"
          autoComplete="username"
          placeholder="+375291234567 или email@mail.com"
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-[#48484a] focus:outline-none focus:border-white/30 focus:bg-white/8 transition-colors"
        />
        {state.errors?.login?.map((e) => (
          <p key={e} className="text-xs text-red-400">{e}</p>
        ))}
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label htmlFor="password" className="block text-sm text-[#86868b]">
            Пароль
          </label>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-[#48484a] focus:outline-none focus:border-white/30 focus:bg-white/8 transition-colors"
        />
        {state.errors?.password?.map((e) => (
          <p key={e} className="text-xs text-red-400">{e}</p>
        ))}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-white text-black font-medium py-3 text-sm hover:bg-[#f5f5f7] active:bg-[#e8e8ed] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? 'Входим...' : 'Войти'}
      </button>

      <p className="text-center text-sm text-[#86868b]">
        Нет аккаунта?{' '}
        <Link href="/auth/register" className="text-white hover:underline">
          Зарегистрироваться
        </Link>
      </p>
    </form>
  )
}
