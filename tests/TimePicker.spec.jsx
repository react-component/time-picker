import ReactDOM from 'react-dom';
import React from 'react';
import TimePicker from '../src/TimePicker';

import TestUtils from 'react-dom/test-utils';
const Simulate = TestUtils.Simulate;
import expect from 'expect.js';
import async from 'async';
import moment from 'moment';

describe('TimePicker', () => {
  let container;

  function renderPicker(props) {
    const showSecond = true;
    const format = ('HH:mm:ss');

    return ReactDOM.render(
      <TimePicker
        format={format}
        showSecond={showSecond}
        defaultValue={moment('12:57:58', format)}
        {...props}
      />, container);
  }

  function renderPickerWithoutSeconds(props) {
    const showSecond = false;
    const format = ('HH:mm');

    return ReactDOM.render(
      <TimePicker
        format={format}
        showSecond={showSecond}
        defaultValue={moment('08:24', format)}
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
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-time-picker-input')[0];
      expect((input).value).to.be('12:57:58');
      async.series([(next) => {
        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-inner')[0]).to.be.ok();
        expect(picker.state.open).to.be(true);
        const hour = TestUtils.scryRenderedDOMComponentsWithTag(picker.panelInstance, 'li')[1];
        Simulate.click(hour);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).to.be.ok();
        expect(change.hour()).to.be(1);
        expect(change.minute()).to.be(57);
        expect(change.second()).to.be(58);
        expect((input).value).to.be('01:57:58');
        expect(picker.state.open).to.be.ok();
        next();
      }], () => {
        done();
      });
    });

    it('destroy correctly', (done) => {
      const picker = renderPicker();
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-time-picker-input')[0];
      async.series([(next) => {
        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(picker,
          'rc-time-picker-panel-inner')[0]).to.be.ok();
        expect(picker.state.open).to.be(true);
        if (document.querySelectorAll) {
          expect(document.querySelectorAll('.rc-time-picker').length).not.to.be(0);
        }
        expect(TestUtils.scryRenderedDOMComponentsWithTag(picker.panelInstance,
          'li')[0]).to.be.ok();
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

    it('support name', () => {
      const picker = renderPicker({
        name: 'time-picker-form-name',
      });
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-time-picker-input')[0];
      expect(input.name).to.be('time-picker-form-name');
    });

    it('support focus', () => {
      const picker = renderPicker({
        name: 'time-picker-form-name',
      });
      expect(picker.focus).to.be.a('function');
    });

    it('should be controlled by open', () => {
      const picker = renderPicker({
        open: false,
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-time-picker-input')[0];
      Simulate.click(input);
      expect(picker.state.open).not.to.be.ok();
    });

    it('support custom icon', () => {
      const picker = renderPicker({
        inputIcon: 'test-select',
      });
      const innerPicker = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-time-picker')[0];
      expect(innerPicker.innerText).to.be('test-select');
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
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-time-picker-input')[0];
      expect((input).value).to.be('08:24');
      async.series([(next) => {
        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-inner')[0]).to.be.ok();
        expect(picker.state.open).to.be(true);
        const hour = TestUtils.scryRenderedDOMComponentsWithTag(picker.panelInstance, 'li')[1];
        Simulate.click(hour);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).to.be.ok();
        expect(change.hour()).to.be(1);
        expect(change.minute()).to.be(24);
        expect((input).value).to.be('01:24');
        expect(picker.state.open).to.be.ok();
        next();
      }], () => {
        done();
      });
    });
  });

  describe('render panel to body 12pm mode', () => {
    it('popup correctly', (done) => {
      let change;
      const picker = renderPickerWithoutSeconds({
        use12Hours: true,
        value: null,
        onChange(v) {
          change = v;
        },
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-time-picker-input')[0];
      expect((input).value).to.be('');
      async.series([(next) => {
        Simulate.click(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance,
          'rc-time-picker-panel-inner')[0]).to.be.ok();
        expect(picker.state.open).to.be(true);
        const hour = TestUtils.scryRenderedDOMComponentsWithTag(picker.panelInstance, 'li')[1];
        Simulate.click(hour);
        setTimeout(next, 100);
      }, (next) => {
        expect(change).to.be.ok();
        expect(picker.state.open).to.be.ok();
        next();
      }], () => {
        done();
      });
    });
  });

  describe('other operations', () => {
    it('focus/blur correctly', (done) => {
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
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker,
        'rc-time-picker-input')[0];

      async.series([(next) => {
        Simulate.focus(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(picker.state.open).to.be(false);

        Simulate.blur(input);
        setTimeout(next, 100);
      }, (next) => {
        expect(focus).to.be(true);
        expect(blur).to.be(true);

        next();
      }], () => {
        done();
      });
    });
  });
});
