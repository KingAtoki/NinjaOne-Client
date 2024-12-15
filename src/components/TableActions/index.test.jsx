import '@testing-library/jest-dom'
import { expect, test, describe, jest } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils';
import { TableActions } from './index';
import { NAME_ASC, NAME_DESC, CAPACITY_ASC, CAPACITY_DESC } from '../../constants';

const mockDevices = [
    { system_name: "Device A", type: "Windows workstation", hdd_capacity: '100' },
    { system_name: "Device B", type: "Mac workstation", hdd_capacity: '200' },
    { system_name: "Device C", type: "Linux workstation", hdd_capacity: '50' }
];

jest.mock('../../contexts/DevicesContext', () => ({
    useDevices: () => ({
        formatDevices: jest.fn(),
        devices: mockDevices
    })
}));

describe('TableActions Component', () => {
    test('renders all controls', async () => {
        await renderWithProviders(<TableActions />);

        expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
        expect(screen.getByText('Device Type:')).toBeInTheDocument();
        expect(screen.getByText('Sort By:')).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    test('search filter updates on input', async () => {
        await renderWithProviders(<TableActions />);
        const searchInput = screen.getByPlaceholderText('Search');

        await userEvent.type(searchInput, 'Device');
        expect(searchInput).toHaveValue('Device');
    });

    test('device type filter changes on selection', async () => {
        await renderWithProviders(<TableActions />);
        const deviceTypeSelect = screen.getByText('Device Type:').nextElementSibling;

        await userEvent.selectOptions(deviceTypeSelect, 'Windows workstation');
        expect(deviceTypeSelect).toHaveValue('Windows workstation');
    });

    test('sort method changes on selection', async () => {
        await renderWithProviders(<TableActions />);
        const sortSelect = screen.getByText('Sort By:').nextElementSibling;

        await userEvent.selectOptions(sortSelect, NAME_DESC);
        expect(sortSelect).toHaveValue(NAME_DESC);
    });

    test('refresh button resets all filters', async () => {
        await renderWithProviders(<TableActions />);
        const searchInput = screen.getByPlaceholderText('Search');
        const deviceTypeSelect = screen.getByText('Device Type:').nextElementSibling;
        const sortSelect = screen.getByText('Sort By:').nextElementSibling;
        const refreshButton = screen.getByRole('button');

        await userEvent.type(searchInput, 'Device');
        await userEvent.selectOptions(deviceTypeSelect, 'Windows workstation');
        await userEvent.selectOptions(sortSelect, CAPACITY_DESC);

        await userEvent.click(refreshButton);

        expect(searchInput).toHaveValue('');
        expect(deviceTypeSelect).toHaveValue('');
        expect(sortSelect).toHaveValue(NAME_ASC);
    });

    test('handles combined filtering and sorting', async () => {
        await renderWithProviders(<TableActions />);
        const searchInput = screen.getByPlaceholderText('Search');
        const deviceTypeSelect = screen.getByText('Device Type:').nextElementSibling;
        const sortSelect = screen.getByText('Sort By:').nextElementSibling;

        await userEvent.type(searchInput, 'Device');
        await userEvent.selectOptions(deviceTypeSelect, 'Windows workstation');
        await userEvent.selectOptions(sortSelect, CAPACITY_ASC);

        expect(searchInput).toHaveValue('Device');
        expect(deviceTypeSelect).toHaveValue('Windows workstation');
        expect(sortSelect).toHaveValue(CAPACITY_ASC);
    });
});