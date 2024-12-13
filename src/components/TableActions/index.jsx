import PropTypes from 'prop-types';

import { DropdownInput } from '../Inputs/DropdownInput';
import { SearchInput } from '../Inputs/SearchInput';
import {  ALL, deviceTypes, sortMethods } from '../../constants';

import RefreshIcon from '../../assets/refresh.svg';

import './index.css';

export const TableActions = ({
    filter,
    setFilter,
    deviceType,
    setDeviceType,
    sortMethod,
    setSortMethod,
    onRefresh,
}) => {
    return (
        <div className='table-actions'>
            <SearchInput value={filter} onChange={setFilter} />
            <DropdownInput
                prefix="Device Type:"
                onChange={setDeviceType}
                options={[{ value: ALL, label: ALL }, ...deviceTypes]}
                value={deviceType}
            />
            <DropdownInput
                prefix="Sort By:"
                onChange={setSortMethod}
                options={sortMethods}
                value={sortMethod}
            />
            <button className="refresh-button" onClick={onRefresh}>
                <img src={RefreshIcon} alt="refresh" />
            </button>
        </div>
    )
}

TableActions.propTypes = {
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
    deviceType: PropTypes.string.isRequired,
    setDeviceType: PropTypes.func.isRequired,
    sortMethod: PropTypes.string.isRequired,
    setSortMethod: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
};