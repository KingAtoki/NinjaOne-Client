import '@testing-library/jest-dom';
import { expect, test, describe, jest , beforeEach} from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils';
import { AddEditForm } from './index';

const mockAddDevice = jest.fn();
const mockEditDevice = jest.fn();
const mockDeviceIdToEdit = jest.fn();
const mockToggleModal = jest.fn();

jest.mock('../../contexts/DevicesContext', () => ({
  useDevices: () => ({
    deviceToEdit: null,
    deviceIdToEdit: mockDeviceIdToEdit,
    addDevice: mockAddDevice,
    editDevice: mockEditDevice
  })
}));

jest.mock('../../contexts/ModalContext', () => ({
  useModal: () => ({
    isModalOpen: { 'edit': false },
    toggleModal: mockToggleModal
  })
}));

describe('AddEditForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with required fields', async () => {
    await renderWithProviders(<AddEditForm />);
    expect(screen.getByLabelText(/name \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/type \*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hdd capacity \(gb\) \*/i)).toBeInTheDocument();
  });

  test('handles input changes', async () => {
    await renderWithProviders(<AddEditForm />);
    const nameInput = screen.getByLabelText(/name \*/i);
    await userEvent.type(nameInput, 'Test Device');
    expect(nameInput).toHaveValue('Test Device');
  });

  test('submits form with new device', async () => {
    await renderWithProviders(<AddEditForm />);
    
    await userEvent.type(screen.getByLabelText(/name \*/i), 'New Device');
    await userEvent.selectOptions(screen.getByLabelText(/type \*/i), 'Windows workstation');
    await userEvent.type(screen.getByLabelText(/hdd capacity/i), '250');
    
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockAddDevice).toHaveBeenCalledWith({
      system_name: 'New Device',
      type: 'Windows workstation',
      hdd_capacity: '250'
    });
  });

  test('resets form on cancel', async () => {
    await renderWithProviders(<AddEditForm />);
    
    await userEvent.type(screen.getByLabelText(/name \*/i), 'Test');
    await userEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(screen.getByLabelText(/name \*/i)).toHaveValue('');
    expect(mockDeviceIdToEdit).toHaveBeenCalledWith(null);
    expect(mockToggleModal).toHaveBeenCalled();
  });
});

describe('AddEditForm Validation', () => {
  test('shows validation errors when submitting empty form', async () => {
    await renderWithProviders(<AddEditForm />);
    
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));

    const nameWrapper = screen.getByLabelText(/name \*/i).closest('.input-wrapper');
    const typeWrapper = screen.getByLabelText(/type \*/i).closest('.input-wrapper');
    const hddWrapper = screen.getByLabelText(/hdd capacity/i).closest('.input-wrapper');

    expect(nameWrapper).toHaveClass('invalid');
    expect(typeWrapper).toHaveClass('invalid');
    expect(hddWrapper).toHaveClass('invalid');
    expect(mockAddDevice).not.toHaveBeenCalled();
  });

  test('shows error for invalid HDD capacity', async () => {
    await renderWithProviders(<AddEditForm />);
    
    await userEvent.type(screen.getByLabelText(/name \*/i), 'Test Device');
    await userEvent.selectOptions(screen.getByLabelText(/type \*/i), 'Windows workstation');
    await userEvent.type(screen.getByLabelText(/hdd capacity/i), '-50');
    
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    const hddWrapper = screen.getByLabelText(/hdd capacity/i).closest('.input-wrapper');
    expect(hddWrapper).toHaveClass('invalid');
    expect(mockAddDevice).not.toHaveBeenCalled();
  });

  test('allows submission after fixing validation errors', async () => {
    await renderWithProviders(<AddEditForm />);
    
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(mockAddDevice).not.toHaveBeenCalled();
    
    await userEvent.type(screen.getByLabelText(/name \*/i), 'Test Device');
    await userEvent.selectOptions(screen.getByLabelText(/type \*/i), 'Windows workstation');
    await userEvent.type(screen.getByLabelText(/hdd capacity/i), '100');
    
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockAddDevice).toHaveBeenCalledWith({
      system_name: 'Test Device',
      type: 'Windows workstation', 
      hdd_capacity: '100'
    });
  });

  test('clears validation errors on form reset', async () => {
    await renderWithProviders(<AddEditForm />);
    
    await userEvent.click(screen.getByRole('button', { name: /submit/i }));
    const nameWrapper = screen.getByLabelText(/name \*/i).closest('.input-wrapper');
    expect(nameWrapper).toHaveClass('invalid');
    
    await userEvent.click(screen.getByRole('button', { name: /cancel/i }));
    
    expect(nameWrapper).not.toHaveClass('invalid');
    expect(screen.getByLabelText(/type \*/i).closest('.input-wrapper')).not.toHaveClass('invalid');
    expect(screen.getByLabelText(/hdd capacity/i).closest('.input-wrapper')).not.toHaveClass('invalid');
  });
});