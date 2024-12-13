const ALL = 'All';
const WINDOWS = 'Windows';
const MAC = 'Mac';
const LINUX = 'Linux';
const NAME = 'Name';
const CAPACITY = 'HDD Capacity';
const DESC = 'Descending';
const ASC = 'Ascending';
const NAME_ASC = 'Name (Ascending)';
const NAME_DESC = 'Name (Descending)';
const CAPACITY_ASC = 'HDD Capacity (Ascending)';
const CAPACITY_DESC = 'HDD Capacity (Descending)';
const DEVICE_TYPE_PLACEHOLDER = 'Select type';
const SYSTEM_NAME = 'System name';
const DEVICE_TYPE = 'Device type';
const HDD_CAPACITY = 'HDD capacity (GB)';
const ADD = 'add';
const EDIT = 'edit';
const DELETE = 'delete';

const deviceTypes = [
    { value: WINDOWS, label: WINDOWS },
    { value: MAC, label: MAC },
    { value: LINUX, label: LINUX },
];

const sortMethods = [
    { value: NAME_DESC, label: NAME_DESC },
    { value: NAME_ASC, label: NAME_ASC },
    { value: CAPACITY_ASC, label: CAPACITY_ASC },
    { value: CAPACITY_DESC, label: CAPACITY_DESC },
]

export {
    ALL,
    WINDOWS,
    MAC,
    LINUX,
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
}