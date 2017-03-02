import ReactDOM from 'react-dom';
import React from 'react';
import TimePicker from '../src/TimePicker';
import TestUtils from 'react-addons-test-utils';
const Simulate = TestUtils.Simulate;
import expect from 'expect.js';
import async from 'async';
import moment from 'moment';

describe('Select', () => {
  let container;

  function renderPicker(props) {
    const showSecond = true;
    const format = 'HH:mm:ss';

    return ReactDOM.render(
      <TimePicker
        format={format}
        showSecond={showSecond}
        defaultValue={moment('01:02:04', format)}
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
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-time-picker-input')[0];
      let selector;
      async.series([(next) => {
        expect(picker.state.open).to.be(false);

        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-select');

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
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-time-picker-input')[0];
      let header;
      async.series([(next) => {
        expect(picker.state.open).to.be(false);

        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-input')[0];
        expect(header).to.be.ok();
        expect((header).value).to.be('01:02:04');
        expect((input).value).to.be('01:02:04');

        const selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-select')[0];
        const option = selector.getElementsByTagName('li')[19];
        Simulate.click(option);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).to.be.ok();
        expect(change.hour()).to.be(19);
        expect((header).value).to.be('19:02:04');
        expect((input).value).to.be('19:02:04');
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
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-time-picker-input')[0];
      let header;
      async.series([(next) => {
        expect(picker.state.open).to.be(false);

        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-input')[0];
        expect(header).to.be.ok();
        expect((header).value).to.be('01:02:04');
        expect((input).value).to.be('01:02:04');

        const selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-select')[1];
        const option = selector.getElementsByTagName('li')[19];
        Simulate.click(option);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).to.be.ok();
        expect(change.minute()).to.be(19);
        expect((header).value).to.be('01:19:04');
        expect((input).value).to.be('01:19:04');
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
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-time-picker-input')[0];
      let header;
      async.series([(next) => {
        expect(picker.state.open).to.be(false);

        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-input')[0];
        expect(header).to.be.ok();
        expect((header).value).to.be('01:02:04');
        expect((input).value).to.be('01:02:04');

        const selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-select')[2];
        const option = selector.getElementsByTagName('li')[19];
        Simulate.click(option);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).to.be.ok();
        expect(change.second()).to.be(19);
        expect((header).value).to.be('01:02:19');
        expect((input).value).to.be('01:02:19');
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
        disabledMinutes(h) {
          return [h];
        },
        disabledSeconds(h, m) {
          return [h + m % 60];
        },
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-time-picker-input')[0];
      let header;
      async.series([(next) => {
        expect(picker.state.open).to.be(false);

        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-input')[0];
        expect(header).to.be.ok();
        expect((header).value).to.be('01:02:04');
        expect((input).value).to.be('01:02:04');

        const selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-select')[1];
        const option = selector.getElementsByTagName('li')[1];
        Simulate.click(option);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).not.to.be.ok();
        expect((header).value).to.be('01:02:04');
        expect((input).value).to.be('01:02:04');
        expect(picker.state.open).to.be.ok();

        const selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-select')[2];
        const option = selector.getElementsByTagName('li')[3];
        Simulate.click(option);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).not.to.be.ok();
        expect((header).value).to.be('01:02:04');
        expect((input).value).to.be('01:02:04');
        expect(picker.state.open).to.be.ok();

        const selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-select')[1];
        const option = selector.getElementsByTagName('li')[7];
        Simulate.click(option);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).to.be.ok();
        expect(change.minute()).to.be(7);
        expect((header).value).to.be('01:07:04');
        expect((input).value).to.be('01:07:04');
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
        disabledHours() {
          return [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23];
        },
        hideDisabledOptions: true,
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
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-input')[0];
        expect(header).to.be.ok();
        expect((header).value).to.be('01:02:04');
        expect((input).value).to.be('01:02:04');

        const selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-select')[0];
        const option = selector.getElementsByTagName('li')[3];
        Simulate.click(option);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).to.be.ok();
        expect(change.hour()).to.be(6);
        expect((header).value).to.be('06:02:04');
        expect((input).value).to.be('06:02:04');
        expect(picker.state.open).to.be.ok();

        const selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-select')[0];
        const option = selector.getElementsByTagName('li')[4];
        Simulate.click(option);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).to.be.ok();
        expect(change.hour()).to.be(8);
        expect((header).value).to.be('08:02:04');
        expect((input).value).to.be('08:02:04');
        expect(picker.state.open).to.be.ok();

        next();
      }], () => {
        done();
      });
    });
  });


  describe('select in 12 hours mode', () => {
    it('renders correctly', (done) => {
      const picker = renderPicker({
        use12Hours: true,
        defaultValue: moment().hour(14).minute(0).second(0),
        showSecond: false,
        format: undefined,
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-time-picker-input')[0];
      let selector;
      async.series([(next) => {
        expect(picker.state.open).to.be(false);

        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-select');
        expect((input).value).to.be('2:00 pm');

        setTimeout(next, 100);
      }, (next) => {
        expect(selector.length).to.be(3);

        next();
      }], () => {
        done();
      });
    });


    it('renders 12am correctly', (done) => {
      const picker = renderPicker({
        use12Hours: true,
        defaultValue: moment().hour(0).minute(0).second(0),
        showSecond: false,
        format: undefined,
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-time-picker-input')[0];
      let selector;
      async.series([(next) => {
        expect(picker.state.open).to.be(false);

        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-select');
        expect((input).value).to.be('12:00 am');

        setTimeout(next, 100);
      }, (next) => {
        expect(selector.length).to.be(3);

        next();
      }], () => {
        done();
      });
    });
  });
});
