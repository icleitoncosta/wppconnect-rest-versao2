import pino from "pino";


const transport = pino.transport({
  targets: [{
    level: 'info',
    target: 'pino-pretty',
    options: {
      colorize: true,
      messageFormat: '[{session}] - {msg}',
      hideObject: true,
      translateTime: true,
      ignore: 'pid,hostname,host'
    },
  }, {
    level: 'trace',
    target: 'pino/file',
    options: { destination: './logs/info.log' }
  }, {
    level: 'error',
    target: 'pino/file',
    options: { destination: './logs/error.log' }
  }, {
    level: 'fatal',
    target: 'pino/file',
    options: { destination: './logs/fatal.log' }
  }],
})

export const logger = pino({ timestamp: pino.stdTimeFunctions.isoTime }, transport);