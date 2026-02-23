import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/session'
import { logoutAction } from '@/app/actions/auth-actions'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await verifySession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Dashboard Template</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{session.email}</span>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                {session.role}
              </span>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex h-[calc(100vh-4rem)]">
        <aside className="w-64 bg-white border-r">
          <nav className="p-4 space-y-2">
            <a
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Dashboard</span>
            </a>
            
            {(session.role === 'KARYAWAN' || session.role === 'ADMIN') && (
              <a
                href="/dashboard/profile"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Profile</span>
              </a>
            )}
            
            {session.role === 'ADMIN' && (
              <>
                <a
                  href="/dashboard/users"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span>User Management</span>
                </a>
                
                <a
                  href="/dashboard/prodi"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span>Program Studi</span>
                </a>
              </>
            )}
          </nav>
        </aside>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
