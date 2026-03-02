import { useState, useEffect } from 'react'
import { getDefaultPaymentInfo, setDefaultPaymentInfo } from '@/lib/chatUtils'

export default function AdminPaymentInfo() {
  const [form, setForm] = useState({ iban: '', intestatario: '', banca: '', causale: '' })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setForm(getDefaultPaymentInfo())
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setSaved(false)
  }

  const handleSave = () => {
    setDefaultPaymentInfo(form)
    setSaved(true)
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded shadow mt-8">
      <h2 className="font-serif text-2xl mb-4">Credenziali Pagamento</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">IBAN</label>
          <input name="iban" value={form.iban} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Intestatario</label>
          <input name="intestatario" value={form.intestatario} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Banca</label>
          <input name="banca" value={form.banca} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Causale</label>
          <input name="causale" value={form.causale} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>
      </div>
      <button onClick={handleSave} className="mt-6 bg-accent text-white px-6 py-2 rounded hover:bg-accent/80">Salva</button>
      {saved && <div className="mt-4 text-green-600 font-bold">Salvato!</div>}
    </div>
  )
}
