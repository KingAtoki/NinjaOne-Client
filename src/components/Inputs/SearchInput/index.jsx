import PropTypes from 'prop-types';
import { CommonInput } from '../CommonInput';

import SearchIcon from '../../../assets/search.svg';

import '../index.css';

export const SearchInput = ({ value = "", onChange = () => {} }) => {
    const prefix = <img src={SearchIcon} alt="search" className="search-icon" />;
    return <CommonInput type='search' prefix={prefix} placeholder='Search' value={value} onChange={onChange} width='270px' />
}

SearchInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
}
