import { PageLayout } from "@/shared/components/ui"

export function Layout(title: string, description: string, children: any) {
  return (
    <PageLayout
      title={title}
      description={description}
    >
      {children}
    </PageLayout>
  )
}
