import React from 'react';
import CountdownButton, { sleep } from 'countdown-button';

export default () => (
  <div>
    <CountdownButton onClick={() => alert('开始倒计时')}>普通的onClick</CountdownButton>
    <CountdownButton onClick={async () => await sleep(1000)[1]}>async</CountdownButton>
    <CountdownButton onClick={() => new Promise(resolve => sleep(2000)[1].then(resolve))}>
      Promise Resolve
    </CountdownButton>
    <CountdownButton onClick={() => new Promise((_, reject) => sleep(2000)[1].then(reject))}>
      Promise Reject
    </CountdownButton>
  </div>
);
