'use client'

import { create } from 'zustand'

interface AuthUser {
  id: string
  name: string
  phone: string
}

interface AuthStore {
  user: AuthUser | null
  setUser: (user: AuthUser | null) => void
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))
