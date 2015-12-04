import ReactDOM from 'react-dom';
import React from 'react';
import TimePicker from '../src/TimePicker';

import TestUtils from 'react-addons-test-utils';
const Simulate = TestUtils.Simulate;
import expect from 'expect.js';
import async from 'async';

import DateTimeFormat from 'gregorian-calendar-format';
import zhCn from 'gregorian-calendar/lib/locale/zh_CN';
import TimePickerLocale from '../src/locale/zh_CN';

function formatTime(time, formatter) {
  return formatter.parse(time, {
    locale: zhCn,
    obeyCount: true,
  });
}

describe('TimePicker', () => {
  let container;

  function renderPicker(props) {
    const showSecond = true;
    const formatter = new DateTimeFormat('HH:mm:ss');

    return ReactDOM.render(
      <TimePicker
        formatter={formatter}
        locale={TimePickerLocale}
        showSecond={showSecond}
        defaultValue={formatTime('12:57:58', formatter)}
        {...props}
      />, container);
  }

  function renderPickerWithoutSeconds(props) {
    const showSecond = false;
    const formatter = new DateTimeFormat('HH:mm');

    return ReactDOM.render(
      <TimePicker
        formatter={formatter}
        locale={TimePickerLocale}
        showSecond={showSecond}
        defaultValue={formatTime('08:24', formatter)}
        {...props}
      />, container);
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
    it('popup correctly', (done) => {
      let change;
      const picker = renderPicker({
        onChange(v) {
          change = v;
        },
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      expect(ReactDOM.findDOMNode(input).value).to.be('12:57:58');
      async.series([(next) => {
        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-inner')[0]).to.be.ok();
        expect(picker.state.open).to.be(true);
        const hour = TestUtils.scryRenderedDOMComponentsWithTag(picker.panelInstance, 'li')[1];
        Simulate.click(hour);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).to.be.ok();
        expect(change.getHourOfDay()).to.be(1);
        expect(change.getMinutes()).to.be(57);
        expect(change.getSeconds()).to.be(58);
        expect(ReactDOM.findDOMNode(input).value).to.be('01:57:58');
        expect(picker.state.open).to.be.ok();
        next();
      }], () => {
        done();
      });
    });

    it('destroy correctly', (done) => {
      const picker = renderPicker();
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      async.series([(next) => {
        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-panel-inner')[0]).not.to.be.ok();
        expect(picker.state.open).to.be(true);
        if (document.querySelectorAll) {
          expect(document.querySelectorAll('.rc-time-picker').length).not.to.be(0);
        }
        expect(TestUtils.scryRenderedDOMComponentsWithTag(picker.panelInstance, 'li')[0]).to.be.ok();
        ReactDOM.unmountComponentAtNode(container);
        setTimeout(next, 100);
      }, (next) => {
        if (document.querySelectorAll) {
          expect(document.querySelectorAll('.rc-time-picker').length).to.be(0);
        }
        expect(picker.panelInstance).not.to.be.ok();
        next();
      }], () => {
        done();
      });
    });
  });

  describe('render panel to body (without seconds)', () => {
    it('popup correctly', (done) => {
      let change;
      const picker = renderPickerWithoutSeconds({
        onChange(v) {
          change = v;
        },
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      expect(ReactDOM.findDOMNode(input).value).to.be('08:24');
      async.series([(next) => {
        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-inner')[0]).to.be.ok();
        expect(picker.state.open).to.be(true);
        const hour = TestUtils.scryRenderedDOMComponentsWithTag(picker.panelInstance, 'li')[1];
        Simulate.click(hour);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).to.be.ok();
        expect(change.getHourOfDay()).to.be(1);
        expect(change.getMinutes()).to.be(24);
        expect(ReactDOM.findDOMNode(input).value).to.be('01:24');
        expect(picker.state.open).to.be.ok();
        next();
      }], () => {
        done();
      });
    });
  });
});
