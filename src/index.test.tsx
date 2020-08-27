import React from 'react';
import { act } from 'react-dom/test-utils';
import { configure, mount } from 'enzyme';
import CountdownButton from './index';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('countdown button', () => {
  it(`should mounted and unmounted without errors`, () => {
    const wrapper = mount(<CountdownButton />);
    expect(() => {
      wrapper.setProps({});
      wrapper.unmount();
    }).not.toThrow();
  });

  it('should support Children', () => {
    const wrapper = mount(
      <CountdownButton>
        <span>get code</span>
      </CountdownButton>,
    );
    expect(wrapper.find('button').text()).toBe('get code');
  });

  it('should support Click', async () => {
    const onClickMock = jest.fn();
    const wrapper = mount(<CountdownButton onClick={onClickMock} />);
    await act(async () => {
      wrapper.find('button').simulate('click');
    });
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('should support time and custom unit', async () => {
    const onClickMock = jest.fn();
    const wrapper = mount(<CountdownButton onClick={onClickMock} time={10} unit="秒" />);
    await act(async () => {
      wrapper.find('button').simulate('click');
    });
    expect(wrapper.text()).toBe('10秒');
  });

  it('should support Promise Function', async () => {
    const onClickMock = jest.fn().mockImplementation(() => Promise.resolve());
    const wrapper = mount(<CountdownButton onClick={onClickMock} />);
    await act(async () => {
      await wrapper.find('button').simulate('click');
    });
    expect(onClickMock).toHaveBeenCalled();
  });

  it('should support Promise reject', async () => {
    console.warn = jest.fn();
    jest.spyOn(console, 'warn');
    const onClickMock = jest.fn().mockImplementation(() => Promise.reject('promise reject'));
    const wrapper = mount(<CountdownButton onClick={onClickMock} />);
    await act(async () => {
      await wrapper.find('button').simulate('click');
    });
    expect(wrapper.text()).toBe('');
    expect(console.warn).toBeCalledWith('onClick throw a error', 'promise reject');
  });
});
