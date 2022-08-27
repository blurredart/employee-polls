import Login from '../../components/Login.js'
import { cleanup, screen } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from '../../store'
import { MemoryRouter as Router } from "react-router-dom";
import App from '../../components/App.js';
import { renderWithProviders } from '../../utils/test-utils.js';
import '@testing-library/jest-dom'

describe('Login page is shown for our app for supported URLs', () =>
{
    afterEach(() =>
    {
        cleanup();
    })
    it('tests at URL /', async () =>
    {
        let render = renderWithProviders(<App />, { intialEntries: ["/"] });
        expect(await screen.findByText(/Login/i)).toBeInTheDocument()
        expect(render).toMatchSnapshot();
    })

    it('tests at URL /add', async () =>
    {
        renderWithProviders(<App />, { intialEntries: ["/add"] });
        expect(await screen.findByText(/Login/i)).toBeInTheDocument()
    })

    it('tests at URL /leaderbaord', async () =>
    {
        renderWithProviders(<App />, { intialEntries: ["/leaderboard"] });
        expect(await screen.findByText(/Login/i)).toBeInTheDocument()
    })
})

describe('404 page is shown for unsupported URLs', () =>
{
    afterEach(() =>
    {
        cleanup();
    })

    it('tests at URL /signin', async () =>
    {
        renderWithProviders(<App />, { intialEntries: ["/signin"] });
        expect(await screen.findByRole('img')).toBeInTheDocument()
    })

    it('tests at URL /404', async () =>
    {
        renderWithProviders(<App />, { intialEntries: ["/404"] });
        expect(await screen.findByRole('img')).toBeInTheDocument()
    })
})