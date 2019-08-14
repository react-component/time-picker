/* eslint jsx-a11y/no-noninteractive-element-to-interactive-role: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import classNames from 'classnames';
import raf from 'raf';

const scrollTo = (element, to, duration) => {
  // jump to target if duration zero
  if (duration <= 0) {
    raf(() => {
      element.scrollTop = to;
    });
    return;
  }
  const difference = to - element.scrollTop;
  const perTick = (difference / duration) * 10;

  raf(() => {
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
    onEsc: PropTypes.func,
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
    const { options, selectedIndex, prefixCls, onEsc } = this.props;
    return options.map((item, index) => {
      const cls = classNames({
        [`${prefixCls}-select-option-selected`]: selectedIndex === index,
        [`${prefixCls}-select-option-disabled`]: item.disabled,
      });
      const onClick = item.disabled
        ? undefined
        : () => {
            this.onSelect(item.value);
          };
      const onKeyDown = e => {
        if (e.keyCode === 13) onClick();
        else if (e.keyCode === 27) onEsc();
      };

      return (
        <li
          role="button"
          onClick={onClick}
          className={cls}
          key={index}
          disabled={item.disabled}
          tabIndex="0"
          onKeyDown={onKeyDown}
        >
          {item.label || item.value}
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
    const to = topOption.offsetTop + topOption.offsetHeight / 2 - select.offsetHeight / 2;
    scrollTo(select, to, duration);
  }

  render() {
    const { prefixCls, options } = this.props;
    const { active } = this.state;
    if (options.length === 0) {
      return null;
    }
    const cls = classNames(`${prefixCls}-select`, {
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
