'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

type Prodi = {
  id: string
  code: string | null
  nama: string
  jenjang: string
  status: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export default function ProdiList() {
  const [prodis, setProdis] = useState<Prodi[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Prodi>>({})
  const [actionLoading, setActionLoading] = useState(false)

  // Fetch prodis from API
  useEffect(() => {
    fetchProdis()

    // Listen for prodi creation events
    const handleProdiCreated = () => {
      fetchProdis()
    }

    window.addEventListener('prodiCreated', handleProdiCreated)

    return () => {
      window.removeEventListener('prodiCreated', handleProdiCreated)
    }
  }, [])

  const fetchProdis = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/prodi')
      const result = await response.json()

      if (result.success) {
        setProdis(result.prodis)
      } else {
        console.error('Failed to fetch prodis:', result.message)
      }
    } catch (error) {
      console.error('Error fetching prodis:', error)
    }
    setLoading(false)
  }

  const handleEdit = (prodi: Prodi) => {
    setEditingId(prodi.id)
    setEditData({
      code: prodi.code,
      nama: prodi.nama,
      jenjang: prodi.jenjang,
      status: prodi.status,
    })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditData({})
  }

  const handleSaveEdit = async (id: string) => {
    setActionLoading(true)

    try {
      const response = await fetch('/api/prodi/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...editData }),
      })

      const result = await response.json()

      if (result.success) {
        setEditingId(null)
        setEditData({})
        // Refresh data from API
        await fetchProdis()
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert('Terjadi kesalahan saat update prodi.')
    }

    setActionLoading(false)
  }

  const handleDelete = async (id: string, nama: string) => {
    if (!confirm(`Yakin ingin menghapus prodi "${nama}"?`)) {
      return
    }

    setActionLoading(true)

    try {
      const response = await fetch('/api/prodi/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      const result = await response.json()

      if (result.success) {
        // Refresh data from API
        await fetchProdis()
      } else {
        alert(result.message)
      }
    } catch (error) {
      alert('Terjadi kesalahan saat menghapus prodi.')
    }

    setActionLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daftar Program Studi</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Memuat data...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {prodis.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Belum ada data program studi
              </p>
            ) : (
              <div className="space-y-3">{prodis.map((prodi) => (
                <div
                  key={prodi.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  {editingId === prodi.id ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-gray-600">Kode</label>
                          <Input
                            value={editData.code || ''}
                            onChange={(e) =>
                              setEditData({ ...editData, code: e.target.value })
                            }
                            placeholder="IF"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-600">Nama *</label>
                          <Input
                            value={editData.nama || ''}
                            onChange={(e) =>
                              setEditData({ ...editData, nama: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-gray-600">Jenjang *</label>
                          <select
                            value={editData.jenjang || ''}
                            onChange={(e) =>
                              setEditData({ ...editData, jenjang: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-md text-sm"
                          >
                            <option value="D3">D3</option>
                            <option value="D4">D4</option>
                            <option value="S1">S1</option>
                            <option value="S2">S2</option>
                            <option value="S3">S3</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-gray-600">Status *</label>
                          <select
                            value={editData.status ? 'true' : 'false'}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                status: e.target.value === 'true',
                              })
                            }
                            className="w-full px-3 py-2 border rounded-md text-sm"
                          >
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSaveEdit(prodi.id)}
                          disabled={actionLoading}
                        >
                          {actionLoading ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                          disabled={actionLoading}
                        >
                          Batal
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">
                            {prodi.code ? `[${prodi.code}] ` : ''}
                            {prodi.nama}
                          </h3>
                          <Badge variant={prodi.status ? 'default' : 'secondary'}>
                            {prodi.status ? 'Active' : 'Inactive'}
                          </Badge>
                          <Badge variant="outline">{prodi.jenjang}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Dibuat: {new Date(prodi.createdAt).toLocaleDateString('id-ID')}
                          {prodi.updatedAt !== prodi.createdAt && (
                            <> • Diupdate: {new Date(prodi.updatedAt).toLocaleDateString('id-ID')}</>
                          )}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(prodi)}
                          disabled={actionLoading}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(prodi.id, prodi.nama)}
                          disabled={actionLoading}
                        >
                          Hapus
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        )}
      </CardContent>
    </Card>
  )
}
