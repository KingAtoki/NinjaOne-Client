export const ALL = 'All';
export const WINDOWS = 'Windows';
export const MAC = 'Mac';
export const LINUX = 'Linux';
export const NAME = 'Name';
export const CAPACITY = 'HDD Capacity';
export const DESC = 'Descending';
export const ASC = 'Ascending';
export const NAME_ASC = 'Name (Ascending)';
export const NAME_DESC = 'Name (Descending)';
export const CAPACITY_ASC = 'HDD Capacity (Ascending)';
export const CAPACITY_DESC = 'HDD Capacity (Descending)';

export const deviceTypes = [
    { value: ALL, label: ALL },
    { value: WINDOWS, label: WINDOWS },
    { value: MAC, label: MAC },
    { value: LINUX, label: LINUX },
];

export const sortMethods = [
    { value: NAME_DESC, label: NAME_DESC },
    { value: NAME_ASC, label: NAME_ASC },
    { value: CAPACITY_ASC, label: CAPACITY_ASC },
    { value: CAPACITY_DESC, label: CAPACITY_DESC },
]