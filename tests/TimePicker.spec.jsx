import ReactDOM from 'react-dom';
import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import TimePicker from '../src/TimePicker';
import { clickInput, clickSelectItem, matchValue } from './util';

describe('TimePicker', () => {
  let container;

  function renderPicker(props, options) {
    const showSecond = true;
    const format = 'HH:mm:ss';

    return mount(
      <TimePicker
        format={format}
        showSecond={showSecond}
        defaultValue={moment('12:57:58', format)}
        {...props}
      />,
      options,
    );
  }

  function renderPickerWithoutSeconds(props) {
    const showSecond = false;
    const format = 'HH:mm';

    return mount(
      <TimePicker
        format={format}
        showSecond={showSecond}
        defaultValue={moment('08:24', format)}
        {...props}
      />,
    );
  }

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  });

  describe('render panel to body', () => {
    it('popup correctly', async () => {
      const onChange = jest.fn();
      const picker = renderPicker({
        onChange,
      });
      expect(picker.state().open).toBeFalsy();
      matchValue(picker, '12:57:58');
      clickInput(picker);

      expect(picker.state().open).toBeTruthy();
      clickSelectItem(picker, 0, 1);

      expect(onChange).toBeCalled();
      expect(onChange.mock.calls[0][0].hour()).toBe(1);
      expect(onChange.mock.calls[0][0].minute()).toBe(57);
      expect(onChange.mock.calls[0][0].second()).toBe(58);
      matchValue(picker, '01:57:58');
      expect(picker.state().open).toBeTruthy();
    });

    it('destroy correctly', async () => {
      const picker = renderPicker({}, { attachTo: container });
      expect(picker.state().open).toBeFalsy();
      clickInput(picker);
      expect(picker.state().open).toBeTruthy();

      expect(document.querySelectorAll('.rc-time-picker').length).not.toBe(0);
      expect(picker.find('Panel li').length).toBeTruthy();
      picker.detach();

      expect(document.querySelectorAll('.rc-time-picker').length).toBe(0);
      expect(picker.instance().panelInstance).toBeFalsy();
    });

    it('support name', () => {
      const picker = renderPicker({
        name: 'time-picker-form-name',
      });
      expect(picker.find('.rc-time-picker-input').instance().name).toBe('time-picker-form-name');
    });

    it('support focus', () => {
      const picker = renderPicker({
        name: 'time-picker-form-name',
      });
      expect(typeof picker.instance().focus).toBe('function');
    });

    it('should be controlled by open', () => {
      const picker = renderPicker({
        open: false,
      });
      expect(picker.state().open).toBeFalsy();
      clickInput(picker);
      expect(picker.state().open).toBeFalsy();
    });

    it('support custom icon', () => {
      const picker = renderPicker({
        inputIcon: 'test-select',
      });
      expect(picker.find('.rc-time-picker').text()).toBe('test-select');
    });
  });

  describe('render panel to body (without seconds)', () => {
    it('popup correctly', async () => {
      const onChange = jest.fn();
      const picker = renderPickerWithoutSeconds({
        onChange,
      });
      expect(picker.state().open).toBeFalsy();
      matchValue(picker, '08:24');
      clickInput(picker);

      expect(picker.find('.rc-time-picker-panel-inner').length).toBeTruthy();
      expect(picker.state().open).toBeTruthy();
      clickSelectItem(picker, 0, 1);

      expect(onChange).toBeCalled();
      expect(onChange.mock.calls[0][0].hour()).toBe(1);
      expect(onChange.mock.calls[0][0].minute()).toBe(24);
      matchValue(picker, '01:24');
      expect(picker.state().open).toBeTruthy();
    });
  });

  describe('render panel to body 12pm mode', () => {
    it('popup correctly', async () => {
      const onChange = jest.fn();
      const picker = renderPickerWithoutSeconds({
        use12Hours: true,
        value: null,
        onChange,
      });
      expect(picker.state().open).toBeFalsy();
      matchValue(picker, '');
      clickInput(picker);

      expect(picker.find('.rc-time-picker-panel-inner').length).toBeTruthy();
      expect(picker.state().open).toBeTruthy();
      clickSelectItem(picker, 0, 1);

      expect(onChange).toBeCalled();
      expect(picker.state().open).toBeTruthy();
    });
  });

  describe('other operations', () => {
    it('focus/blur correctly', async () => {
      let focus = false;
      let blur = false;

      const picker = renderPicker({
        onFocus: () => {
          focus = true;
        },
        onBlur: () => {
          blur = true;
        },
      });
      expect(picker.state().open).toBeFalsy();
      picker.find('.rc-time-picker-input').simulate('focus');
      expect(picker.state().open).toBeFalsy();
      picker.find('.rc-time-picker-input').simulate('blur');

      expect(focus).toBeTruthy();
      expect(blur).toBeTruthy();
    });
  });

  describe('allowEmpty', () => {
    it('should allow clear', async () => {
      const picker = renderPicker({
        allowEmpty: true,
      });
      expect(picker.render()).toMatchSnapshot();
    });

    it('cannot allow clear when disabled', async () => {
      const picker = renderPicker({
        allowEmpty: true,
        disabled: true,
      });
      expect(picker.render()).toMatchSnapshot();
    });
  });
});
