import '@testing-library/jest-dom';
import { expect, test, describe, jest, beforeEach } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils';
import { FooterActions } from './index';

const mockOnCancel = jest.fn();
const mockOnContinue = jest.fn();

jest.mock('../../contexts/ModalContext', () => ({
  useModal: () => ({
    isModalOpen: { 'delete': false }
  })
}));

describe('FooterActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders cancel and submit buttons by default', async () => {
    await renderWithProviders(
      <FooterActions onCancel={mockOnCancel} onContinue={mockOnContinue} />
    );
    
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('calls handlers when buttons clicked', async () => {
    await renderWithProviders(
      <FooterActions onCancel={mockOnCancel} onContinue={mockOnContinue} />
    );
    
    await userEvent.click(screen.getByText('Cancel'));
    await userEvent.click(screen.getByText('Submit'));

    expect(mockOnCancel).toHaveBeenCalled();
    expect(mockOnContinue).toHaveBeenCalled();
  });

  test('submit button has correct base classes', async () => {
    await renderWithProviders(
      <FooterActions onCancel={mockOnCancel} onContinue={mockOnContinue} />
    );
    
    const submitButton = screen.getByText('Submit');
    expect(submitButton).toHaveClass('continue-button');
    expect(submitButton).not.toHaveClass('isDelete');
  });
});