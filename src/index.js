import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './index.css';


const rootEle = document.getElementById('root');
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log('----- Basic -----');
    console.log('name', entry.name);
    console.log('entryType', entry.entryType);
    console.log('startTime', entry.startTime); // DOMHighResTimeStamp
    console.log('duration', entry.duration); // DOMHighResTimeStamp

    console.log('------- *** -------');

    console.log('* fetchStart', entry.fetchStart);

    console.log('* domainLookupStart', entry.domainLookupStart);
    console.log('* domainLookupEnd', entry.domainLookupEnd);

    console.log('* connectStart', entry.connectStart);
    console.log('* secureConnectionStart', entry.secureConnectionStart);
    console.log('* connectEnd', entry.connectEnd);

    console.log('* requestStart', entry.requestStart);
    console.log('* responseStart', entry.responseStart);
    console.log('* responseEnd', entry.responseEnd);


    console.log('* DOM interactive =', entry.domInteractive);

    console.log('* domContentLoadedEventStart =', entry.domContentLoadedEventStart);
    console.log('* domContentLoadedEventEnd =', entry.domContentLoadedEventEnd);

    console.log('* domComplete =', entry.domComplete);

    console.log('* loadEventStart =', entry.loadEventStart);
    console.log('* loadEventEnd =', entry.loadEventEnd);

    const DOMReady = entry.domComplete - entry.responseEnd;
    console.log('--- DOMReady', DOMReady);

    const TTDBTime = entry.responseStart - entry.fetchStart;
    console.log('--- TTFB Time', TTDBTime);

    console.log('--- loadPage Time =', entry.loadEventEnd - entry.fetchStart);

    // console.log('* unloadEventStart =', entry.unloadEventStart);
    // console.log('* unloadEventEnd =', entry.unloadEventEnd);
    // console.log('* redirectStart =', entry.redirectStart);
    // console.log('* redirectEnd =', entry.redirectEnd);
    // console.log('document unload =', entry.unloadEventEnd - entry.unloadEventStart);
  });
});
observer.observe({ entryTypes: ['navigation'] });

window.addEventListener('load', () => {
  const t = performance.timing;
  console.log('Page Loaded!!', t.navigationStart, t.loadEventStart, t.responseStart);

  const loadPageTime = t.loadEventStart - t.navigationStart;
  console.log('loadPage Time', loadPageTime);

  const DOMReady = t.domComplete - t.responseEnd;
  console.log('DOMReady', DOMReady);

  const TTDBTime = t.responseStart - t.navigationStart;
  console.log('TTFB Time', TTDBTime);
});

ReactDOM.render(<Root />, rootEle);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextApp = require('./Root').default;
    ReactDOM.render(
      <NextApp />,
      rootEle,
    );
  });
}
