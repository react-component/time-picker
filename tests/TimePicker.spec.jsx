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
  var div;
  var showSecond = true;
  var str = showSecond ? 'HH:mm:ss' : 'HH:mm';
  var formatter = new DateTimeFormat(str);

  function renderPicker(props) {
    return ReactDOM.render(
      <TimePicker
        formatter={formatter}
        locale={TimePickerLocale}
        showSecond={showSecond}
        defaultValue={formatTime('27:57:58', formatter)}
        {...props}
      />, div);
  }

  function formatTime(time, formatter) {
    return formatter.parse(time, {
      locale: zhCn,
      obeyCount: true,
    });
  }

  beforeEach(function () {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(function () {
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  });

  it('popup correctly', function (done) {
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

  describe('render panel to body', function () {
    it('support correctly', function (done) {
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
        ReactDOM.unmountComponentAtNode(div);
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

});
