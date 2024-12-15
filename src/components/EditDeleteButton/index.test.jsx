import '@testing-library/jest-dom';
import { expect, test, describe, jest, beforeEach } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils';
import { EditDeleteButton } from './index';
import { DELETE, EDIT } from '../../constants';

const mockToggleModal = jest.fn();

jest.mock('../../contexts/ModalContext', () => ({
  useModal: () => ({
    toggleModal: mockToggleModal
  })
}));

describe('EditDeleteButton', () => {
  beforeEach(() => {
    mockToggleModal.mockClear();
  });

  test('renders with three dots button', async () => {
    await renderWithProviders(<EditDeleteButton deviceId="123" />);
    const button = screen.getByRole('button');
    const icon = screen.getByAltText('three-dots');
    
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  test('shows edit and delete buttons on click', async () => {
    await renderWithProviders(<EditDeleteButton deviceId="123" />);
    const button = screen.getByRole('button');
    
    await userEvent.click(button);
    
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('calls toggleModal with EDIT when edit clicked', async () => {
    await renderWithProviders(<EditDeleteButton deviceId="123" />);
    const button = screen.getByRole('button');
    
    await userEvent.click(button);
    await userEvent.click(screen.getByText('Edit'));
    
    expect(mockToggleModal).toHaveBeenCalledWith(EDIT, "123");
  });

  test('calls toggleModal with DELETE when delete clicked', async () => {
    await renderWithProviders(<EditDeleteButton deviceId="123" />);
    const button = screen.getByRole('button');
    
    await userEvent.click(button);
    await userEvent.click(screen.getByText('Delete'));
    
    expect(mockToggleModal).toHaveBeenCalledWith(DELETE, "123");
  });

  test('handles null deviceId', async () => {
    await renderWithProviders(<EditDeleteButton />);
    const button = screen.getByRole('button');
    
    await userEvent.click(button);
    await userEvent.click(screen.getByText('Edit'));
    
    expect(mockToggleModal).toHaveBeenCalledWith(EDIT, null);
  });
});