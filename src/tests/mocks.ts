import { logLevels } from '../index.js'
import { vi } from 'vitest'

export const mockConsole = () => {
  global.console = {
    ...global.console,
    ...Object.keys(logLevels)
      .map((key: string) => ({
        [key]: vi.fn(),
      }))
      .reduce((acc, obj) => Object.assign(acc, obj), {}),
  }
}
