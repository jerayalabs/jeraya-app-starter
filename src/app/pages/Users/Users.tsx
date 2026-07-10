import { useEffect, useState } from 'preact/hooks'
import { PageLayout } from '../../components/ui/PageLayout'
import { Spinner } from '../../components/ui/Spinner'
import { Badge } from '../../components/ui/Badge'
import jeraya from '../../lib/jeraya'

interface User {
  id: string
  email: string
  display_name: string
  user_name: string | null
  blocked: boolean
  email_verified: boolean | null
  roles: {
    "org-level-creator": boolean
    super: boolean
  }
  is_deleted: boolean
  base_roles: string[] | null
}

export function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    try {
      setLoading(true)
      setError(null)
      const result = await jeraya.user.list({ limit: 50, offset: 0 })
      const list = result.list || []
      setUsers(list as User[])
    } catch (err) {
      console.error('Error loading users:', err)
      setError('Failed to load users. Make sure you have admin permissions.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout
      title="Users"
      description="Manage all users in the workspace"
      breadcrumbs={[{ label: 'Home', url: '/' }, { label: 'Users' }]}
    >
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      {loading ? (
        <Spinner text="Loading users..." />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Username</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Roles</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {user.display_name || '—'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{user.user_name || '—'}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      {user.is_deleted ? (
                        <Badge variant="warning">Deleted</Badge>
                      ) : user.blocked ? (
                        <Badge variant="warning">Blocked</Badge>
                      ) : (
                        <Badge variant="success">Active</Badge>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                      {user.base_roles?.length ? user.base_roles.join(', ') : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </PageLayout>
  )
}
