// k6 Documentation: https://k6.io/docs/

import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = {
  vus: 10,
  duration: '5m',
  thresholds: {
    'http_req_failed': ['rate<0.01'], // http errors should be less than 1%
    'http_req_duration': ['p(95)<300'], // 95% of requests should be below 300ms
    'group_duration{group:::Next_Template}': ['avg < 200'], // average duration cannot be longer than 200ms
  },
}

export default function main() {
  let response

  group('Next_Template', function () {
    response = http.get('https://passport-status-main.dev.dts-stn.com/', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua':
          '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
      },
    })
  })

  // Automatically added sleep
  sleep(1)
}
