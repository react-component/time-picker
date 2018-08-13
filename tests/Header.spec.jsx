import ReactDOM from 'react-dom';
import React from 'react';
import TimePicker from '../src/TimePicker';

import TestUtils from 'react-dom/test-utils';
const Simulate = TestUtils.Simulate;
import expect from 'expect.js';
import async from 'async';
import KeyCode from 'rc-util/lib/KeyCode';
import moment from 'moment';

describe('Header', () => {
  let container;

  function renderPicker(props) {
    const showSecond = true;
    const format = 'HH:mm:ss';

    return ReactDOM.render(
      <TimePicker
        format={format}
        showSecond={showSecond}
        defaultValue={moment('01:02:03', format)}
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

  describe('input to change value', () => {
    it('input correctly', (done) => {
      const picker = renderPicker();
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-time-picker-input')[0];
      let header;
      async.series([(next) => {
        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-input')[0];
        expect(header).to.be.ok();
        expect((header).value).to.be('01:02:03');
        expect((input).value).to.be('01:02:03');

        (header).value = '12:34:56';
        Simulate.change(header);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        expect((header).value).to.be('12:34:56');
        expect((input).value).to.be('12:34:56');

        next();
      }], () => {
        done();
      });
    });

    it('carry correctly', (done) => {
      const picker = renderPicker();
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-time-picker-input')[0];
      let header;
      async.series([(next) => {
        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-input')[0];
        expect(header).to.be.ok();
        expect((header).value).to.be('01:02:03');
        expect((input).value).to.be('01:02:03');

        (header).value = '33:44:55';
        Simulate.change(header);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        expect((header).value).to.be('33:44:55');
        expect((input).value).to.be('01:02:03');

        (header).value = '10:90:30';
        Simulate.change(header);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        expect((header).value).to.be('10:90:30');
        expect((input).value).to.be('01:02:03');

        (header).value = '34:56:78';
        Simulate.change(header);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        expect((header).value).to.be('34:56:78');
        expect((input).value).to.be('01:02:03');

        next();
      }], () => {
        done();
      });
    });

    it('carry disabled correctly', (done) => {
      const picker = renderPicker({
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
        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-input')[0];
        expect(header).to.be.ok();
        expect((header).value).to.be('01:02:03');
        expect((input).value).to.be('01:02:03');

        (header).value = '10:09:78';
        Simulate.change(header);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        expect((header).className).to.contain('rc-time-picker-panel-input-invalid');
        expect((header).value).to.be('10:09:78');
        expect((input).value).to.be('01:02:03');

        (header).value = '10:10:78';
        Simulate.change(header);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        expect((header).value).to.be('10:10:78');
        expect((input).value).to.be('01:02:03');

        (header).value = '10:09:19';
        Simulate.change(header);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        expect((header).className).to.contain('rc-time-picker-panel-input-invalid');
        expect((header).value).to.be('10:09:19');
        expect((input).value).to.be('01:02:03');

        (header).value = '10:09:20';
        Simulate.change(header);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        expect((header).value).to.be('10:09:20');
        expect((input).value).to.be('10:09:20');

        next();
      }], () => {
        done();
      });
    });

    it('carry hidden correctly', (done) => {
      const picker = renderPicker({
        disabledMinutes(h) {
          return [h];
        },
        disabledSeconds(h, m) {
          return [h + m % 60];
        },
        hideDisabledOptions: true,
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-time-picker-input')[0];
      let header;
      async.series([(next) => {
        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-input')[0];
        expect(header).to.be.ok();
        expect((header).value).to.be('01:02:03');
        expect((input).value).to.be('01:02:03');

        (header).value = '10:09:78';
        Simulate.change(header);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        expect((header).className).to.contain('rc-time-picker-panel-input-invalid');
        expect((header).value).to.be('10:09:78');
        expect((input).value).to.be('01:02:03');

        (header).value = '10:10:78';
        Simulate.change(header);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        expect((header).value).to.be('10:10:78');
        expect((input).value).to.be('01:02:03');

        (header).value = '10:09:19';
        Simulate.change(header);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        expect((header).className).to.contain('rc-time-picker-panel-input-invalid');
        expect((header).value).to.be('10:09:19');
        expect((input).value).to.be('01:02:03');

        (header).value = '10:09:20';
        Simulate.change(header);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        expect((header).value).to.be('10:09:20');
        expect((input).value).to.be('10:09:20');

        next();
      }], () => {
        done();
      });
    });

    it('check correctly', (done) => {
      const picker = renderPicker();
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-time-picker-input')[0];
      let header;
      async.series([(next) => {
        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-input')[0];
        expect(header).to.be.ok();
        expect((header).value).to.be('01:02:03');
        expect((input).value).to.be('01:02:03');

        (header).value = '3:34:56';
        Simulate.change(header);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        expect((header).value).to.be('3:34:56');
        expect((input).value).to.be('01:02:03');
        expect((header).className).to.contain('rc-time-picker-panel-input-invalid');

        (header).value = '13:3:56';
        Simulate.change(header);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        expect((header).value).to.be('13:3:56');
        expect((input).value).to.be('01:02:03');
        expect((header).className).to.contain('rc-time-picker-panel-input-invalid');

        (header).value = '13:34:5';
        Simulate.change(header);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(true);
        expect((header).value).to.be('13:34:5');
        expect((input).value).to.be('01:02:03');
        expect((header).className).to.contain('rc-time-picker-panel-input-invalid');
        next();
      }], () => {
        done();
      });
    });
  });

  describe('other operations', () => {
    it('clear correctly', (done) => {
      let change;
      const picker = renderPicker({
        clearIcon: 'test-clear',
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
        const clearButton = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-clear-btn')[0];
        expect(header).to.be.ok();
        expect(clearButton).to.be.ok();
        expect(clearButton.innerText).to.be('test-clear');
        expect((header).value).to.be('01:02:03');
        expect((input).value).to.be('01:02:03');

        Simulate.mouseDown(clearButton);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(false);
        expect(change).to.be(null);
        expect((header).value).to.be('');
        expect((input).value).to.be('');

        next();
      }], () => {
        done();
      });
    });

    it('exit correctly', (done) => {
      const picker = renderPicker();
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
        expect((header).value).to.be('01:02:03');
        expect((input).value).to.be('01:02:03');

        Simulate.keyDown((header), {
          keyCode: KeyCode.ESC,
        });
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(false);
        expect((header).value).to.be('01:02:03');
        expect((input).value).to.be('01:02:03');

        next();
      }], () => {
        done();
      });
    });

    it('focus on open', (done) => {
      const picker = renderPicker({
        focusOnOpen: true,
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
        // this touches the focusOnOpen code, but we cannot verify the input is in focus
        expect(picker.state.open).to.be(true);
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-input')[0];
        expect(header).to.be.ok();
        expect((header).value).to.be('01:02:03');
        expect((input).value).to.be('01:02:03');

        next();
      }], () => {
        done();
      });
    });
  });
});
