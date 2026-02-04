import { Head } from '@inertiajs/react';

export default function EODashboard({ status }: { status: string }) {
    return (
        <>
            <Head title="Dashboard EO" />

            {status === 'pending' ? (
                <div className="text-center mt-20">
                    <h1 className="text-2xl font-bold">
                        Akun EO Menunggu Persetujuan Admin
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Silakan tunggu, fitur akan aktif setelah disetujui.
                    </p>
                </div>
            ) : (
                <div>
                    <h1 className="text-2xl font-bold">
                        Dashboard Event Organizer
                    </h1>

                </div>
            )}
        </>
    );
}