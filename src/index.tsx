import React, { useState, useRef, useEffect, useCallback } from 'react';

import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button';

type CountDownButtonRenderProps = (isStart: boolean, count: number, loading: boolean) => React.ReactNode;

export interface CountdownButtonProps extends Omit<ButtonProps, 'onClick'> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  children?: React.ReactNode | CountDownButtonRenderProps;
  unit?: string;
  time?: number;
}

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<CountdownButtonProps & React.RefAttributes<HTMLElement>> {
  __ANT_BUTTON: boolean;
}

export const sleep = (time: number): [number, Promise<void>] => {
  let timer = 0;
  const promise = new Promise<void>(resolve => {
    timer = window.setTimeout(resolve, time);
  });
  return [timer, promise];
};

export const useCountdown = (time: number): [boolean, number, () => void] => {
  const [count, setCount] = useState(time);
  const [isStart, setStartCountDown] = useState(false);

  const timer = useRef(0);

  useEffect(() => {
    return () => {
      window.clearTimeout(timer.current);
    };
  }, []);

  const countdown = useCallback(() => {
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
  }, []);

  return [isStart, count, countdown];
};

const InternalButton: React.ForwardRefRenderFunction<unknown, CountdownButtonProps> = (props, ref) => {
  const { children, onClick, time = 60, unit = 's', ...restProps } = props;
  const [loading, setLoading] = useState(false);

  const [isStart, count, countdown] = useCountdown(time);

  const onClickButton: React.MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();
    if (isStart) return;
    if (onClick) {
      setLoading(true);
      Promise.resolve(onClick(e))
        .then(() => {
          countdown();
        })
        .catch(e => {
          console.warn('onClick throw a error', e);
        })
        .finally(() => {
          setLoading(false);
        });
    } else countdown();
  };

  const defaultChildren = loading ? <span /> : isStart ? count + unit : children;

  const renderChildren =
    typeof children === 'function'
      ? (children as CountDownButtonRenderProps)(isStart, count, loading)
      : defaultChildren;

  return (
    <Button
      loading={typeof children !== 'function' && loading}
      {...restProps}
      onClick={onClickButton}
      ref={ref as any}
    >
      {renderChildren}
    </Button>
  );
};

const CountdownButton = React.forwardRef<unknown, CountdownButtonProps>(
  InternalButton,
) as CompoundedComponent;

CountdownButton.displayName = 'CountdownButton';

CountdownButton.__ANT_BUTTON = true;

export default CountdownButton;
