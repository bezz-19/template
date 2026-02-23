'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CreateProdiForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const formData = new FormData(e.currentTarget)
    const data = {
      code: formData.get('code') || null,
      nama: formData.get('nama'),
      jenjang: formData.get('jenjang'),
      status: formData.get('status') === 'true',
    }

    try {
      const response = await fetch('/api/prodi/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setSuccess('Prodi berhasil ditambahkan!')
        e.currentTarget.reset()
        // Dispatch custom event to trigger ProdiList refresh
        window.dispatchEvent(new CustomEvent('prodiCreated'))
      } else {
        setError(result.message)
      }
    } catch (error) {
      setError('Terjadi kesalahan saat menambahkan prodi.')
    }

    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tambah Program Studi Baru</CardTitle>
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="code" className="text-sm font-medium">
                Kode Prodi (Optional)
              </label>
              <Input
                id="code"
                name="code"
                placeholder="IF"
                />
            </div>

            <div className="space-y-2">
              <label htmlFor="nama" className="text-sm font-medium">
                Nama Prodi <span className="text-red-500">*</span>
              </label>
              <Input
                id="nama"
                name="nama"
                required
                placeholder="Teknik Informatika"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="jenjang" className="text-sm font-medium">
                Jenjang <span className="text-red-500">*</span>
              </label>
              <select
                id="jenjang"
                name="jenjang"
                required
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">Pilih Jenjang</option>
                <option value="D3">D3</option>
                <option value="D4">D4</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                required
                defaultValue="true"
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Menambahkan...' : 'Tambah Prodi'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
