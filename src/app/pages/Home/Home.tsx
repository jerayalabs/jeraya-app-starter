import { PageLayout, Button } from "@/shared/components/ui"

export function Home() {

  const headerActions = (
    <Button variant="ghost" onClick={() => console.log('Refresh')} disabled={false}>
      Refresh
    </Button>
  )

  return (
    <PageLayout
      title="Home"
      description="Home Page"
      headerActions={headerActions}
    >
      Home Page
    </PageLayout>
  )
}
