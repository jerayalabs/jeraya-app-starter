import { Router, Route } from 'wouter-preact';
import { Home } from './pages/Home/Home'
import { ProjectsList } from './pages/Projects/ProjectsList'
import { ProjectDetail } from './pages/Projects/ProjectDetail'
import { ProjectForm } from './pages/Projects/ProjectForm'
import { useHashLocation } from 'wouter-preact/use-hash-location';
import { getAppBasePath } from '../shared/config/basePath'

const basePath = getAppBasePath();

export function App() {

  return (
    <Router base={basePath} hook={useHashLocation}>
      <Route component={Home} path="/" />
      <Route component={ProjectsList} path="/projects" />
      <Route component={ProjectForm} path="/projects/new" />
      <Route component={ProjectForm} path="/projects/:id/edit" />
      <Route component={ProjectDetail} path="/projects/:id" />
    </Router>
  )
}