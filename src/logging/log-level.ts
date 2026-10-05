export const getLoggingLevelConfig = () => {
  if (typeof window !== 'undefined') {
    return window.__CLIENT_ENV__?.LOGGING_LEVEL || 'info';
  }

  // middleware can only read from process.env
  return process.env.LOGGING_LEVEL || 'info';
};

export const logLevelData = {
  '*': getLoggingLevelConfig(),
  //   'middleware': ''
  //   'home': 'info',
  //   'app': 'debug',
};
