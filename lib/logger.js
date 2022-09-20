const logger = (() => {
  const logLevel = process.env.LOGGING_LEVEL
  const print = (type, ...messages) => {
    switch (type) {
      case 'error':
        console.error(
          '%c Error:',
          'background: red; color: white;',
          ...messages
        )
        break
      case 'warn':
        console.warn(
          '%c Warning:',
          'background: orange; color: white;',
          ...messages
        )
        break
      case 'info':
        if (logLevel === 'info' || logLevel === 'debug') {
          console.info('%c Info:', '', ...messages)
        }
        break
      case 'debug':
      default:
        if (logLevel === 'debug') {
          console.log('%c Debug:', '', ...messages)
        }
    }
  }

  return {
    error: print.bind(null, 'error'),
    warn: print.bind(null, 'warn'),
    info: print.bind(null, 'info'),
    debug: print.bind(null, 'debug'),
  }
})()

export default logger
