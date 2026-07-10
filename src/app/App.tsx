import { Router, Route } from 'wouter-preact';
import { Home } from './pages/Home/Home'
import { About } from './pages/About/About'
import { Users } from './pages/Users/Users'
import { useHashLocation } from 'wouter-preact/use-hash-location';
import { getAppBasePath } from './config/basePath'

const basePath = getAppBasePath().replace('#', '');

// A tiny helper component to log the path
// function PathLogger() {
//   // const [location] = useLocation();
//   // const [hashLocation] = useHashLocation();
//   // console.log('Base Path', basePath);
//   // console.log('Active Path changed to:', location);

//   // console.log('window, hash', window.location.hash);
//   // console.log('hashLocation', hashLocation);
//   return null; // Renders nothing
// }

export function App() {
  return (
    <Router base={basePath} hook={useHashLocation}>
      {/* This will log the path every time it changes */}
      {/* <PathLogger /> */}

      <Route component={Home} path="/" />
      <Route component={About} path="/about" />
      <Route component={Users} path="/users" />
      {/* <Route>404: No such page!</Route> */}
    </Router>
  )
}