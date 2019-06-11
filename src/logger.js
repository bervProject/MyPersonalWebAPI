const { createLogger, format, transports } = require('winston');
const getNamespace = require('cls-hooked').getNamespace;

const customFormat = format.printf(({level, message, timestamp}) => {
  const loggerNamespace = getNamespace('logger');
  let correlationId = loggerNamespace ? loggerNamespace.get('correlationId') : '';
  correlationId = correlationId ? correlationId : '';
  return `[${timestamp}] [${level}] [${correlationId}]: ${message}`;
});
// Configure the Winston logger. For the complete documentation seee https://github.com/winstonjs/winston
const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.splat(),
    customFormat
  ),
  transports: [
    new transports.Console()
  ],
});

module.exports = logger;
