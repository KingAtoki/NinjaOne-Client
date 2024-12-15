/* eslint-disable react-refresh/only-export-components */
import { jest } from '@jest/globals';
import { render, act } from '@testing-library/react'
import { DevicesProvider } from './contexts/DevicesContext';
import { ModalProvider } from './contexts/ModalContext';
import mockDevicesApi from './__mocks__/api/devices';

jest.mock('./constants', () => ({
    WINDOWS_WORKSTATION: 'Windows workstation',
    MAC_WORKSTATION: 'Mac workstation',
    LINUX_WORKSTATION: 'Linux workstation',
    NAME: 'Name',
    CAPACITY: 'HDD Capacity',
    DESC: 'Descending',
    ASC: 'Ascending',
    NAME_ASC: 'Name (Ascending)',
    NAME_DESC: 'Name (Descending)',
    CAPACITY_ASC: 'HDD Capacity (Ascending)',
    CAPACITY_DESC: 'HDD Capacity (Descending)',
    DEVICE_TYPE_PLACEHOLDER: 'Select type',
    SYSTEM_NAME: 'system_name',
    DEVICE_TYPE: 'type',
    HDD_CAPACITY: 'hdd_capacity',
    ADD: 'add',
    EDIT: 'edit',
    DELETE: 'delete',
    deviceTypes: [
        { value: 'Windows workstation', label: 'Windows workstation' },
        { value: 'Mac workstation', label: 'Mac workstation' },
        { value: 'Linux workstation', label: 'Linux workstation' },
    ],
    sortMethods: [
        { value: 'Name (Ascending)', label: 'Name (Ascending)' },
        { value: 'Name (Descending)', label: 'Name (Descending)' },
        { value: 'HDD Capacity (Ascending)', label: 'HDD Capacity (Ascending)' },
        { value: 'HDD Capacity (Descending)', label: 'HDD Capacity (Descending)' },
    ],
    BASE_URL: 'http://localhost:3000'
}));

export const clearMocks = () => {
  mockDevicesApi.get.mockClear();
  mockDevicesApi.post.mockClear();
  mockDevicesApi.put.mockClear();
  mockDevicesApi.deleteEndpoint.mockClear();
};

// eslint-disable-next-line react/prop-types
export const AllTheProviders = ({ children }) => (
  <DevicesProvider>
    <ModalProvider>
      {children}
    </ModalProvider>
  </DevicesProvider>
);

export const renderWithProviders = async (ui, options) => {
  let rendered;
  await act(async () => {
    rendered = render(ui, { 
      wrapper: AllTheProviders,
      ...options 
    });
  });
  return rendered;
};