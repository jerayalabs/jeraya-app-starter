import { useState, useEffect } from 'preact/hooks'
import { PageLayout, Button, Card, Field } from '@shared/ui'
import { navigate } from '@shared/lib/navigate'
import { db } from '@shared/lib/jeraya'
// import type { ListResult } from '@jeraya/sdk'

interface ProjectFormProps {
  params: { Id?: string }
}

interface Project {
  Id: string
  title: string
  description?: string
  status: string
}

const projectsTable = db.table('projects')

export function ProjectForm({ params }: ProjectFormProps) {
  const isEdit = !!params?.Id
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('active')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isEdit) {
      loadProject()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.Id])

  async function loadProject() {
    const result: any = await projectsTable.records.list({
      where: `(Id,eq,${params!.Id})`,
    })
    const project = result.list[0] as Project | undefined
    if (project) {
      setTitle(project.title)
      setDescription(project.description || '')
      setStatus(project.status)
    }
  }

  async function handleSubmit(e: Event) {
    e.preventDefault()
    if (!title.trim()) return
    setSaving(true)
    try {
      if (isEdit && params.Id) {
        await projectsTable.records.update(params.Id, { title, description, status })
      } else {
        await projectsTable.records.create({ title, description, status: 'active' })
      }
      navigate('/projects')
    } finally {
      setSaving(false)
    }
  }

  return (
    <PageLayout
      title={isEdit ? 'Edit Project' : 'New Project'}
      description={isEdit ? 'Update project details' : 'Create a new project'}
      breadcrumbs={[
        { label: 'Projects', url: '/projects' },
        { label: isEdit ? 'Edit' : 'New' },
      ]}
    >
      <Card className="max-w-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Title">
            <input
              type="text"
              value={title}
              onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="Project title"
              required
            />
          </Field>
          <Field label="Description">
            <textarea
              value={description}
              onInput={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="Optional description"
              rows={4}
            />
          </Field>
          {isEdit && (
            <Field label="Status">
              <select
                value={status}
                onChange={(e) => setStatus((e.target as HTMLSelectElement).value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </Field>
          )}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => navigate('/projects')} type="button">
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={saving || !title.trim()}>
              {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Project'}
            </Button>
          </div>
        </form>
      </Card>
    </PageLayout>
  )
}
