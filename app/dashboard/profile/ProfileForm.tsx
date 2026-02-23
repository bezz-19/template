'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Profile = {
  id: string
  nip: string | null
  nik: string | null
  namaLengkap: string | null
  gelarDepan: string | null
  gelarBelakang: string | null
  jabatan: string | null
  statusKepegawaian: string | null
  telepon: string | null
  alamat: string | null
  tempatLahir: string | null
  tanggalLahir: Date | null
  jenisKelamin: string | null
  fotoProfil: string | null
  tanggalMasuk: Date
} | null

export default function ProfileForm({ 
  profile, 
  userRole,
  userEmail 
}: { 
  profile: Profile
  userRole: string
  userEmail: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const formData = new FormData(e.currentTarget)
    const data: any = {
      nik: formData.get('nik') || null,
      namaLengkap: formData.get('namaLengkap') || null,
      gelarDepan: formData.get('gelarDepan') || null,
      gelarBelakang: formData.get('gelarBelakang') || null,
      telepon: formData.get('telepon') || null,
      alamat: formData.get('alamat') || null,
      tempatLahir: formData.get('tempatLahir') || null,
      tanggalLahir: formData.get('tanggalLahir') || null,
      jenisKelamin: formData.get('jenisKelamin') || null,
      fotoProfil: formData.get('fotoProfil') || null,
    }

    // Only ADMIN can edit these fields
    if (userRole === 'ADMIN') {
      data.jabatan = formData.get('jabatan') || null
      data.statusKepegawaian = formData.get('statusKepegawaian') || null
    }

    try {
      const response = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setSuccess('Profile berhasil diupdate!')
        router.refresh()
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError('Terjadi kesalahan saat update profile.')
    }

    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informasi Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 text-green-700 text-sm p-3 rounded-md">
              {success}
            </div>
          )}

          {/* Read-only fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-500">Email</label>
              <Input value={userEmail} disabled />
            </div>

            {profile?.nip && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-500">NIP</label>
                <Input value={profile.nip} disabled />
              </div>
            )}
          </div>

          {/* Editable fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="nik" className="text-sm font-medium">
                NIK
              </label>
              <Input
                id="nik"
                name="nik"
                defaultValue={profile?.nik || ''}
                placeholder="3201234567890123"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="namaLengkap" className="text-sm font-medium">
                Nama Lengkap
              </label>
              <Input
                id="namaLengkap"
                name="namaLengkap"
                defaultValue={profile?.namaLengkap || ''}
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="gelarDepan" className="text-sm font-medium">
                Gelar Depan
              </label>
              <Input
                id="gelarDepan"
                name="gelarDepan"
                defaultValue={profile?.gelarDepan || ''}
                placeholder="Dr."
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="gelarBelakang" className="text-sm font-medium">
                Gelar Belakang
              </label>
              <Input
                id="gelarBelakang"
                name="gelarBelakang"
                defaultValue={profile?.gelarBelakang || ''}
                placeholder="S.Kom., M.T."
              />
            </div>
          </div>

          {/* Admin-only fields */}
          {userRole === 'ADMIN' && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-red-50 rounded-lg">
              <div className="space-y-2">
                <label htmlFor="jabatan" className="text-sm font-medium text-red-700">
                  Jabatan (Admin Only)
                </label>
                <Input
                  id="jabatan"
                  name="jabatan"
                  defaultValue={profile?.jabatan || ''}
                  placeholder="Manager"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="statusKepegawaian" className="text-sm font-medium text-red-700">
                  Status Kepegawaian (Admin Only)
                </label>
                <select
                  id="statusKepegawaian"
                  name="statusKepegawaian"
                  defaultValue={profile?.statusKepegawaian || ''}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Pilih Status</option>
                  <option value="TETAP">Tetap</option>
                  <option value="TIDAK_TETAP">Tidak Tetap</option>
                </select>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="telepon" className="text-sm font-medium">
                Telepon
              </label>
              <Input
                id="telepon"
                name="telepon"
                defaultValue={profile?.telepon || ''}
                placeholder="08123456789"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="jenisKelamin" className="text-sm font-medium">
                Jenis Kelamin
              </label>
              <select
                id="jenisKelamin"
                name="jenisKelamin"
                defaultValue={profile?.jenisKelamin || ''}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="LAKI_LAKI">Laki-laki</option>
                <option value="PEREMPUAN">Perempuan</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="alamat" className="text-sm font-medium">
              Alamat
            </label>
            <textarea
              id="alamat"
              name="alamat"
              defaultValue={profile?.alamat || ''}
              placeholder="Jl. Contoh No. 123"
              className="w-full px-3 py-2 border rounded-md min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="tempatLahir" className="text-sm font-medium">
                Tempat Lahir
              </label>
              <Input
                id="tempatLahir"
                name="tempatLahir"
                defaultValue={profile?.tempatLahir || ''}
                placeholder="Jakarta"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tanggalLahir" className="text-sm font-medium">
                Tanggal Lahir
              </label>
              <Input
                id="tanggalLahir"
                name="tanggalLahir"
                type="date"
                defaultValue={
                  profile?.tanggalLahir
                    ? new Date(profile.tanggalLahir).toISOString().split('T')[0]
                    : ''
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="fotoProfil" className="text-sm font-medium">
              URL Foto Profil
            </label>
            <Input
              id="fotoProfil"
              name="fotoProfil"
              defaultValue={profile?.fotoProfil || ''}
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Menyimpan...' : 'Simpan Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
