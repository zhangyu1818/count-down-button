import React from 'react';
import CountdownButton from 'countdown-button';

import './style.less';

export default () => (
  <div>
    <CountdownButton>获取验证码</CountdownButton>
    <CountdownButton type="link" unit="秒">
      获取验证码
    </CountdownButton>
    <CountdownButton type="primary">获取验证码</CountdownButton>
    <CountdownButton>自定义的children</CountdownButton>
  </div>
);
