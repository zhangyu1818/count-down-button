# countdown-button

依赖于`Ant Design`的倒计时按钮封装 📦

在`Ant Design`的`<Button>`组件基础上仅增加倒计时功能，定制性高的同时也无侵入

## 安装

```sh
yarn add countdown-button
```

## 默认的使用方式

```tsx
    <CountdownButton>获取验证码</CountdownButton>
    <CountdownButton type="link" unit="秒">
      获取验证码
    </CountdownButton>
    <CountdownButton type="primary">获取验证码</CountdownButton>
    <CountdownButton>自定义的children</CountdownButton>
```

## 点击事件

和`Ant Design`中`<Button>`点击事件不同的是提供了支持异步函数和 Promise

当`Promise`为`resolve`时会开始倒计时，`reject`时则不会

```tsx
    <CountdownButton onClick={() => alert('开始倒计时')}>普通的onClick</CountdownButton>
    <CountdownButton onClick={async () => await sleep(1000)[1]}>async</CountdownButton>
    <CountdownButton onClick={() => new Promise(resolve => sleep(2000)[1].then(resolve))}>
      Promise Resolve
    </CountdownButton>
    <CountdownButton onClick={() => new Promise((_, reject) => sleep(2000)[1].then(reject))}>
      Promise Reject
    </CountdownButton>
```

## Render Props

支持自定义更强的`Render Props`

```tsx
    <CountdownButton time={10} onClick={() => sleep(2000)[1]}>
      {(isStart, count, loading) => {
        const text = '支持render props';
        if (loading) return '请稍后...';
        return isStart ? t[count] : text;
      }}
    </CountdownButton>
```

## hook

如果想自定义元素，则可以使用`useCountdown`钩子，只提供倒计时功能

```tsx
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
```
## Props

除去继承自 `<Button>` 的 `props`，`<CountdownButton>` 有自己额外的 `props`

| 属性 | 说明             | 类型   | 默认值 |
| ---- | ---------------- | ------ | ------ |
| unit | 倒计时数字的单位 | string | s      |
| time | 倒计时时长       | number | 60     |
