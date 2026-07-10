import { Router, Route } from 'wouter-preact';
import { Home } from './pages/Home/Home'
import { useHashLocation } from 'wouter-preact/use-hash-location';
import { getAppBasePath } from '../shared/config/basePath'

const basePath = getAppBasePath();

export function App() {

  return (
    <Router base={basePath} hook={useHashLocation}>
      <Route component={Home} path="/" />
    </Router>
  )
}