import { verifySession } from '@/lib/session'
import { redirect } from 'next/navigation'
import CreateProdiForm from './CreateProdiForm'
import ProdiList from './ProdiList'

export default async function ProdiPage() {
  const session = await verifySession()

  if (!session) {
    redirect('/login')
  }

  if (session.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Management Program Studi</h1>
        <p className="text-gray-600 mt-2">
          Kelola data program studi
        </p>
      </div>

      <CreateProdiForm />
      <ProdiList />
    </div>
  )
}
