import '@testing-library/jest-dom';
import { expect, test, describe, jest, beforeEach } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils';
import { ModalManager } from './index';

const mockDeviceToEdit = {
  id: '1',
  system_name: 'Test Device'
};

const mockToggleModal = jest.fn();
const mockDeviceIdToEdit = jest.fn();
const mockRemoveDevice = jest.fn();

jest.mock('../../contexts/DevicesContext', () => ({
  useDevices: () => ({
    deviceIdToEdit: mockDeviceIdToEdit,
    deviceToEdit: mockDeviceToEdit,
    removeDevice: mockRemoveDevice
  })
}));

const mockUseModal = jest.fn();
jest.mock('../../contexts/ModalContext', () => ({
  useModal: () => mockUseModal()
}));

describe('ModalManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Add Device modal', async () => {
    mockUseModal.mockReturnValue({
      isModalOpen: { 'add': true, 'edit': false, 'delete': false },
      toggleModal: mockToggleModal
    });

    await renderWithProviders(<ModalManager />);
    expect(screen.getByText('Add device')).toBeInTheDocument();
  });

  test('renders Edit Device modal', async () => {
    mockUseModal.mockReturnValue({
      isModalOpen: { 'add': false, 'edit': true, 'delete': false },
      toggleModal: mockToggleModal
    });

    await renderWithProviders(<ModalManager />);
    expect(screen.getByText('Edit device')).toBeInTheDocument();
  });

  test('renders Delete Device modal', async () => {
    mockUseModal.mockReturnValue({
      isModalOpen: { 'add': false, 'edit': false, 'delete': true },
      toggleModal: mockToggleModal
    });

    await renderWithProviders(<ModalManager />);
    expect(screen.getByText('Delete device?')).toBeInTheDocument();
  });

  test('handles delete modal actions', async () => {
    mockUseModal.mockReturnValue({
      isModalOpen: { 'add': false, 'edit': false, 'delete': true },
      toggleModal: mockToggleModal
    });

    await renderWithProviders(<ModalManager />);
    await userEvent.click(screen.getByText('Cancel'));
    
    expect(mockToggleModal).toHaveBeenCalledWith('delete');
    expect(mockDeviceIdToEdit).toHaveBeenCalledWith(null);
  });
});