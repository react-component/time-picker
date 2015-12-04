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

describe('Select', function () {
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

  describe('select number', function () {

    it('select number correctly', function (done) {
      var picker = renderPicker();
      expect(picker.state.open).not.to.be.ok();
      var input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];
      var selector;
      async.series([function (next) {
        expect(picker.state.open).to.be(false);

        Simulate.click(input);
        setTimeout(next, 100);
      }, function (next) {
        expect(picker.state.open).to.be(true);
        selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-select');

        setTimeout(next, 100);
      }, function (next) {
        expect(selector.length).to.be(3);

        next();
      }], function () {
        done();
      });
    });

  });

  describe('select to change value', function () {

    it('hour correctly', function (done) {
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
        var selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-select')[0];
        var option = selector.getElementsByTagName('li')[19];
        expect(header).to.be.ok();
        expect(ReactDOM.findDOMNode(header).value).to.be('01:02:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:02:03');

        Simulate.click(option);
        setTimeout(next, 100);
      }, function (next) {
        expect(change).to.be.ok();
        expect(change.getHourOfDay()).to.be(19);
        expect(ReactDOM.findDOMNode(header).value).to.be('19:02:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('19:02:03');
        expect(picker.state.open).to.be.ok();

        next();
      }], function () {
        done();
      });
    });

    it('minute correctly', function (done) {
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
        var selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-select')[1];
        var option = selector.getElementsByTagName('li')[19];
        expect(header).to.be.ok();
        expect(ReactDOM.findDOMNode(header).value).to.be('01:02:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:02:03');

        Simulate.click(option);
        setTimeout(next, 100);
      }, function (next) {
        expect(change).to.be.ok();
        expect(change.getMinutes()).to.be(19);
        expect(ReactDOM.findDOMNode(header).value).to.be('01:19:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:19:03');
        expect(picker.state.open).to.be.ok();

        next();
      }], function () {
        done();
      });
    });

    it('second correctly', function (done) {
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
        var selector = TestUtils.scryRenderedDOMComponentsWithClass(picker.panelInstance, 'rc-time-picker-panel-select')[2];
        var option = selector.getElementsByTagName('li')[19];
        expect(header).to.be.ok();
        expect(ReactDOM.findDOMNode(header).value).to.be('01:02:03');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:02:03');

        Simulate.click(option);
        setTimeout(next, 100);
      }, function (next) {
        expect(change).to.be.ok();
        expect(change.getSeconds()).to.be(19);
        expect(ReactDOM.findDOMNode(header).value).to.be('01:02:19');
        expect(ReactDOM.findDOMNode(input).value).to.be('01:02:19');
        expect(picker.state.open).to.be.ok();

        next();
      }], function () {
        done();
      });
    });

  });
});
