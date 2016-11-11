import ReactDOM from 'react-dom';
import React from 'react';
import TimePicker from '../src/TimePicker';

import TestUtils from 'react-addons-test-utils';
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
          'rc-time-picker-panel-inner')[0]).not.to.be.ok();
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
});
