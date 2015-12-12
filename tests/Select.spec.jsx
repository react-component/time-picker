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

describe('Select', () => {
  let container;

  function renderPicker(props) {
    const showSecond = true;
    const formatter = new DateTimeFormat('HH:mm:ss');

    return ReactDOM.render(
      <TimePicker
        formatter={formatter}
        locale={TimePickerLocale}
        showSecond={showSecond}
        defaultValue={formatTime('01:02:03', formatter)}
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

  describe('select number', () => {
    it('select number correctly', (done) => {
      const picker = renderPicker();
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      let selector;
      async.series([(next) => {
        expect(picker.state.open).to.be(false);

        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-select');

        setTimeout(next, 100);
      }, (next) => {
        expect(selector.length).to.be(3);

        next();
      }], () => {
        done();
      });
    });
  });

  describe('select to change value', () => {
    it('hour correctly', (done) => {
      let change;
      const picker = renderPicker({
        onChange(v) {
          change = v;
        },
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      let header;
      async.series([(next) => {
        expect(picker.state.open).to.be(false);

        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-input')[0];
        expect(header).to.be.ok();
        expect(ReactDOM.findDOMNode(header).value).to.be('01:02:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:02:03');

        const selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-select')[0];
        const option = selector.getElementsByTagName('li')[19];
        Simulate.click(option);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).to.be.ok();
        expect(change.getHourOfDay()).to.be(19);
        expect(ReactDOM.findDOMNode(header).value).to.be('19:02:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('19:02:03');
        expect(picker.state.open).to.be.ok();

        next();
      }], () => {
        done();
      });
    });

    it('minute correctly', (done) => {
      let change;
      const picker = renderPicker({
        onChange(v) {
          change = v;
        },
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      let header;
      async.series([(next) => {
        expect(picker.state.open).to.be(false);

        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-input')[0];
        expect(header).to.be.ok();
        expect(ReactDOM.findDOMNode(header).value).to.be('01:02:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:02:03');

        const selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-select')[1];
        const option = selector.getElementsByTagName('li')[19];
        Simulate.click(option);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).to.be.ok();
        expect(change.getMinutes()).to.be(19);
        expect(ReactDOM.findDOMNode(header).value).to.be('01:19:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:19:03');
        expect(picker.state.open).to.be.ok();

        next();
      }], () => {
        done();
      });
    });

    it('second correctly', (done) => {
      let change;
      const picker = renderPicker({
        onChange(v) {
          change = v;
        },
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      let header;
      async.series([(next) => {
        expect(picker.state.open).to.be(false);

        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-input')[0];
        expect(header).to.be.ok();
        expect(ReactDOM.findDOMNode(header).value).to.be('01:02:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:02:03');

        const selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-select')[2];
        const option = selector.getElementsByTagName('li')[19];
        Simulate.click(option);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).to.be.ok();
        expect(change.getSeconds()).to.be(19);
        expect(ReactDOM.findDOMNode(header).value).to.be('01:02:19');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:02:19');
        expect(picker.state.open).to.be.ok();

        next();
      }], () => {
        done();
      });
    });

    it('disabled correctly', (done) => {
      let change;
      const picker = renderPicker({
        onChange(v) {
          change = v;
        },
        disabledMinutes: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      let header;
      async.series([(next) => {
        expect(picker.state.open).to.be(false);

        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-input')[0];
        expect(header).to.be.ok();
        expect(ReactDOM.findDOMNode(header).value).to.be('01:02:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:02:03');

        const selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-select')[1];
        const option = selector.getElementsByTagName('li')[6];
        Simulate.click(option);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).not.to.be.ok();
        expect(ReactDOM.findDOMNode(header).value).to.be('01:02:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:02:03');
        expect(picker.state.open).to.be.ok();

        const selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-select')[1];
        const option = selector.getElementsByTagName('li')[7];
        Simulate.click(option);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).to.be.ok();
        expect(change.getMinutes()).to.be(7);
        expect(ReactDOM.findDOMNode(header).value).to.be('01:07:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:07:03');
        expect(picker.state.open).to.be.ok();

        next();
      }], () => {
        done();
      });
    });

    it('hidden correctly', (done) => {
      let change;
      const picker = renderPicker({
        onChange(v) {
          change = v;
        },
        disabledHours: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23],
        hideDisabledOptions: true
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      let header;
      async.series([(next) => {
        expect(picker.state.open).to.be(false);

        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-input')[0];
        expect(header).to.be.ok();
        expect(ReactDOM.findDOMNode(header).value).to.be('01:02:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:02:03');

        const selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-select')[0];
        const option = selector.getElementsByTagName('li')[3];
        Simulate.click(option);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).to.be.ok();
        expect(change.getHourOfDay()).to.be(6);
        expect(ReactDOM.findDOMNode(header).value).to.be('06:02:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('06:02:03');
        expect(picker.state.open).to.be.ok();

        const selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-select')[0];
        const option = selector.getElementsByTagName('li')[4];
        Simulate.click(option);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).to.be.ok();
        expect(change.getHourOfDay()).to.be(8);
        expect(ReactDOM.findDOMNode(header).value).to.be('08:02:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('08:02:03');
        expect(picker.state.open).to.be.ok();

        next();
      }], () => {
        done();
      });
    });
  });
});
