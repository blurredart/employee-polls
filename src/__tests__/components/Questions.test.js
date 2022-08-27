import Login from '../../components/Login.js'
import { fireEvent, screen } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from '../../store'
import { MemoryRouter as Router } from "react-router-dom";
import App from '../../components/App.js';
import { renderWithProviders } from '../../utils/test-utils.js';
import '@testing-library/jest-dom'

test('Questions shown after login', async () =>
{
    let component = renderWithProviders(<App />);
    expect(await screen.findAllByRole('option')).toHaveLength(4);
    expect(await screen.findByText(/Login/i)).toBeInTheDocument()
    await new Promise((res, rej) => { setTimeout(() => res(), 100) })
    fireEvent.click(screen.getByRole('button'))
    screen.debug();
    expect(await screen.findByRole('tab', { selected: true })).toBeInTheDocument()
    expect(await screen.findAllByRole('tab')).toHaveLength(2);
})