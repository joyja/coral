import { describe, it, expect, vi, afterEach, MockInstance, vitest } from 'vitest'
import { logLevels, LogLevel, createLogger, LogLevels } from './index.js'
import * as R from 'ramda'
import { mockConsole } from '../tests/mocks.js'
import chalk from 'chalk'
vi.mock('chalk', () => {
  return {
    __esModule: true,
    default: {
      cyan: vi.fn(),
      white: vi.fn(),
      yellow: vi.fn(),
      red: vi.fn(),
    },
  }
})

describe('log', () => {
  mockConsole()
  const logTestMessages = (level: LogLevel) => {
    const log = createLogger('test', level)
    R.pipe(
      R.keys as (logLevels: LogLevels) => (keyof LogLevels)[],
      R.map((key: LogLevel) => log[key](`this is a ${key} message`)),
    )(logLevels)
  }
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('it logs all messages with the correct color when the debug level is set', () => {
    logTestMessages(LogLevel.debug)
    expect(console.debug).toBeCalledTimes(1)
    expect(console.info).toBeCalledTimes(1)
    expect(console.warn).toBeCalledTimes(1)
    expect(console.error).toBeCalledTimes(1)
    expect(chalk.cyan).toBeCalled()
    expect(chalk.white).toBeCalled()
    expect(chalk.yellow).toBeCalled()
    expect(chalk.red).toBeCalled()
  })
  it('it logs only info and above messages with the correct color when the info level is set', () => {
    logTestMessages(LogLevel.info)
    expect(console.debug).toBeCalledTimes(0)
    expect(console.info).toBeCalledTimes(1)
    expect(console.warn).toBeCalledTimes(1)
    expect(console.error).toBeCalledTimes(1)
    expect(chalk.cyan).not.toBeCalled()
    expect(chalk.white).toBeCalled()
    expect(chalk.yellow).toBeCalled()
    expect(chalk.red).toBeCalled()
  })
  it('it logs only warn and above messages with the correct color when the warn level is set', () => {
    logTestMessages(LogLevel.warn)
    expect(console.debug).toBeCalledTimes(0)
    expect(console.info).toBeCalledTimes(0)
    expect(console.warn).toBeCalledTimes(1)
    expect(console.error).toBeCalledTimes(1)
    expect(chalk.cyan).not.toBeCalled()
    expect(chalk.white).not.toBeCalled()
    expect(chalk.yellow).toBeCalled()
    expect(chalk.red).toBeCalled()
  })
  it('it logs only error and above messages with the correct color when the error level is set', () => {
    logTestMessages(LogLevel.error)
    expect(console.debug).toBeCalledTimes(0)
    expect(console.info).toBeCalledTimes(0)
    expect(console.warn).toBeCalledTimes(0)
    expect(console.error).toBeCalledTimes(1)
    expect(chalk.cyan).not.toBeCalled()
    expect(chalk.white).not.toBeCalled()
    expect(chalk.yellow).not.toBeCalled()
    expect(chalk.red).toBeCalled()
  })
})
