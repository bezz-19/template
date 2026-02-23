import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/session'
import prisma from '@/lib/prisma'
import ProfileForm from './ProfileForm'

export default async function ProfilePage() {
  const session = await verifySession()

  if (!session) {
    redirect('/login')
  }

  // Only KARYAWAN and ADMIN can access profile
  if (session.role === 'MAHASISWA') {
    redirect('/dashboard')
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: session.userId },
  })

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Profile Saya</h1>
        
        <ProfileForm 
          profile={profile} 
          userRole={session.role}
          userEmail={session.email}
        />
      </div>
    </div>
  )
}
