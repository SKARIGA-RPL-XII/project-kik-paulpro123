import { Head, router, usePage } from '@inertiajs/react'
import { useState } from 'react'

export default function Checkout() {

    const { ticket } = usePage().props as any

    const [method, setMethod] = useState('qr')

    const submit = () => {
        router.post('/order', {
            ticket_id: ticket.id,
            payment_method: method
        })
    }

    return (
        <>
            <Head title="Checkout" />

            <div className="max-w-xl mx-auto py-10">

                <h1 className="text-2xl font-bold mb-6">Checkout</h1>

                <div className="border rounded-lg p-5 mb-6">
                    <h2 className="font-semibold">{ticket.name}</h2>
                    <p className="text-sm text-neutral-500">{ticket.event.title}</p>
                    <p className="text-lg font-bold mt-2">
                        Rp {ticket.price.toLocaleString('id-ID')}
                    </p>
                </div>

                <h3 className="font-semibold mb-3">Pilih Metode Pembayaran</h3>

                <div className="space-y-2 mb-6">

                    <label className="flex gap-2">
                        <input type="radio" value="qr" checked={method==='qr'} onChange={()=>setMethod('qr')} />
                        QR Code
                    </label>

                    <label className="flex gap-2">
                        <input type="radio" value="bank" checked={method==='bank'} onChange={()=>setMethod('bank')} />
                        Bank Transfer
                    </label>

                    <label className="flex gap-2">
                        <input type="radio" value="wallet" checked={method==='wallet'} onChange={()=>setMethod('wallet')} />
                        E Wallet
                    </label>

                </div>

                <button
                    onClick={submit}
                    className="w-full bg-neutral-900 text-white py-3 rounded-lg"
                >
                    Konfirmasi Pembayaran
                </button>

            </div>
        </>
    )
}