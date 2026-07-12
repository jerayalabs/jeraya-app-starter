import { PageLayout, Card } from '@shared/ui'
import { Link } from '@shared/ui'

export function Home() {
  return (
    <PageLayout
      title="Home"
      description="Project Management"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/projects">
          <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
            <p className="text-sm text-gray-600 mt-1">Manage your projects and tasks</p>
          </Card>
        </Link>
      </div>
    </PageLayout>
  )
}
