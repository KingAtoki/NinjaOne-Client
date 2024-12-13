import { useEffect, useState } from 'react';

import { DropdownInput } from '../Inputs/DropdownInput';
import { SearchInput } from '../Inputs/SearchInput';
import { CAPACITY_ASC, CAPACITY_DESC, DEVICE_TYPE, deviceTypes, HDD_CAPACITY, NAME_ASC, NAME_DESC, sortMethods, SYSTEM_NAME } from '../../constants';

import RefreshIcon from '../../assets/refresh.svg';

import './index.css';
import { useDevices } from '../../contexts/DevicesContext';

export const TableActions = () => {
    const [filter, setFilter] = useState('')
    const [deviceType, setDeviceType] = useState('')
    const [sortMethod, setSortMethod] = useState(NAME_DESC)

    const { formatDevices, devices: originalDevices } = useDevices()

    useEffect(() => {
        formatDevices(format)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, deviceType, sortMethod])

    const onRefresh = () => {
        setFilter('')
        setDeviceType('')
        setSortMethod(NAME_DESC)
    }

    const format = (devices) => {
        const filtered = handleFilter(devices)
        const sorted = handleSort(filtered)
        return sorted
    }

    const handleFilter = (devices) => {
        if (!filter && !deviceType) {
            return originalDevices
        }

        return devices.filter(device => {
            const filterByName = device[SYSTEM_NAME].toLowerCase().includes(filter.toLowerCase())
            const filterByDeviceType = device[DEVICE_TYPE].toLowerCase().includes(deviceType.toLowerCase())
            return filterByName && filterByDeviceType
        })
    }

    const handleSort = (devices) => {
        return [...devices].sort((a, b) => {
            switch (sortMethod) {
                case NAME_ASC:
                    return a[SYSTEM_NAME].localeCompare(b[SYSTEM_NAME])
                case NAME_DESC:
                    return b[SYSTEM_NAME].localeCompare(a[SYSTEM_NAME])
                case CAPACITY_ASC:
                    return a[HDD_CAPACITY] - b[HDD_CAPACITY]
                case CAPACITY_DESC:
                    return b[HDD_CAPACITY] - a[HDD_CAPACITY]
                default:
                    return 0
            }
        })
    }

    return (
        <div className='table-actions'>
            <SearchInput value={filter} onChange={e => setFilter(e.target.value)} />
            <DropdownInput
                prefix="Device Type:"
                onChange={e => setDeviceType(e.target.value)}
                options={[{ value: '', label: 'All' }, ...deviceTypes]}
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
