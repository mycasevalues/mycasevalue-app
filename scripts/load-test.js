import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 50,
  duration: '3m',
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.001'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'https://www.mycasevalues.com';

export default function () {
  // Homepage
  let res = http.get(`${BASE_URL}/`);
  check(res, { 'homepage 200': (r) => r.status === 200 });
  sleep(2);

  // Search page
  res = http.get(`${BASE_URL}/search`);
  check(res, { 'search 200': (r) => r.status === 200 });
  sleep(2);

  // NOS 442 report
  res = http.get(`${BASE_URL}/nos/442`);
  check(res, { 'nos/442 200': (r) => r.status === 200 });
  sleep(3);

  // Calculator
  res = http.get(`${BASE_URL}/calculator`);
  check(res, { 'calculator 200': (r) => r.status === 200 });
  sleep(2);

  // Districts
  res = http.get(`${BASE_URL}/districts/sdny`);
  check(res, { 'districts/sdny 200': (r) => r.status === 200 });
  sleep(1);
}
