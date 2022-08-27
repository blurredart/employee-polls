import React from 'react'
import { render } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import authReducer from '../reducers/authReducer'
import { questionsReducer } from '../reducers/questionsReducer'
import { usersReducer } from '../reducers/usersReducer'

export function renderWithProviders(
    ui,
    {
        intialEntries = ["/"],
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = configureStore({
            reducer: {
                auth: authReducer,
                users: usersReducer,
                questions: questionsReducer
            }, preloadedState
        }),
        ...renderOptions
    } = {}
)
{
    function Wrapper({ children })
    {
        return <Provider store={store}>
            <Router initialEntries={intialEntries}>
                {children}
            </Router>
        </Provider>
    }
    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}