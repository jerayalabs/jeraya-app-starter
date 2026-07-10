import { render } from '@testing-library/preact'
import type { ComponentChild } from 'preact'

export function renderComponent(ui: ComponentChild) {
  return render(ui)
}

export { render }
