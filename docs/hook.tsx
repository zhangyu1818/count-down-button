import React, { useState } from 'react';
import { useCountdown, sleep } from 'countdown-button';

export default () => {
  const [loading, setLoading] = useState(false);
  const [isStart, count, countdown] = useCountdown(10);

  const onClick = async () => {
    if (isStart || loading) return;
    setLoading(true);
    await sleep(1500)[1];
    setLoading(false);
    countdown();
  };

  const children = isStart ? `${count}秒后重新获取` : `使用hook`;
  const loadingNode = <i>加载中...</i>;
  const btnNode = <button onClick={onClick}>{children}</button>;
  return loading ? loadingNode : btnNode;
};
