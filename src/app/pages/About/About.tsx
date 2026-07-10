import { PageLayout } from '../../components/ui/PageLayout'

export function About() {
  return (
    <PageLayout
      title="About"
      description="About this application"
      breadcrumbs={[{ label: 'Home', url: '/' }, { label: 'About' }]}
    >
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-gray-700">
          This is a starter template built with Preact, Vite, Tailwind CSS, DaisyUI, and the Jeraya SDK.
          The backend API is powered by Fastify.
        </p>
      </div>
    </PageLayout>
  )
}
