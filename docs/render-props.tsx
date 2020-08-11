import React from 'react';
import CountdownButton, { sleep } from 'countdown-button';

const t = '_jihgfedcba';

export default () => (
  <div>
    <CountdownButton time={10} onClick={() => sleep(2000)[1]}>
      {(isStart, count, loading) => {
        const text = '支持render props';
        if (loading) return '请稍后...';
        return isStart ? t[count] : text;
      }}
    </CountdownButton>
  </div>
);
