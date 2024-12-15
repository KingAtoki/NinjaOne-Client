import '@testing-library/jest-dom'
import { expect, test, describe, jest, beforeEach } from '@jest/globals';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils';
import { DevicesTable } from './index';

const mockDevices = [
  { 
    id: '1',
    system_name: "Windows Device",
    type: "Windows workstation",
    hdd_capacity: '250'
  },
  {
    id: '2',
    system_name: "Mac Device",
    type: "Mac workstation",
    hdd_capacity: '500'
  }
];

const mockUseDevices = jest.fn();

jest.mock('../../contexts/DevicesContext', () => ({
  useDevices: () => mockUseDevices()
}));

describe('DevicesTable', () => {
  beforeEach(() => {
    mockUseDevices.mockReturnValue({
      devices: mockDevices,
      formattedDevicesList: mockDevices
    });
  });

  test('renders table header', async () => {
    await renderWithProviders(<DevicesTable />);
    expect(screen.getByText('Device')).toBeInTheDocument();
  });

  test('renders devices list', async () => {
    await renderWithProviders(<DevicesTable />);
    expect(screen.getByText('Windows Device')).toBeInTheDocument();
    expect(screen.getByText('Mac Device')).toBeInTheDocument();
  });

  test('shows device details', async () => {
    await renderWithProviders(<DevicesTable />);
    expect(screen.getByText('Windows workstation - 250 GB')).toBeInTheDocument();
    expect(screen.getByText('Mac workstation - 500 GB')).toBeInTheDocument();
  });

  test('shows EditDeleteButton on row hover', async () => {
    await renderWithProviders(<DevicesTable />);
    const row = screen.getByText('Windows Device').closest('.device-table_row');
    
    await userEvent.hover(row);
    await waitFor(() => 
      expect(screen.getByTestId('edit-delete-button')).toBeInTheDocument()
    );
  });

  test('shows no matches message when filtered list is empty', async () => {
    mockUseDevices.mockReturnValue({
      devices: mockDevices,
      formattedDevicesList: []
    });
    
    await renderWithProviders(<DevicesTable />);
    await waitFor(() => 
      expect(screen.getByText('No devices match the selected filters.')).toBeInTheDocument()
    );
  });

  test('renders correct OS icon for device type', async () => {
    await renderWithProviders(<DevicesTable />);
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('alt', 'Windows workstation');
    expect(images[1]).toHaveAttribute('alt', 'Mac workstation');
  });

  test('displays no devices message when devices array is empty', async () => {
    mockUseDevices.mockReturnValue({
      devices: [],
      formattedDevicesList: [],
    });

    await renderWithProviders(<DevicesTable />);
    
    expect(screen.getByText('No devices.')).toBeInTheDocument();
  });
});