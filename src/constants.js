const WINDOWS_WORKSTATION = 'Windows workstation';
const MAC_WORKSTATION = 'Mac workstation';
const LINUX_WORKSTATION = 'Linux workstation';
const NAME = 'Name';
const CAPACITY = 'HDD Capacity';
const DESC = 'Descending';
const ASC = 'Ascending';
const NAME_ASC = 'Name (Ascending)';
const NAME_DESC = 'Name (Descending)';
const CAPACITY_ASC = 'HDD Capacity (Ascending)';
const CAPACITY_DESC = 'HDD Capacity (Descending)';
const DEVICE_TYPE_PLACEHOLDER = 'Select type';
const SYSTEM_NAME = 'system_name';
const DEVICE_TYPE = 'type';
const HDD_CAPACITY = 'hdd_capacity';
const ADD = 'add';
const EDIT = 'edit';
const DELETE = 'delete';

const deviceTypes = [
    { value: WINDOWS_WORKSTATION, label: WINDOWS_WORKSTATION },
    { value: MAC_WORKSTATION, label: MAC_WORKSTATION },
    { value: LINUX_WORKSTATION, label: LINUX_WORKSTATION },
];

const sortMethods = [
    { value: NAME_DESC, label: NAME_DESC },
    { value: NAME_ASC, label: NAME_ASC },
    { value: CAPACITY_ASC, label: CAPACITY_ASC },
    { value: CAPACITY_DESC, label: CAPACITY_DESC },
]

export {
    NAME,
    CAPACITY,
    DESC,
    ASC,
    NAME_ASC,
    NAME_DESC,
    CAPACITY_ASC,
    CAPACITY_DESC,
    DEVICE_TYPE_PLACEHOLDER,
    SYSTEM_NAME,
    DEVICE_TYPE,
    HDD_CAPACITY,
    deviceTypes,
    sortMethods,
    ADD,
    EDIT,
    DELETE,
    WINDOWS_WORKSTATION,
    MAC_WORKSTATION,
    LINUX_WORKSTATION
}