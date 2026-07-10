import { useState } from 'preact/hooks'
import { PageLayout } from '../../components/ui/PageLayout'
import { Button } from '../../components/ui/Button'
// import { Spinner } from '../../components/ui/Spinner'


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
