/* eslint jsx-a11y/no-noninteractive-element-to-interactive-role: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import classnames from 'classnames';

const scrollTo = (element, to, duration) => {
  const requestAnimationFrame =
    window.requestAnimationFrame ||
    function requestAnimationFrameTimeout() {
      return setTimeout(arguments[0], 10); // eslint-disable-line
    };
  // jump to target if duration zero
  if (duration <= 0) {
    element.scrollTop = to;
    return;
  }
  const difference = to - element.scrollTop;
  const perTick = (difference / duration) * 10;

  requestAnimationFrame(() => {
    element.scrollTop += perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  });
};

class Select extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    options: PropTypes.array,
    selectedIndex: PropTypes.number,
    type: PropTypes.string,
    onSelect: PropTypes.func,
    onMouseEnter: PropTypes.func,
  };

  state = {
    active: false,
  };

  componentDidMount() {
    // jump to selected option
    this.scrollToSelected(0);
  }

  componentDidUpdate(prevProps) {
    const { selectedIndex } = this.props;
    // smooth scroll to selected option
    if (prevProps.selectedIndex !== selectedIndex) {
      this.scrollToSelected(120);
    }
  }

  onSelect = value => {
    const { onSelect, type } = this.props;
    onSelect(type, value);
  };

  getOptions() {
    const { options, selectedIndex, prefixCls } = this.props;
    return options.map((item, index) => {
      const cls = classnames({
        [`${prefixCls}-select-option-selected`]: selectedIndex === index,
        [`${prefixCls}-select-option-disabled`]: item.disabled,
      });
      const onClick = item.disabled
        ? undefined
        : () => {
            this.onSelect(item.value);
          };
      return (
        <li role="button" onClick={onClick} className={cls} key={index} disabled={item.disabled}>
          {item.value}
        </li>
      );
    });
  }

  handleMouseEnter = e => {
    const { onMouseEnter } = this.props;
    this.setState({ active: true });
    onMouseEnter(e);
  };

  handleMouseLeave = () => {
    this.setState({ active: false });
  };

  saveList = node => {
    this.list = node;
  };

  scrollToSelected(duration) {
    // move to selected item
    const { selectedIndex } = this.props;
    const select = ReactDom.findDOMNode(this);
    const list = ReactDom.findDOMNode(this.list);
    if (!list) {
      return;
    }
    let index = selectedIndex;
    if (index < 0) {
      index = 0;
    }
    const topOption = list.children[index];
    const to = topOption.offsetTop;
    scrollTo(select, to, duration);
  }

  render() {
    const { prefixCls, options } = this.props;
    const { active } = this.state;
    if (options.length === 0) {
      return null;
    }
    const cls = classnames(`${prefixCls}-select`, {
      [`${prefixCls}-select-active`]: active,
    });
    return (
      <div
        className={cls}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <ul ref={this.saveList}>{this.getOptions()}</ul>
      </div>
    );
  }
}

export default Select;
