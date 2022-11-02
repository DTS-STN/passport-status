'use strict'

const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api')
const {
  configureDynatraceMetricExport,
} = require('@dynatrace/opentelemetry-exporter-metrics')
const { MeterProvider } = require('@opentelemetry/sdk-metrics')
const { Resource } = require('@opentelemetry/resources')

// optional: set up logging for OpenTelemetry
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL)

// Configure a MeterProvider
const provider = new MeterProvider({
  resource: new Resource({
    'service.name': 'opentelemetry-metrics-dynatrace-passport',
  }),
})

const reader = configureDynatraceMetricExport(
  // exporter configuration
  {
    // export directly to the Dynatrace server
    url: process.env.NEXT_PUBLIC_DYNATRACE_INGEST_URL,
    apiToken: process.env.DYNATRACE_API_KEY,
  },
  // metric reader configuration
  {
    exportIntervalMillis: 5000,
  }
)

provider.addMetricReader(reader)

const meter = provider.getMeter('opentelemetry-metrics-dynatrace-passport')

// Your SDK should be set up correctly now. You can create instruments...
const requestCounter = meter.createCounter('requests', {
  description: 'Request Counter',
})

// ...set up attributes...
const attributes = {
  pid: process.pid.toString(),
  environment: 'staging',
}

// ... and start recording metrics:
setInterval(() => {
  requestCounter.add(Math.round(Math.random() * 1000), attributes)
}, 1000)
