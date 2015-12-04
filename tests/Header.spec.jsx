import ReactDOM from 'react-dom';
import React from 'react';
import TimePicker from '../src/TimePicker';

import TestUtils from 'react-addons-test-utils';
var Simulate = TestUtils.Simulate;
import expect from 'expect.js';
import async from 'async';
import {KeyCode} from 'rc-util';

import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import zhCn from 'gregorian-calendar/lib/locale/zh_CN';
import TimePickerLocale from '../src/locale/zh_CN';

describe('Header', function () {
  var container;

  function renderPicker(props) {
    var showSecond = true;
    var formatter = new DateTimeFormat('HH:mm:ss');

    return ReactDOM.render(
      <TimePicker
        formatter={formatter}
        locale={TimePickerLocale}
        showSecond={showSecond}
        defaultValue={formatTime('01:02:03', formatter)}
        {...props}
      />, container);
  }

  function formatTime(time, formatter) {
    return formatter.parse(time, {
      locale: zhCn,
      obeyCount: true,
    });
  }

  beforeEach(function () {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(function () {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  });

  describe('input to change value', function () {
    it('input correctly', function (done) {
      var picker = renderPicker();
      expect(picker.state.open).not.to.be.ok();
      var input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      var header;
      async.series([function (next) {
        Simulate.click(input);
        setTimeout(next, 100);
      }, function (next) {
        expect(picker.state.open).to.be(true);
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-input')[0];
        expect(header).to.be.ok();
        expect(ReactDOM.findDOMNode(header).value).to.be('01:02:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:02:03');

        ReactDOM.findDOMNode(header).value = '12:34:56';
        Simulate.change(header);
        setTimeout(next, 100);
      }, function (next) {
        expect(picker.state.open).to.be(true);
        expect(ReactDOM.findDOMNode(header).value).to.be('12:34:56');
        expect(ReactDOM.findDOMNode(input).value).to.be('12:34:56');

        next();
      }], function () {
        done();
      });
    });

    it('carry correctly', function (done) {
      var picker = renderPicker();
      expect(picker.state.open).not.to.be.ok();
      var input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      var header;
      async.series([function (next) {
        Simulate.click(input);
        setTimeout(next, 100);
      }, function (next) {
        expect(picker.state.open).to.be(true);
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-input')[0];
        expect(header).to.be.ok();
        expect(ReactDOM.findDOMNode(header).value).to.be('01:02:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:02:03');

        ReactDOM.findDOMNode(header).value = '33:44:55';
        Simulate.change(header);
        setTimeout(next, 100);
      }, function (next) {
        expect(picker.state.open).to.be(true);
        expect(ReactDOM.findDOMNode(header).value).to.be('09:44:55');
        expect(ReactDOM.findDOMNode(input).value).to.be('09:44:55');

        ReactDOM.findDOMNode(header).value = '10:90:30';
        Simulate.change(header);
        setTimeout(next, 100);
      }, function (next) {
        expect(picker.state.open).to.be(true);
        expect(ReactDOM.findDOMNode(header).value).to.be('11:30:30');
        expect(ReactDOM.findDOMNode(input).value).to.be('11:30:30');

        ReactDOM.findDOMNode(header).value = '34:56:78';
        Simulate.change(header);
        setTimeout(next, 100);
      }, function (next) {
        expect(picker.state.open).to.be(true);
        expect(ReactDOM.findDOMNode(header).value).to.be('10:57:18');
        expect(ReactDOM.findDOMNode(input).value).to.be('10:57:18');

        next();
      }], function () {
        done();
      });
    });

    it('check correctly', function (done) {
      var picker = renderPicker();
      expect(picker.state.open).not.to.be.ok();
      var input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      var header;
      async.series([function (next) {
        Simulate.click(input);
        setTimeout(next, 100);
      }, function (next) {
        expect(picker.state.open).to.be(true);
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-input')[0];
        expect(header).to.be.ok();
        expect(ReactDOM.findDOMNode(header).value).to.be('01:02:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:02:03');

        ReactDOM.findDOMNode(header).value = '3:34:56';
        Simulate.change(header);
        setTimeout(next, 100);
      }, function (next) {
        expect(picker.state.open).to.be(true);
        expect(ReactDOM.findDOMNode(header).value).to.be('3:34:56');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:02:03');
        expect(ReactDOM.findDOMNode(header).className).to.contain('rc-time-picker-panel-input-invalid');

        ReactDOM.findDOMNode(header).value = '13:3:56';
        Simulate.change(header);
        setTimeout(next, 100);
      }, function (next) {
        expect(picker.state.open).to.be(true);
        expect(ReactDOM.findDOMNode(header).value).to.be('13:3:56');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:02:03');
        expect(ReactDOM.findDOMNode(header).className).to.contain('rc-time-picker-panel-input-invalid');

        ReactDOM.findDOMNode(header).value = '13:34:5';
        Simulate.change(header);
        setTimeout(next, 100);
      }, function (next) {
        expect(picker.state.open).to.be(true);
        expect(ReactDOM.findDOMNode(header).value).to.be('13:34:5');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:02:03');
        expect(ReactDOM.findDOMNode(header).className).to.contain('rc-time-picker-panel-input-invalid');
        next();
      }], function () {
        done();
      });
    });

  });

  describe('other operations', function () {
    it('clear correctly', function (done) {
      var change;
      var picker = renderPicker({
        onChange: function (v) {
          change = v;
        }
      });
      expect(picker.state.open).not.to.be.ok();
      var input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      var header;
      async.series([function (next) {
        expect(picker.state.open).to.be(false);

        Simulate.click(input);
        setTimeout(next, 100);
      }, function (next) {
        expect(picker.state.open).to.be(true);
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-input')[0];
        var clearButton = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-clear-btn')[0];
        expect(header).to.be.ok();
        expect(clearButton).to.be.ok();
        expect(ReactDOM.findDOMNode(header).value).to.be('01:02:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:02:03');

        Simulate.mouseDown(clearButton);
        setTimeout(next, 100);
      }, function (next) {
        expect(picker.state.open).to.be(false);
        expect(change).to.be(null);
        expect(ReactDOM.findDOMNode(header).value).to.be('');
        expect(ReactDOM.findDOMNode(input).value).to.be('');

        next();
      }], function () {
        done();
      });
    });

    it('exit correctly', function (done) {
      var picker = renderPicker();
      expect(picker.state.open).not.to.be.ok();
      var input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      var header;
      async.series([function (next) {
        expect(picker.state.open).to.be(false);

        Simulate.click(input);
        setTimeout(next, 100);
      }, function (next) {
        expect(picker.state.open).to.be(true);
        header = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-input')[0];
        expect(header).to.be.ok();
        expect(ReactDOM.findDOMNode(header).value).to.be('01:02:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:02:03');

        Simulate.keyDown(ReactDOM.findDOMNode(header), {
          keyCode: KeyCode.ESC
        });
        setTimeout(next, 100);
      }, function (next) {
        expect(picker.state.open).to.be(false);
        expect(ReactDOM.findDOMNode(header).value).to.be('01:02:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:02:03');

        next();
      }], function () {
        done();
      });
    });

  });
});
