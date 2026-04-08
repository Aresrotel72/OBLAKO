import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <Link
        href="/"
        className="text-2xl font-semibold tracking-widest text-foreground mb-12 hover:opacity-70 transition-opacity"
      >
        OBLAKO
      </Link>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
