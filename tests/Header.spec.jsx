import ReactDOM from 'react-dom';
import React from 'react';
import KeyCode from 'rc-util/lib/KeyCode';
import { mount } from 'enzyme';
import moment from 'moment';
import TimePicker from '../src/TimePicker';
import { findHeader, clickInput, blurInput, matchAll } from './util';

describe('Header', () => {
  let container;

  function renderPicker(props) {
    const showSecond = true;
    const format = 'HH:mm:ss';
    return mount(
      <TimePicker
        format={format}
        showSecond={showSecond}
        defaultValue={moment('01:02:03', format)}
        {...props}
      />,
    );
  }

  function changeTime(picker, value) {
    picker.find('.rc-time-picker-panel-input').simulate('change', {
      target: {
        value,
      },
    });
  }

  function headerContains(picker, str) {
    expect(findHeader(picker).instance().className).toContain(str);
  }

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  });

  describe('input to change value', () => {
    it('input correctly', async () => {
      const picker = renderPicker();
      expect(picker.state().open).toBeFalsy();
      clickInput(picker);

      expect(picker.state().open).toBeTruthy();
      matchAll(picker, '01:02:03');

      changeTime(picker, '12:34:56');

      expect(picker.state().open).toBeTruthy();
      matchAll(picker, '12:34:56');
    });

    it('carry correctly', async () => {
      const picker = renderPicker();
      expect(picker.state().open).toBeFalsy();
      clickInput(picker);
      expect(picker.state().open).toBeTruthy();

      matchAll(picker, '01:02:03');

      changeTime(picker, '33:44:55');
      expect(picker.state().open).toBeTruthy();
      matchAll(picker, '33:44:55', '01:02:03');

      changeTime(picker, '10:90:30');
      expect(picker.state().open).toBeTruthy();
      matchAll(picker, '10:90:30', '01:02:03');

      changeTime(picker, '34:56:78');
      expect(picker.state().open).toBeTruthy();
      matchAll(picker, '34:56:78', '01:02:03');
    });

    it('carry disabled correctly', async () => {
      const picker = renderPicker({
        disabledMinutes(h) {
          return [h];
        },
        disabledSeconds(h, m) {
          return [h + (m % 60)];
        },
      });
      expect(picker.state().open).toBeFalsy();
      clickInput(picker);
      expect(picker.state().open).toBeTruthy();
      matchAll(picker, '01:02:03');

      changeTime(picker, '10:09:78');
      expect(picker.state().open).toBeTruthy();
      headerContains(picker, 'rc-time-picker-panel-input-invalid');
      matchAll(picker, '10:09:78', '01:02:03');

      changeTime(picker, '10:10:78');
      expect(picker.state().open).toBeTruthy();
      matchAll(picker, '10:10:78', '01:02:03');

      changeTime(picker, '10:09:19');
      expect(picker.state().open).toBeTruthy();
      headerContains(picker, 'rc-time-picker-panel-input-invalid');
      matchAll(picker, '10:09:19', '01:02:03');

      changeTime(picker, '10:09:20');
      expect(picker.state().open).toBeTruthy();
      matchAll(picker, '10:09:20');
    });

    it('carry hidden correctly', async () => {
      const picker = renderPicker({
        disabledMinutes(h) {
          return [h];
        },
        disabledSeconds(h, m) {
          return [h + (m % 60)];
        },
        hideDisabledOptions: true,
      });
      expect(picker.state().open).toBeFalsy();
      clickInput(picker);
      expect(picker.state().open).toBeTruthy();

      matchAll(picker, '01:02:03');

      changeTime(picker, '10:09:78');
      expect(picker.state().open).toBeTruthy();
      headerContains(picker, 'rc-time-picker-panel-input-invalid');
      matchAll(picker, '10:09:78', '01:02:03');

      changeTime(picker, '10:10:78');
      expect(picker.state().open).toBeTruthy();
      matchAll(picker, '10:10:78', '01:02:03');

      changeTime(picker, '10:09:19');
      expect(picker.state().open).toBeTruthy();
      headerContains(picker, 'rc-time-picker-panel-input-invalid');
      matchAll(picker, '10:09:19', '01:02:03');

      changeTime(picker, '10:09:20');
      expect(picker.state().open).toBeTruthy();
      matchAll(picker, '10:09:20');
    });

    it('check correctly', async () => {
      const picker = renderPicker();
      expect(picker.state().open).toBeFalsy();
      clickInput(picker);
      expect(picker.state().open).toBeTruthy();

      matchAll(picker, '01:02:03');

      changeTime(picker, '3:34:56');
      expect(picker.state().open).toBeTruthy();
      matchAll(picker, '3:34:56', '01:02:03');
      headerContains(picker, 'rc-time-picker-panel-input-invalid');

      changeTime(picker, '13:3:56');
      expect(picker.state().open).toBeTruthy();
      matchAll(picker, '13:3:56', '01:02:03');
      headerContains(picker, 'rc-time-picker-panel-input-invalid');

      changeTime(picker, '13:34:5');
      expect(picker.state().open).toBeTruthy();
      matchAll(picker, '13:34:5', '01:02:03');
      headerContains(picker, 'rc-time-picker-panel-input-invalid');
    });
  });

  describe('other operations', () => {
    it('exit correctly', async () => {
      const picker = renderPicker();
      expect(picker.state().open).toBeFalsy();
      clickInput(picker);
      expect(picker.state().open).toBeTruthy();

      matchAll(picker, '01:02:03');

      findHeader(picker).simulate('keyDown', {
        keyCode: KeyCode.ESC,
      });

      expect(picker.state().open).toBeFalsy();

      clickInput(picker);
      matchAll(picker, '01:02:03');
    });

    it('focus on open', async () => {
      const picker = renderPicker({
        focusOnOpen: true,
      });
      expect(picker.state().open).toBeFalsy();
      clickInput(picker);

      // this touches the focusOnOpen code, but we cannot verify the input is in focus
      expect(picker.state().open).toBeTruthy();
      matchAll(picker, '01:02:03');
    });

    it('can be clear mannually even allowEmpty is false', async () => {
      const picker = renderPicker({
        allowEmpty: false,
      });
      clickInput(picker);
      expect(picker.state().open).toBeTruthy();
      matchAll(picker, '01:02:03');
      changeTime(picker, '');
      blurInput(picker);
      matchAll(picker, '');
    });
  });
});
