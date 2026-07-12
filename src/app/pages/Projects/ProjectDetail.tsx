import { useState, useEffect } from 'preact/hooks'
import { PageLayout, Button, Card, Badge, Spinner, Modal, Field } from '@shared/ui'
import { Link } from '@shared/ui'
import { navigate } from '@shared/lib/navigate'
import { db } from '@shared/lib/jeraya'

interface Project {
  Id: string
  title: string
  description?: string
  status: string
}

interface Task {
  Id: string
  title: string
  description?: string
  status: string
  priority: string
  project_id: string
}

interface ProjectDetailProps {
  params: { id: string }
}

const projectsTable = db.table('projects')
const tasksTable = db.table('tasks')

export function ProjectDetail({ params }: ProjectDetailProps) {
  const [project, setProject] = useState<Project | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewTask, setShowNewTask] = useState(false)
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [taskPriority, setTaskPriority] = useState('medium')

  console.log('project params', params)

  useEffect(() => {
    loadProject()
    loadTasks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  async function loadProject() {
    try {
      const result = await projectsTable.records.list({
        where: `(Id,eq,${params.id})`,
      })
      setProject(result.list[0] as Project)
    } finally {
      setLoading(false)
    }
  }

  async function loadTasks() {
    const result = await tasksTable.records.list({
      where: `(project_id,eq,${params.id})`,
      sort: 'CreatedAt',
    })
    setTasks(result.list as Task[])
  }

  async function handleArchive() {
    await projectsTable.records.update(params.id, { status: 'archived' })
    navigate('/projects')
  }

  async function handleCreateTask() {
    if (!taskTitle.trim()) return
    await tasksTable.records.create({
      title: taskTitle,
      description: taskDescription,
      status: 'todo',
      priority: taskPriority,
      project_id: params.id,
    })
    setTaskTitle('')
    setTaskDescription('')
    setTaskPriority('medium')
    setShowNewTask(false)
    loadTasks()
  }

  async function handleToggleStatus(task: Task) {
    const nextStatus = task.status === 'done' ? 'todo' : 'done'
    await tasksTable.records.update(task.Id, { status: nextStatus })
    loadTasks()
  }

  async function handleChangePriority(task: Task, priority: string) {
    await tasksTable.records.update(task.Id, { priority })
    loadTasks()
  }

  async function handleDeleteTask(task: Task) {
    await tasksTable.records.delete(task.Id)
    loadTasks()
  }

  if (loading) {
    return (
      <PageLayout title="Project">
        <Spinner text="Loading project..." />
      </PageLayout>
    )
  }

  if (!project) {
    return (
      <PageLayout title="Not Found" description="Project not found.">
        <Link to="/projects">
          <Button variant="ghost">Back to Projects</Button>
        </Link>
      </PageLayout>
    )
  }

  const headerActions = (
    <>
      <Button variant="ghost" onClick={handleArchive}>
        Archive
      </Button>
      <Button variant="primary" onClick={() => setShowNewTask(true)}>
        Add Task
      </Button>
    </>
  )

  return (
    <PageLayout
      title={project.title}
      description={project.description}
      breadcrumbs={[
        { label: 'Projects', url: '/projects' },
        { label: project.title },
      ]}
      headerActions={headerActions}
    >
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <Card className="p-8 text-center text-gray-500">
            No tasks yet. Add your first task.
          </Card>
        ) : (
          tasks.map((task) => (
            <Card key={task.Id} className="p-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.status === 'done'}
                  onChange={() => handleToggleStatus(task)}
                  className="h-5 w-5 rounded border-gray-300 accent-emerald-600"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={task.status === 'done' ? 'line-through text-gray-400' : 'font-medium text-gray-900'}>
                      {task.title}
                    </span>
                    <Badge variant={task.status === 'done' ? 'success' : 'info'}>
                      {task.status}
                    </Badge>
                    <select
                      value={task.priority}
                      onChange={(e) => handleChangePriority(task, (e.target as HTMLSelectElement).value)}
                      className="text-xs rounded-md border border-gray-300 px-2 py-1 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  {task.description && (
                    <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteTask(task)}
                  className="cursor-pointer text-gray-400 hover:text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>
            </Card>
          ))
        )}
      </div>

      <Modal isOpen={showNewTask} onClose={() => setShowNewTask(false)} title="New Task">
        <div className="space-y-4">
          <Field label="Title">
            <input
              type="text"
              value={taskTitle}
              onInput={(e) => setTaskTitle((e.target as HTMLInputElement).value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="Task title"
            />
          </Field>
          <Field label="Description">
            <textarea
              value={taskDescription}
              onInput={(e) => setTaskDescription((e.target as HTMLTextAreaElement).value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="Optional description"
              rows={3}
            />
          </Field>
          <Field label="Priority">
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority((e.target as HTMLSelectElement).value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </Field>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setShowNewTask(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleCreateTask}>Create</Button>
          </div>
        </div>
      </Modal>
    </PageLayout>
  )
}
