import PropTypes from 'prop-types';

import '../index.css';

export const CommonInput = ({ prefix = null, placeholder = "", value = "", onChange = () => {}, width }) => {
    return (
        <div className='input-wrapper' style={{ width }}>
            {prefix}
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
}

CommonInput.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    prefix: PropTypes.element,
    width: PropTypes.string.isRequired,
}