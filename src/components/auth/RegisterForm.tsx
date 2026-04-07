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
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
          {state.message}
        </div>
      )}

      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm text-[#86868b]">
          Имя
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Иван"
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-[#48484a] focus:outline-none focus:border-white/30 focus:bg-white/8 transition-colors"
        />
        {state.errors?.name?.map((e) => (
          <p key={e} className="text-xs text-red-400">{e}</p>
        ))}
      </div>

      <div className="space-y-1">
        <label htmlFor="phone" className="block text-sm text-[#86868b]">
          Телефон <span className="text-white/40 text-xs">(обязательно)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+375291234567"
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-[#48484a] focus:outline-none focus:border-white/30 focus:bg-white/8 transition-colors"
        />
        {state.errors?.phone?.map((e) => (
          <p key={e} className="text-xs text-red-400">{e}</p>
        ))}
      </div>

      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm text-[#86868b]">
          Email <span className="text-white/40 text-xs">(необязательно)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="your@email.com"
          className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-[#48484a] focus:outline-none focus:border-white/30 focus:bg-white/8 transition-colors"
        />
        {state.errors?.email?.map((e) => (
          <p key={e} className="text-xs text-red-400">{e}</p>
        ))}
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm text-[#86868b]">
          Пароль
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Минимум 6 символов"
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
        {pending ? 'Регистрируем...' : 'Создать аккаунт'}
      </button>

      <p className="text-center text-sm text-[#86868b]">
        Уже есть аккаунт?{' '}
        <Link href="/auth/login" className="text-white hover:underline">
          Войти
        </Link>
      </p>
    </form>
  )
}
