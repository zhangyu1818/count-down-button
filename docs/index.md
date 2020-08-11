---
title: 使用方式
---

# countdown-button

依赖于`Ant Design`的倒计时按钮封装 📦

在`Ant Design`的`<Button>`组件基础上仅增加倒计时功能，定制性高的同时也无侵入

## 安装

```sh
yarn add countdown-button
```

## 默认的使用方式

<code src="./default.tsx" title="默认使用方式"/>

## 点击事件

和`Ant Design`中`<Button>`点击事件不同的是提供了支持异步函数和 Promise

当`Promise`为`resolve`时会开始倒计时，`reject`时则不会

<code src="./event.tsx" title="点击事件"/>

## Render Props

支持自定义更强的`Render Props`

<code src="./render-props.tsx" title="render props"/>

## hook

如果想自定义元素，则可以使用`useCountdown`钩子，只提供倒计时功能

<code src="./hook.tsx" title="hook"/>

## Props

除去继承自 `<Button>` 的 `props`，`<CountdownButton>` 有自己额外的 `props`

| 属性 | 说明             | 类型   | 默认值 |
| ---- | ---------------- | ------ | ------ |
| unit | 倒计时数字的单位 | string | s      |
| time | 倒计时时长       | number | 60     |
