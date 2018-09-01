import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import styles from './DropdownList.m.css';

const makeHash = (length = 5) => (
  Math.random().toString(36).substring(2, length)
);

const getOptions = (value) => {
  const values = Array.isArray(value) ? value : [value];

  return options => (
    options.filter(option =>
      values.indexOf(option.value) !== -1,
    )
  );
};

const isReverse = bottom =>
  window.innerHeight - bottom < 200;

class DropdownList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.getDisplay = this.getDisplay.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
    this.handleExpand = this.handleExpand.bind(this);

    this.placeholder = {
      label: props.placeholder,
      value: makeHash(),
    };

    this.state = {
      collapse: true,
      selected: {
        value: 0,
        label: this.props.placeholder,
      },
    };
  }

  getDisplay() {
    let { options } = this.props;
    const { value } = this.props;
    options = getOptions(value)(options);

    if (options.length === 0) {
      return [
        this.placeholder,
      ];
    }

    return options;
  }

  handleSelected(option) {
    return () => {
      this.props.onChange(option);
    };
  }

  handleCollapse() {
    if (!this.props.disabled) {
      this.setState({
        collapse: true,
      });
    }
  }

  handleExpand() {
    if (!this.props.disabled) {
      this.setState({
        collapse: false,
      });
    }
  }

  /* eslint-disable */
  render() {
    const collapseStyle = this.container
                          && isReverse(this.container.getBoundingClientRect().bottom)
      ? { bottom: '100%' }
      : null;
    const { isDesktop } = this.props;

    return (
      <div
        className={
          classnames({
            [styles['gray-container-disabled']]: this.props.disabled && isDesktop,
            [styles['gray-container']]: !this.props.disabled && isDesktop,
            [styles['mobile-gray-container']]: !isDesktop,
          })
        }
        tabIndex="0"
        onBlur={this.handleCollapse}
        ref={(node) => { this.container = node; }}
      >
        <div
          className={
            classnames({
              [styles['gray-displayZone']]: isDesktop,
              [styles['mobile-gray-displayZone']]: !isDesktop,
            })
          }
          onClick={this.state.collapse ? this.handleExpand : this.handleCollapse}
        >
          {this.getDisplay().map(option => (
            <div
              key={option.value}
              title={option.label}
              className={
                classnames({
                  [styles['gray-placeholder']]: option.value === this.placeholder.value,
                  [styles['gray-selected']]: option.value !== this.placeholder.value,
                })
              }
            >
              <p
                style={{
                  width: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  cursor: 'pointer',
                }}
              >
                {option.label}
              </p>
            </div>
          ))}
        </div>
        <div
          className={
            classnames({
              [styles['collapse']]: this.state.collapse,
              [styles['expand']]: !this.state.collapse,
            })
          }
          style={collapseStyle}
        >
          <div className={styles.zBox}>
            <div
              className={styles['gray-options']}
            >
              {this.props.options.map(option => (
                <div
                  className={styles['gray-option']}
                  key={`${option.label}`}
                  title={option.label}
                  onClick={() => {
                    this.handleSelected(option)();
                    this.handleCollapse();
                  }}
                >
                  <p>{option.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}


DropdownList.propTypes = {
  value: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.any),
    ],
  ),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object),
  gray: PropTypes.bool,
  disabled: PropTypes.bool,
};

DropdownList.defaultProps = {
  options: [
    {
      label: '',
      value: 0,
    },
  ],
  placeholder: '',
  gray: false,
  disabled: false,
};

export default DropdownList;
