import { useState } from 'react';

import { DropdownInput } from '../Inputs/DropdownInput';
import { SearchInput } from '../Inputs/SearchInput';
import { ALL, deviceTypes, NAME_DESC, sortMethods } from '../../constants';

import RefreshIcon from '../../assets/refresh.svg';

import './index.css';

export const TableActions = () => {
    const [filter, setFilter] = useState('')
    const [deviceType, setDeviceType] = useState(ALL)
    const [sortMethod, setSortMethod] = useState(NAME_DESC)

    const onRefresh = () => {
        setFilter('')
        setDeviceType(ALL)
        setSortMethod(NAME_DESC)
    }

    return (
        <div className='table-actions'>
            <SearchInput value={filter} onChange={e => setFilter(e.target.value)} />
            <DropdownInput
                prefix="Device Type:"
                onChange={e => setDeviceType(e.target.value)}
                options={[{ value: ALL, label: ALL }, ...deviceTypes]}
                value={deviceType}
            />
            <DropdownInput
                prefix="Sort By:"
                onChange={e => setSortMethod(e.target.value)}
                options={sortMethods}
                value={sortMethod}
            />
            <button className="refresh-button" onClick={onRefresh}>
                <img src={RefreshIcon} alt="refresh" />
            </button>
        </div>
    )
}
