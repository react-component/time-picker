import ReactDOM from 'react-dom';
import React from 'react';
import TestUtils from 'react-dom/test-utils';
import moment from 'moment';
import TimePicker from '../src/TimePicker';

const { Simulate } = TestUtils;
const map = (arr, fn) => Array.prototype.map.call(arr, fn);
const delay = duration => new Promise(resolve => setTimeout(resolve, duration));

describe('Select', () => {
  let container;

  function renderPicker(props) {
    const showSecond = true;
    const format = 'HH:mm:ss';

    // eslint-disable-next-line
    return ReactDOM.render(
      <TimePicker
        format={format}
        showSecond={showSecond}
        defaultValue={moment('01:02:04', format)}
        {...props}
      />,
      container,
    );
  }

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  });

  describe('select panel', () => {
    it('select panel reacts to mouseenter and mouseleave correctly', async () => {
      const picker = renderPicker();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];

      Simulate.click(input);
      await delay(100);

      const re = /(^|\s+)rc-time-picker-panel-select-active(\s+|$)/;
      const selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      )[0];

      expect(re.test(selector.className)).to.be(false);

      Simulate.mouseEnter(selector);
      expect(re.test(selector.className)).to.be(true);

      Simulate.mouseLeave(selector);
      expect(re.test(selector.className)).to.be(false);
    });

    it('shows only numbers according to step props', async () => {
      const picker = renderPicker({
        hourStep: 5,
        minuteStep: 15,
        secondStep: 21,
      });
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];

      Simulate.click(input);
      await delay(100);

      const selectors = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      );

      const hourSelector = selectors[0];
      const minuteSelector = selectors[1];
      const secondSelector = selectors[2];

      const hours = map(hourSelector.getElementsByTagName('li'), li => li.innerHTML);
      expect(hours).to.eql(['00', '05', '10', '15', '20']);

      const minutes = map(minuteSelector.getElementsByTagName('li'), li => li.innerHTML);
      expect(minutes).to.eql(['00', '15', '30', '45']);

      const seconds = map(secondSelector.getElementsByTagName('li'), li => li.innerHTML);
      expect(seconds).to.eql(['00', '21', '42']);
    });
  });

  describe('select number', () => {
    it('select number correctly', async () => {
      const picker = renderPicker();
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];

      expect(picker.state.open).to.be(false);

      Simulate.click(input);
      await delay(100);

      expect(picker.state.open).to.be(true);
      const selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      );

      await delay(100);

      expect(selector.length).to.be(3);
    });
  });

  describe('select to change value', () => {
    it('hour correctly', async () => {
      let change;
      const picker = renderPicker({
        onChange(v) {
          change = v;
        },
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];

      expect(picker.state.open).to.be(false);

      Simulate.click(input);
      await delay(100);

      expect(picker.state.open).to.be(true);
      const header = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-input',
      )[0];
      expect(header).to.be.ok();
      expect(header.value).to.be('01:02:04');
      expect(input.value).to.be('01:02:04');

      const selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      )[0];
      const option = selector.getElementsByTagName('li')[19];
      Simulate.click(option);
      await delay(100);

      expect(change).to.be.ok();
      expect(change.hour()).to.be(19);
      expect(header.value).to.be('19:02:04');
      expect(input.value).to.be('19:02:04');
      expect(picker.state.open).to.be.ok();
    });

    it('minute correctly', async () => {
      let change;
      const picker = renderPicker({
        onChange(v) {
          change = v;
        },
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];

      expect(picker.state.open).to.be(false);

      Simulate.click(input);
      await delay(100);

      expect(picker.state.open).to.be(true);
      const header = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-input',
      )[0];
      expect(header).to.be.ok();
      expect(header.value).to.be('01:02:04');
      expect(input.value).to.be('01:02:04');

      const selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      )[1];
      const option = selector.getElementsByTagName('li')[19];
      Simulate.click(option);
      await delay(100);

      expect(change).to.be.ok();
      expect(change.minute()).to.be(19);
      expect(header.value).to.be('01:19:04');
      expect(input.value).to.be('01:19:04');
      expect(picker.state.open).to.be.ok();
    });

    it('second correctly', async () => {
      let change;
      const picker = renderPicker({
        onChange(v) {
          change = v;
        },
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];

      expect(picker.state.open).to.be(false);

      Simulate.click(input);
      await delay(100);

      expect(picker.state.open).to.be(true);
      const header = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-input',
      )[0];
      expect(header).to.be.ok();
      expect(header.value).to.be('01:02:04');
      expect(input.value).to.be('01:02:04');

      const selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      )[2];
      const option = selector.getElementsByTagName('li')[19];
      Simulate.click(option);
      await delay(100);

      expect(change).to.be.ok();
      expect(change.second()).to.be(19);
      expect(header.value).to.be('01:02:19');
      expect(input.value).to.be('01:02:19');
      expect(picker.state.open).to.be.ok();
    });

    it('ampm correctly', async () => {
      let ampmChange;
      const picker = renderPicker({
        onAmPmChange(v) {
          ampmChange = v;
        },
        defaultValue: moment()
          .hour(0)
          .minute(0)
          .second(0),
        format: undefined,
        showSecond: false,
        use12Hours: true,
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];

      expect(picker.state.open).to.be(false);

      Simulate.click(input);
      await delay(100);

      expect(picker.state.open).to.be(true);

      const selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      )[2];
      expect(input.value).to.be('12:00 am');
      const option = selector.getElementsByTagName('li')[1];
      Simulate.click(option);
      await delay(100);

      expect(ampmChange).to.be.ok();
      expect(ampmChange).to.be('PM');
      expect(input.value).to.be('12:00 pm');
      expect(picker.state.open).to.be.ok();
    });

    it('disabled correctly', async () => {
      let change;
      const picker = renderPicker({
        onChange(v) {
          change = v;
        },
        disabledMinutes(h) {
          return [h];
        },
        disabledSeconds(h, m) {
          return [h + (m % 60)];
        },
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];

      expect(picker.state.open).to.be(false);

      Simulate.click(input);
      await delay(100);

      expect(picker.state.open).to.be(true);
      const header = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-input',
      )[0];
      expect(header).to.be.ok();
      expect(header.value).to.be('01:02:04');
      expect(input.value).to.be('01:02:04');

      let selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      )[1];
      let option = selector.getElementsByTagName('li')[1];
      Simulate.click(option);
      await delay(100);

      expect(change).not.to.be.ok();
      expect(header.value).to.be('01:02:04');
      expect(input.value).to.be('01:02:04');
      expect(picker.state.open).to.be.ok();

      selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      )[2];
      option = selector.getElementsByTagName('li')[3];
      Simulate.click(option);
      await delay(100);

      expect(change).not.to.be.ok();
      expect(header.value).to.be('01:02:04');
      expect(input.value).to.be('01:02:04');
      expect(picker.state.open).to.be.ok();

      selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      )[1];
      option = selector.getElementsByTagName('li')[7];
      Simulate.click(option);
      await delay(100);

      expect(change).to.be.ok();
      expect(change.minute()).to.be(7);
      expect(header.value).to.be('01:07:04');
      expect(input.value).to.be('01:07:04');
      expect(picker.state.open).to.be.ok();
    });

    it('hidden correctly', async () => {
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

      expect(picker.state.open).to.be(false);

      Simulate.click(input);
      await delay(100);

      expect(picker.state.open).to.be(true);
      const header = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-input',
      )[0];
      expect(header).to.be.ok();
      expect(header.value).to.be('01:02:04');
      expect(input.value).to.be('01:02:04');

      let selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      )[0];
      let option = selector.getElementsByTagName('li')[3];
      Simulate.click(option);
      await delay(100);

      expect(change).to.be.ok();
      expect(change.hour()).to.be(6);
      expect(header.value).to.be('06:02:04');
      expect(input.value).to.be('06:02:04');
      expect(picker.state.open).to.be.ok();

      selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      )[0];
      option = selector.getElementsByTagName('li')[4];
      Simulate.click(option);
      await delay(100);

      expect(change).to.be.ok();
      expect(change.hour()).to.be(8);
      expect(header.value).to.be('08:02:04');
      expect(input.value).to.be('08:02:04');
      expect(picker.state.open).to.be.ok();
    });
  });

  describe('select in 12 hours mode', () => {
    it('renders correctly', async () => {
      const picker = renderPicker({
        use12Hours: true,
        defaultValue: moment()
          .hour(14)
          .minute(0)
          .second(0),
        showSecond: false,
        format: undefined,
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];

      expect(picker.state.open).to.be(false);

      Simulate.click(input);
      await delay(100);

      expect(picker.state.open).to.be(true);
      const selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      );
      expect(input.value).to.be('2:00 pm');

      await delay(100);

      expect(selector.length).to.be(3);
    });

    it('renders 12am correctly', async () => {
      const picker = renderPicker({
        use12Hours: true,
        defaultValue: moment()
          .hour(0)
          .minute(0)
          .second(0),
        showSecond: false,
        format: undefined,
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];

      expect(picker.state.open).to.be(false);

      Simulate.click(input);
      await delay(100);

      expect(picker.state.open).to.be(true);
      const selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      );
      await delay(100);

      expect(selector.length).to.be(3);
    });

    it('renders 5am correctly', async () => {
      const picker = renderPicker({
        use12Hours: true,
        defaultValue: moment()
          .hour(0)
          .minute(0)
          .second(0),
        showSecond: false,
        format: undefined,
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];

      expect(picker.state.open).to.be(false);

      Simulate.click(input);
      await delay(100);

      expect(picker.state.open).to.be(true);
      const selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      )[0];
      expect(input.value).to.be('12:00 am');
      const option = selector.getElementsByTagName('li')[3];
      Simulate.click(option);
      await delay(100);

      expect(input.value).to.be('3:00 am');
    });

    it('renders 12am/pm correctly', async () => {
      const picker = renderPicker({
        use12Hours: true,
        defaultValue: moment()
          .hour(0)
          .minute(0)
          .second(0),
        showSecond: false,
        format: undefined,
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];

      expect(picker.state.open).to.be(false);

      Simulate.click(input);
      await delay(100);

      expect(picker.state.open).to.be(true);
      const selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      )[2];
      expect(input.value).to.be('12:00 am');
      const option = selector.getElementsByTagName('li')[1];
      Simulate.click(option);
      await delay(200);

      expect(input.value).to.be('12:00 pm');

      Simulate.click(selector.getElementsByTagName('li')[0]);
      await delay(200);

      expect(input.value).to.be('12:00 am');
    });

    it('renders uppercase AM correctly', async () => {
      const picker = renderPicker({
        use12Hours: true,
        defaultValue: moment()
          .hour(0)
          .minute(0)
          .second(0),
        showSecond: false,
        format: 'h:mm A',
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];

      expect(picker.state.open).to.be(false);

      Simulate.click(input);
      await delay(100);

      expect(picker.state.open).to.be(true);
      const selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      )[2];
      expect(input.value).to.be('12:00 AM');
      const option = selector.getElementsByTagName('li')[1];
      Simulate.click(option);
      await delay(200);

      expect(input.value).to.be('12:00 PM');

      Simulate.click(selector.getElementsByTagName('li')[0]);
      await delay(200);

      expect(input.value).to.be('12:00 AM');
    });

    it('disabled correctly', async () => {
      let change;
      const picker = renderPicker({
        use12Hours: true,
        format: undefined,
        onChange(v) {
          change = v;
        },
        disabledHours() {
          return [0, 2, 6, 18, 12];
        },
        defaultValue: moment()
          .hour(0)
          .minute(0)
          .second(0),
        showSecond: false,
      });
      expect(picker.state.open).not.to.be.ok();
      const input = TestUtils.scryRenderedDOMComponentsWithClass(picker, 'rc-time-picker-input')[0];

      expect(picker.state.open).to.be(false);

      Simulate.click(input);
      await delay(100);
      expect(picker.state.open).to.be(true);
      const header = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-input',
      )[0];
      expect(header).to.be.ok();
      expect(header.value).to.be('12:00 am');
      expect(input.value).to.be('12:00 am');

      let selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      )[0];
      let option = selector.getElementsByTagName('li')[2];
      Simulate.click(option);
      await delay(100);
      expect(change).not.to.be.ok();
      expect(header.value).to.be('12:00 am');
      expect(input.value).to.be('12:00 am');
      expect(picker.state.open).to.be.ok();

      selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      )[0];
      option = selector.getElementsByTagName('li')[5];
      Simulate.click(option);
      await delay(100);
      expect(change).to.be.ok();
      expect(change.hour()).to.be(5);
      expect(header.value).to.be('5:00 am');
      expect(input.value).to.be('5:00 am');
      expect(picker.state.open).to.be.ok();

      selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      )[2];
      Simulate.click(selector.getElementsByTagName('li')[1]);

      await delay(200);
      change = null;
      expect(change).not.to.be.ok();
      expect(header.value).to.be('5:00 pm');
      expect(input.value).to.be('5:00 pm');
      expect(picker.state.open).to.be.ok();

      selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      )[0];
      option = selector.getElementsByTagName('li')[0];
      Simulate.click(option);
      await delay(100);
      expect(change).not.to.be.ok();
      expect(header.value).to.be('5:00 pm');
      expect(input.value).to.be('5:00 pm');
      expect(picker.state.open).to.be.ok();

      selector = TestUtils.scryRenderedDOMComponentsWithClass(
        picker.panelInstance,
        'rc-time-picker-panel-select',
      )[0];
      option = selector.getElementsByTagName('li')[5];
      Simulate.click(option);
      await delay(100);
      expect(change).to.be.ok();
      expect(change.hour()).to.be(17);
      expect(header.value).to.be('5:00 pm');
      expect(input.value).to.be('5:00 pm');
      expect(picker.state.open).to.be.ok();
    });
  });
});
