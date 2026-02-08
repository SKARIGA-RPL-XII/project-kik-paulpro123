import AdminLayout from "@/layouts/admin-layout"

interface User {
  id: number
  name: string
  email: string
  role: string
  is_active: boolean
}

export default function ManageAccounts({ users }: { users: User[] }) {
  return (
    <AdminLayout title="Kelola Akun">
      <h2 className="text-lg font-semibold mb-4">
        Kelola Akun
      </h2>

      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-2 text-left">Nama</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-center">Role</th>
              <th className="px-4 py-2 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b last:border-0">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2 text-gray-500">{user.email}</td>
                <td className="px-4 py-2 text-center capitalize">
                  {user.role}
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      user.is_active
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {user.is_active ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}