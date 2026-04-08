'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { register, type AuthState } from '@/app/actions/auth'

const initialState: AuthState = {}

export default function RegisterForm() {
  const [state, action, pending] = useActionState(register, initialState)

  return (
    <form action={action} className="space-y-5">
      {state.message && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">
          {state.message}
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm text-foreground-secondary">
          Имя
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Иван"
          className="w-full rounded-xl bg-background-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-[#0071e3]/50 transition-colors shadow-sm"
        />
        {state.errors?.name?.map((e) => (
          <p key={e} className="text-xs text-red-500">{e}</p>
        ))}
      </div>

      <div className="space-y-1">
        <label htmlFor="phone" className="block text-sm text-foreground-secondary">
          Телефон <span className="text-foreground-muted text-xs">(обязательно)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+375291234567"
          className="w-full rounded-xl bg-background-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-[#0071e3]/50 transition-colors shadow-sm"
        />
        {state.errors?.phone?.map((e) => (
          <p key={e} className="text-xs text-red-500">{e}</p>
        ))}
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm text-foreground-secondary">
          Email <span className="text-foreground-muted text-xs">(необязательно)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          className="w-full rounded-xl bg-background-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-[#0071e3]/50 transition-colors shadow-sm"
        />
        {state.errors?.email?.map((e) => (
          <p key={e} className="text-xs text-red-500">{e}</p>
        ))}
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm text-foreground-secondary">
          Пароль
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Минимум 6 символов"
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
        {pending ? 'Регистрируем...' : 'Создать аккаунт'}
      </button>

      <p className="text-center text-sm text-foreground-muted">
        Уже есть аккаунт?{' '}
        <Link href="/auth/login" className="text-[#0071e3] hover:underline">
          Войти
        </Link>
      </p>
    </form>
  )
}
