import PropTypes from 'prop-types';

import '../index.css';

export const CommonInput = ({
    prefix = null,
    placeholder = "",
    value = "",
    onChange = () => { },
    width,
    isInvalid = false,
    ...rest
}) => {
    return (
        <div className={`input-wrapper${isInvalid ? ' invalid' : ''}`} style={{ width }}>
            {prefix}
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...rest}
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
    isInvalid: PropTypes.bool,
}