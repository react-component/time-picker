/* eslint no-console:0 */

import 'rc-time-picker/assets/index.less';
import React from 'react';
import ReactDom from 'react-dom';
import TimePicker from 'rc-time-picker';

const starPath = 'M908.1 353.1l-253.9-36.9L540.7 86.1c-3' +
  '.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L3' +
  '69.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3-12.3 12' +
  '.7-12.1 32.9 0.6 45.3l183.7 179.1-43.4 252.9c-1.2 6.9' +
  '-0.1 14.1 3.2 20.3 8.2 15.6 27.6 21.7 43.2 13.4L512 7' +
  '54l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-' +
  '19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3' +
  ' 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1' +
  ' 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6' +
  ' 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z';

const redoPath = 'M758.2 839.1C851.8 765.9 912 651.9 912' +
  ' 523.9 912 303 733.5 124.3 512.6 124 291.4 123.7 112 ' +
  '302.8 112 523.9c0 125.2 57.5 236.9 147.6 310.2 3.5 2.' +
  '8 8.6 2.2 11.4-1.3l39.4-50.5c2.7-3.4 2.1-8.3-1.2-11.1' +
  '-8.1-6.6-15.9-13.7-23.4-21.2-29.4-29.4-52.5-63.6-68.6' +
  '-101.7C200.4 609 192 567.1 192 523.9s8.4-85.1 25.1-12' +
  '4.5c16.1-38.1 39.2-72.3 68.6-101.7 29.4-29.4 63.6-52.' +
  '5 101.7-68.6C426.9 212.4 468.8 204 512 204s85.1 8.4 1' +
  '24.5 25.1c38.1 16.1 72.3 39.2 101.7 68.6 29.4 29.4 52' +
  '.5 63.6 68.6 101.7 16.7 39.4 25.1 81.3 25.1 124.5s-8.' +
  '4 85.1-25.1 124.5c-16.1 38.1-39.2 72.3-68.6 101.7-9.3' +
  ' 9.3-19.1 18-29.3 26L668.2 724c-4.1-5.3-12.5-3.5-14.1' +
  ' 3l-39.6 162.2c-1.2 5 2.6 9.9 7.7 9.9l167 0.8c6.7 0 1' +
  '0.5-7.7 6.3-12.9l-37.3-47.9z';

class App extends React.Component {
  state = {
    open: false,
    useIcon: false,
  };
  getIcon = (path, style = {}) => {
    return (
      <i
        style={{
          fontSize: '12px',
          fontStyle: 'normal',
          color: '#aaa',
          display: 'inline-block',
          lineHeight: '1',
          width: '20px',
          transition: 'color 0.3s ease',
          ...style,
        }}
      >
        <svg
          viewBox="0 0 1024 1024"
          width="1em"
          height="1em"
          fill="currentColor"
          style={{ verticalAlign: '-.125em' }}
        >
          <path d={path} p-id="5827"></path>
        </svg>
      </i>
    );
  }
  setOpen = ({ open }) => {
    this.setState({ open });
  }
  toggleOpen = () => {
    this.setState({
      open: !this.state.open,
    });
  }
  toggleIcon = () => {
    this.setState({
      useIcon: !this.state.useIcon,
    });
  }
  render() {
    const inputIcon = this.getIcon(starPath, {
      position: 'absolute',
      width: '24px',
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    });
    const clearIcon = this.getIcon(redoPath);
    return (
      <div>
        <button onClick={this.toggleOpen}>Toggle open</button>
        <button onClick={this.toggleIcon}>Use Custom Icon</button>
        <TimePicker
          style={{
            position: 'relative',
          }}
          open={this.state.open}
          onOpen={this.setOpen}
          onClose={this.setOpen}
          inputIcon={this.state.useIcon && inputIcon || undefined}
          clearIcon={this.state.useIcon && clearIcon || undefined}
          focusOnOpen
        />
      </div>
    );
  }
}

ReactDom.render(
  <App />,
  document.getElementById('__react-content')
);
