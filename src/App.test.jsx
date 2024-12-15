import '@testing-library/jest-dom';
import { expect, test } from '@jest/globals';
import App from "./App"
import { renderWithProviders } from './test-utils';
import { screen } from '@testing-library/react';

test("Renders the main page", async () => {
    await renderWithProviders(<App />);
    expect(screen.getByTestId('devices-header_title')).toBeInTheDocument();
});
