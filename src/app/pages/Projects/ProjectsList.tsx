import { useState, useEffect } from 'preact/hooks'
import { PageLayout, Button, Card, Badge, Spinner } from '@shared/ui'
import { Link } from '@shared/ui'
import { db } from '@shared/lib/jeraya'
// import type { ListResult } from '@jeraya/sdk'

interface Project {
  Id: string
  title: string
  description?: string
  status: string
}

const projectsTable = db.table('projects')

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    setLoading(true)
    try {
      const result = await projectsTable.records.list({ sort: 'CreatedAt' })
      setProjects(result.list as Project[])
    } finally {
      setLoading(false)
    }
  }

  const headerActions = (
    <Link to="/projects/new">
      <Button variant="primary">New Project</Button>
    </Link>
  )

  return (
    <PageLayout
      title="Projects"
      description="Manage your projects"
      headerActions={headerActions}
    >
      {loading ? (
        <Spinner text="Loading projects..." />
      ) : projects.length === 0 ? (
        <Card className="p-8 text-center text-gray-500">
          No projects yet. Create your first project.
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link to={`/projects/${project.Id}`} key={project.Id}>
              <Card className="p-5 cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  <Badge variant={project.status === 'active' ? 'success' : 'warning'}>
                    {project.status}
                  </Badge>
                </div>
                {project.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </PageLayout>
  )
}
