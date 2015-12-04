import ReactDOM from 'react-dom';
import React from 'react';
import TimePicker from '../src/TimePicker';

import TestUtils from 'react-addons-test-utils';
var Simulate = TestUtils.Simulate;
import expect from 'expect.js';
import async from 'async';

import DateTimeFormat from 'gregorian-calendar-format';
import GregorianCalendar from 'gregorian-calendar';
import zhCn from 'gregorian-calendar/lib/locale/zh_CN';
import TimePickerLocale from '../src/locale/zh_CN';

describe('TimePicker', function () {
  var container;

  function renderPicker(props) {
    var showSecond = true;
    var formatter = new DateTimeFormat('HH:mm:ss');

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
    var showSecond = false;
    var formatter = new DateTimeFormat('HH:mm');

    return ReactDOM.render(
      <TimePicker
        formatter={formatter}
        locale={TimePickerLocale}
        showSecond={showSecond}
        defaultValue={formatTime('08:24', formatter)}
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

  describe('render panel to body', function () {
    it('popup correctly', function (done) {
      var change;
      var picker = renderPicker({
        onChange: function (v) {
          change = v;
        }
      });
      expect(picker.state.open).not.to.be.ok();
      var input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      expect(ReactDOM.findDOMNode(input).value).to.be('12:57:58');
      async.series([function (next) {
        Simulate.click(input);
        setTimeout(next, 100);
      }, function (next) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-inner')[0]).to.be.ok();
        expect(picker.state.open).to.be(true);
        var hour = TestUtils.scryRenderedDOMComponentsWithTag(picker.panelInstance, 'li')[1];
        Simulate.click(hour);
        setTimeout(next, 100);
      }, function (next) {
        expect(change).to.be.ok();
        expect(change.getHourOfDay()).to.be(1);
        expect(change.getMinutes()).to.be(57);
        expect(change.getSeconds()).to.be(58);
        expect(ReactDOM.findDOMNode(input).value).to.be('01:57:58');
        expect(picker.state.open).to.be.ok();
        next();
      }], function () {
        done();
      });
    });

    it('destroy correctly', function (done) {
      var change;
      var picker = renderPicker({
        onChange: function (v) {
          change = v;
        }
      });
      expect(picker.state.open).not.to.be.ok();
      var input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      async.series([function (next) {
        Simulate.click(input);
        setTimeout(next, 100);
      }, function (next) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-panel-inner')[0]).not.to.be.ok();
        expect(picker.state.open).to.be(true);
        if (document.querySelectorAll) {
          expect(document.querySelectorAll('.rc-time-picker').length).not.to.be(0);
        }
        expect(TestUtils.scryRenderedDOMComponentsWithTag(picker.panelInstance, 'li')[0]).to.be.ok();
        ReactDOM.unmountComponentAtNode(container);
        setTimeout(next, 100);
      }, function (next) {
        if (document.querySelectorAll) {
          expect(document.querySelectorAll('.rc-time-picker').length).to.be(0);
        }
        expect(picker.panelInstance).not.to.be.ok();
        next();
      }], function () {
        done();
      });
    });
  });

  describe('render panel to body (without seconds)', function () {
    it('popup correctly', function (done) {
      var change;
      var picker = renderPickerWithoutSeconds({
        onChange: function (v) {
          change = v;
        }
      });
      expect(picker.state.open).not.to.be.ok();
      var input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      expect(ReactDOM.findDOMNode(input).value).to.be('08:24');
      async.series([function (next) {
        Simulate.click(input);
        setTimeout(next, 100);
      }, function (next) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-inner')[0]).to.be.ok();
        expect(picker.state.open).to.be(true);
        var hour = TestUtils.scryRenderedDOMComponentsWithTag(picker.panelInstance, 'li')[1];
        Simulate.click(hour);
        setTimeout(next, 100);
      }, function (next) {
        expect(change).to.be.ok();
        expect(change.getHourOfDay()).to.be(1);
        expect(change.getMinutes()).to.be(24);
        expect(ReactDOM.findDOMNode(input).value).to.be('01:24');
        expect(picker.state.open).to.be.ok();
        next();
      }], function () {
        done();
      });
    });
  });

});
