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
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">
          {state.message}
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="login" className="block text-sm text-foreground-secondary">
          Телефон или email
        </label>
        <input
          id="login"
          name="login"
          type="text"
          autoComplete="username"
          placeholder="+375291234567 или email@mail.com"
          className="w-full rounded-xl bg-background-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-[#0071e3]/50 transition-colors shadow-sm"
        />
        {state.errors?.login?.map((e) => (
          <p key={e} className="text-xs text-red-500">{e}</p>
        ))}
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <label htmlFor="password" className="block text-sm text-foreground-secondary">
            Пароль
          </label>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full rounded-xl bg-background-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-[#0071e3]/50 transition-colors shadow-sm"
        />
        {state.errors?.password?.map((e) => (
          <p key={e} className="text-xs text-red-500">{e}</p>
        ))}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-[#0071e3] text-white font-medium py-3 text-sm hover:bg-[#0077ed] active:bg-[#006edb] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? 'Входим...' : 'Войти'}
      </button>

      <p className="text-center text-sm text-foreground-muted">
        Нет аккаунта?{' '}
        <Link href="/auth/register" className="text-[#0071e3] hover:underline">
          Зарегистрироваться
        </Link>
      </p>
    </form>
  )
}
