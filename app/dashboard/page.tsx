import { verifySession } from '@/lib/session'

export default async function DashboardPage() {
  const session = await verifySession()

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {session?.email}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Role:</span> {session?.role}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">User ID:</span> {session?.userId}
            </p>
          </div>
        </div>
        
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            🎉 Template Ready!
          </h3>
          <p className="text-blue-800">
            Your authentication system is working. Start building your features here.
          </p>
        </div>
      </div>
    </div>
  )
}
