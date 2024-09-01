import chalk from 'chalk'

export enum LogLevel {
  debug = 'debug',
  info = 'info',
  warn = 'warn',
  error = 'error',
}

export type Log = {
  context: string
  debug(...args: any[]): void
  info(...args: any[]): void
  warn(...args: any[]): void
  error(...args: any[]): void
}

export type LogLevelFilter = {
  filter: number
  setColor: typeof chalk.white
  setBackgroundColor: typeof chalk.bgWhite
  key: LogLevel
}

export type LogLevels = {
  [key in LogLevel]: LogLevelFilter
}
