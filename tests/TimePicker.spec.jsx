import ReactDOM from 'react-dom';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import moment from 'moment';
import TimePicker from '../src/TimePicker';

const { Simulate } = TestUtils;
const delay = duration => new Promise(resolve => setTimeout(resolve, duration));

describe('TimePicker', () => {
  let container;

  function renderPicker(props) {
    const showSecond = true;
    const format = 'HH:mm:ss';

    // eslint-disable-next-line
    return ReactDOM.render(
      <TimePicker
        format={format}
        showSecond={showSecond}
        defaultValue={moment('12:57:58', format)}
        {...props}
      />,
      container,
    );
  }

  function renderPickerWithoutSeconds(props) {
    const showSecond = false;
    const format = 'HH:mm';

    // eslint-disable-next-line
    return ReactDOM.render(
      <TimePicker
        format={format}
        showSecond={showSecond}
        defaultValue={moment('08:24', format)}
        {...props}
      />,
      container,
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
      let change;
      const picker = renderPicker({
        onChange(v) {
          change = v;
        },
      });
      expect(picker.state().open).toBeFalsy();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      expect(input.value).toBe('12:57:58');

      Simulate.click(input);
      await delay(100);

      expect(
        TestUtils.scryRenderedDOMComponentsWithClass(
          picker.panelInstance,
          'rc-time-picker-panel-inner',
        )[0],
      ).toBeTruthy();
      expect(picker.state().open).toBeTruthy();
      const hour = TestUtils.scryRenderedDOMComponentsWithTag(picker.panelInstance, 'li')[1];
      Simulate.click(hour);
      await delay(100);

      expect(change).toBeTruthy();
      expect(change.hour()).toBe(1);
      expect(change.minute()).toBe(57);
      expect(change.second()).toBe(58);
      expect(input.value).toBe('01:57:58');
      expect(picker.state().open).toBeTruthy();
    });

    it('destroy correctly', async () => {
      const picker = renderPicker();
      expect(picker.state().open).toBeFalsy();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];

      Simulate.click(input);
      await delay(100);

      expect(
        TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-panel-inner')[0],
      ).toBeTruthy();
      expect(picker.state().open).toBeTruthy();
      if (document.querySelectorAll) {
        expect(document.querySelectorAll('.rc-time-picker').length).not.toBe(0);
      }
      expect(
        TestUtils.scryRenderedDOMComponentsWithTag(picker.panelInstance, 'li')[0],
      ).toBeTruthy();
      ReactDOM.unmountComponentAtNode(container);
      await delay(100);

      if (document.querySelectorAll) {
        expect(document.querySelectorAll('.rc-time-picker').length).toBe(0);
      }
      expect(picker.panelInstance).toBeFalsy();
    });

    it('support name', () => {
      const picker = renderPicker({
        name: 'time-picker-form-name',
      });
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      expect(input.name).toBe('time-picker-form-name');
    });

    it('support focus', () => {
      const picker = renderPicker({
        name: 'time-picker-form-name',
      });
      expect(typeof picker.focus).toBe('function');
    });

    it('should be controlled by open', () => {
      const picker = renderPicker({
        open: false,
      });
      expect(picker.state().open).toBeFalsy();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      Simulate.click(input);
      expect(picker.state().open).toBeFalsy();
    });

    it('support custom icon', () => {
      const picker = renderPicker({
        inputIcon: 'test-select',
      });
      const innerPicker = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker')[0];
      expect(innerPicker.innerText).toBe('test-select');
    });
  });

  describe('render panel to body (without seconds)', () => {
    it('popup correctly', async () => {
      let change;
      const picker = renderPickerWithoutSeconds({
        onChange(v) {
          change = v;
        },
      });
      expect(picker.state().open).toBeFalsy();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      expect(input.value).toBe('08:24');

      Simulate.click(input);
      await delay(100);

      expect(
        TestUtils.scryRenderedDOMComponentsWithClass(
          picker.panelInstance,
          'rc-time-picker-panel-inner',
        )[0],
      ).toBeTruthy();
      expect(picker.state().open).toBeTruthy();
      const hour = TestUtils.scryRenderedDOMComponentsWithTag(picker.panelInstance, 'li')[1];
      Simulate.click(hour);
      await delay(100);

      expect(change).toBeTruthy();
      expect(change.hour()).toBe(1);
      expect(change.minute()).toBe(24);
      expect(input.value).toBe('01:24');
      expect(picker.state().open).toBeTruthy();
    });
  });

  describe('render panel to body 12pm mode', () => {
    it('popup correctly', async () => {
      let change;
      const picker = renderPickerWithoutSeconds({
        use12Hours: true,
        value: null,
        onChange(v) {
          change = v;
        },
      });
      expect(picker.state().open).toBeFalsy();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      expect(input.value).toBe('');

      Simulate.click(input);
      await delay(100);

      expect(
        TestUtils.scryRenderedDOMComponentsWithClass(
          picker.panelInstance,
          'rc-time-picker-panel-inner',
        )[0],
      ).toBeTruthy();
      expect(picker.state().open).toBeTruthy();
      const hour = TestUtils.scryRenderedDOMComponentsWithTag(picker.panelInstance, 'li')[1];
      Simulate.click(hour);
      await delay(100);

      expect(change).toBeTruthy();
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
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];

      Simulate.focus(input);
      await delay(100);

      expect(picker.state().open).toBeFalsy();

      Simulate.blur(input);
      await delay(100);

      expect(focus).toBeTruthy();
      expect(blur).toBeTruthy();
    });
  });
});
