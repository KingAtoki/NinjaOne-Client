import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import CaretDownIcon from '../../../assets/caret-down.svg';

import '../index.css';


export const DropdownInput = ({
  options = [],
  prefix = "",
  value,
  onChange = () => { },
}) => {

  const [prefixWidth, setPrefixWidth] = useState(0);
  const prefixRef = useRef(null);

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  useEffect(() => {
    if (!prefixRef.current) {
      return;
    }
    setPrefixWidth(prefixRef.current?.offsetWidth);

  }, []);

  return (
    <div className='input-wrapper'>
      {prefix && <span className='prefix' ref={prefixRef}>{prefix}</span>}
      <select
        value={value}
        onChange={handleChange}
        style={{ paddingLeft: `${prefixWidth + 18}px`, }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <img src={CaretDownIcon} alt="caret-down" className="caret-down-icon" />
    </div>
  );
};

DropdownInput.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  prefix: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};