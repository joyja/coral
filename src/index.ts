import chalk from 'chalk'
import * as R from 'ramda'
import { LogLevel, type LogLevels, type Log } from './types.d.js'
export { LogLevel, type LogLevels, type Log } from './types.d.js'
import { format } from 'date-fns/format'

export const logLevels: LogLevels = {
  [LogLevel.debug]: { filter: 0, setColor: chalk.cyan, setBackgroundColor: chalk.bgCyan, key: LogLevel.debug },
  [LogLevel.info]: { filter: 1, setColor: chalk.white, setBackgroundColor: chalk.bgWhite, key: LogLevel.info },
  [LogLevel.warn]: { filter: 2, setColor: chalk.yellow, setBackgroundColor: chalk.bgYellow, key: LogLevel.warn },
  [LogLevel.error]: { filter: 3, setColor: chalk.red, setBackgroundColor: chalk.bgRed, key: LogLevel.error },
}

export const getLevelFilter = (level: LogLevel): number => logLevels[level].filter
export const checkLevel = (currentLevel: LogLevel, level: LogLevel): boolean =>
  logLevels[level].filter >= logLevels[currentLevel].filter
export const createLogger = (context: string, currentLevel: LogLevel): Log =>
  R.pipe(
    R.keys as (logLevels: LogLevels) => (keyof LogLevels)[],
    R.map((key: keyof LogLevels) => {
      const { setColor, setBackgroundColor } = logLevels[key]
      return {
        [key]: <T, U>(...args: T[]): void => {
          if (checkLevel(currentLevel, key))
            console[key](
              setColor(format(new Date(), 'yyyy-MM-dd HH:mm:ss')),
              setColor(`| ${context}`),
              '\t',
              ...R.map<T, U>(setColor, args),
            )
        },
      }
    }),
    R.mergeAll,
    R.assoc('context', context),
  )(logLevels) as Log

export const log = createLogger('neuron', LogLevel.debug)
export const taplog = (...args: any[]) => console.log(...args)
