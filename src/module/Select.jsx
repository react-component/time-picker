import React, {PropTypes} from 'react';
import ReactDom from 'react-dom';
import classnames from 'classnames';

const scrollTo = (element, to, duration) => {
  // jump to target if duration zero
  if (duration <= 0) {
    element.scrollTop = to;
    return;
  }
  const difference = to - element.scrollTop;
  const perTick = difference / duration * 10;

  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick;
    if (element.scrollTop === to) return;
    scrollTo(element, to, duration - 10);
  }, 10);
};

const Select = React.createClass({
  propTypes: {
    prefixCls: PropTypes.string,
    options: PropTypes.array,
    selectedIndex: PropTypes.number,
    type: PropTypes.string,
    onSelect: PropTypes.func,
  },

  componentDidMount() {
    // jump to selected option
    this.scrollToSelected(0);
  },

  componentDidUpdate() {
    // smooth scroll to selected option
    this.scrollToSelected(200);
  },

  onSelect(event) {
    // do nothing when select selected option
    if (event.target.getAttribute('class') === 'selected') {
      return;
    }
    // change combobox selection
    const { onSelect, type } = this.props;
    const value = parseInt(event.target.innerHTML, 10);
    onSelect(type, value);
  },

  getOptions() {
    const { options, selectedIndex } = this.props;
    return options.map((item, index) => {
      const cls = classnames({ selected: selectedIndex === index});
      const ref = selectedIndex === index ? 'selected' : null;
      return <li ref={ref} className={cls} key={index} onClick={this.onSelect}>{item}</li>;
    });
  },

  scrollToSelected(duration) {
    // move to selected item
    const select = ReactDom.findDOMNode(this);
    const list = ReactDom.findDOMNode(this.refs.list);
    let index = this.props.selectedIndex - 2;
    if (index < 0) {
      index = 0;
    }
    const topOption = list.children[index];
    const to = topOption.offsetTop - select.offsetTop;
    scrollTo(select, to, duration);
  },

  render() {
    if (this.props.options.length === 0) {
      return null;
    }

    const { prefixCls } = this.props;

    return (
      <div className={`${prefixCls}-select`}>
        <ul ref="list">{this.getOptions()}</ul>
      </div>
    );
  },
});

export default Select;
