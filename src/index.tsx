import React, { useState, useRef, useEffect } from 'react';

import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button';

export interface CountDownButtonProps extends Omit<ButtonProps, 'onClick'> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  time?: number;
}

const sleep = (time: number): [number, Promise<void>] => {
  let timer = 0;
  const promise = new Promise<void>(resolve => {
    timer = window.setTimeout(resolve, time);
  });
  return [timer, promise];
};

const CountDownButton: React.FC<CountDownButtonProps> = props => {
  const { children, onClick, time = 60, ...restProps } = props;
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(time);
  const [startCountDown, setStartCountDown] = useState(false);
  const timer = useRef(0);

  const countdown = () => {
    setStartCountDown(true);
    if (timer.current) window.clearTimeout(timer.current);
    const [timerId, wait] = sleep(1000);
    timer.current = timerId;
    wait.then(() => {
      setCount(prev => {
        if (prev > 1) {
          countdown();
          return prev - 1;
        }
        setStartCountDown(false);
        return time;
      });
    });
  };

  const onClickButton: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    if (startCountDown) return;
    if (onClick) {
      setLoading(true);
      Promise.resolve(onClick(e))
        .then(() => {
          countdown();
        })
        .finally(() => {
          setLoading(false);
        });
    } else countdown();
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <Button {...restProps} onClick={onClickButton}>
      {loading ? null : startCountDown ? `${count}s` : children}
    </Button>
  );
};

export default CountDownButton;
