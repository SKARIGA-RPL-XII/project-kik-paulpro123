import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

type Ticket = {
  id: number;
  title: string;
  date: string;
  location: string;
  status: 'Paid' | 'Unpaid';
};

export default function TicketPage() {
  const tickets: Ticket[] = [
    {
      id: 1,
      title: 'TECHNOFEST 7.0',
      date: '15 Nov 2025 • 02:00',
      location: 'Stadion Maguwoharjo, Sleman',
      status: 'Paid',
    },
    {
      id: 2,
      title: 'HIPHOP NIGHT Yogyakarta',
      date: '29 Nov 2025 • 21:00',
      location: 'JNM, Yogyakarta',
      status: 'Unpaid',
    },
  ];

 return (
  <AppLayout>
    <Head title="My Tickets" />

    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl space-y-6 p-4 pb-20">
        <h1 className="text-2xl font-semibold">My Tickets</h1>

        <div className="grid gap-4 sm:grid-cols-2">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="rounded-xl border bg-white p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-neutral-900">{ticket.title}</h2>

              <div className="mt-2 text-sm text-neutral-600">
                <p>📅 {ticket.date}</p>
                <p>📍 {ticket.location}</p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    ticket.status === 'Paid'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {ticket.status}
                </span>

                <button className="text-sm font-semibold text-neutral-800 hover:underline hover:text-black">
                  View Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </AppLayout>
);
}