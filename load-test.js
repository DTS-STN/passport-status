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
    response = http.get(
      'https://fonts.googleapis.com/css2?family=Lato%3Aital%2Cwght%400%2C100%3B0%2C300%3B0%2C400%3B0%2C700%3B0%2C900%3B1%2C100%3B1%2C300%3B1%2C400%3B1%2C700%3B1%2C900&family=Noto+Sans%3Awght%40400%3B700&display=swap&family=Patua+One%3Awght%40100%3B400%3B700&display=swap&family=Noto+Sans%3Awght%40400%3B700&family=Patua+One%3Awght%40100%3B400%3B700',
      {
        headers: {
          'sec-ch-ua':
            '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Linux"',
        },
      }
    )
    response = http.get('https://next-template-perf.bdm-dev.dts-stn.com/', {
      headers: {
        'upgrade-insecure-requests': '1',
        'sec-ch-ua':
          '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
      },
    })
    response = http.get(
      'https://fonts.googleapis.com/css2?family=Lato%3Aital%2Cwght%400%2C100%3B0%2C300%3B0%2C400%3B0%2C700%3B0%2C900%3B1%2C100%3B1%2C300%3B1%2C400%3B1%2C700%3B1%2C900&family=Noto+Sans%3Awght%40400%3B700&display=swap&family=Patua+One%3Awght%40100%3B400%3B700&display=swap&family=Noto+Sans%3Awght%40400%3B700&family=Patua+One%3Awght%40100%3B400%3B700',
      {
        headers: {
          'sec-ch-ua':
            '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Linux"',
        },
      }
    )
    response = http.get(
      'https://fonts.gstatic.com/s/lato/v22/S6uyw4BMUTPHjx4wXg.woff2',
      {
        headers: {
          'origin': 'https://next-template-perf.bdm-dev.dts-stn.com',
          'sec-ch-ua':
            '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Linux"',
        },
      }
    )
    response = http.get(
      'https://fonts.gstatic.com/s/notosans/v25/o-0IIpQlx3QUlC5A4PNr5TRA.woff2',
      {
        headers: {
          'origin': 'https://next-template-perf.bdm-dev.dts-stn.com',
          'sec-ch-ua':
            '" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Linux"',
        },
      }
    )
  })

  // Automatically added sleep
  sleep(1)
}
