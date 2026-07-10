import { render } from 'preact'
import './index.css'
import { RouterApp } from './router'

render(<RouterApp />, document.getElementById('pr-app') as HTMLElement)
