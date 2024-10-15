import React from 'react'; 
import { Header } from './Header.jsx';
import { render, screen, waitFor, act, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux'; 
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import store from '../../app/store.js';

beforeEach(() => {
    jest.clearAllMocks();

    // Mock window.matchMedia globally
    window.matchMedia = jest.fn().mockImplementation((query) => {
        return {
            matches: false,  // Default to large screen (768px+)
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        };
    });
});

afterEach(() => {
    cleanup();
});


it('Renders the header element', () => {
    render(
        <Provider store = {store}>
            <Header />
        </Provider>
    );
    const header = screen.getByRole('banner');
    expect(header).toBeVisible();
});

it('Displays the app title', () => {
    render(
        <Provider store={store}>
            <Header />
        </Provider>
    );
    const appTitle = screen.getByRole('heading', {name: 'Reddit Jr.', level: 1});
    expect(appTitle).toHaveTextContent('Reddit Jr.');
    expect(appTitle).toBeInTheDocument();
    expect(appTitle).toBeVisible();
})

it('Renders the app icon', ()=> {
    render(
        <Provider store={store}>
            <Header />      
        </Provider> 
    );

    const icon =  screen.getByAltText('Subreddit icon');
    expect(icon).toBeVisible();
});

it('Renders search box with correct placeholder and responds to typing', async () => {
    render (
        <Provider store= {store}>
            <Header />
        </Provider>
    );
    const searchInput = screen.getByPlaceholderText(/search/i);
    
    expect(searchInput).toBeVisible();
    expect(searchInput).toHaveAttribute('placeholder', 'Search');
    
    await userEvent.type(searchInput, 'Halloween movies');
    
    await waitFor(() => {
        expect(searchInput.value).toBe('Halloween movies');
    });
});

it('Renders an "X" search delete icon only when a user inputs 3+ characters into the search box and clicking it clears search form', async () => {
    render (
        <Provider store={store}>
            <Header />
        </Provider>
    );

    const searchInput = screen.getByPlaceholderText(/search/i);
    expect(screen.queryByAltText(/clear search icon/i)).not.toBeInTheDocument();

     
    await userEvent.type(searchInput,"Hal");
        
    expect(searchInput.value).toBe("Hal");

    const clearIcon = screen.getByAltText(/clear search icon/i)
    expect(clearIcon).toBeVisible();

    const clearButton = screen.getByTestId("clear-search-button");
    
    userEvent.click(clearButton);
    
      
    await(waitFor(() => {
        expect(searchInput.value).toBe("");
    }));
});


describe('Header component with Media Query', () => {
    const windowResize = (width) => {
        window.innerWidth = width;
        window.dispatchEvent(new Event('resize'));
       }    

    // Ensure window.matchMedia is properly mocked
    window.matchMedia = jest.fn().mockImplementation((query) => {
        return {
            matches: false,  // Default to large screen (768px+)
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        };
    });
    
    it('Does not render the communities button for screen sizes > 768px', () => {
        render (
            <Provider store={store}>
                <Header/>
            </Provider>
        );

        // Simulate large screen size (above 768px)
        windowResize(1000);

        const communitiesButton = screen.queryByRole('button', {name: 'Communities'});
        expect(communitiesButton).toBeNull();
    });

    it('Renders the communities button for screen sizes <=768px ', async () => {
        window.matchMedia = jest.fn().mockImplementation(query => ({
            matches: true,  // Simulate small screen
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        }));
        
        render(
            <Provider store={store}>
                <Header/>
            </Provider>
        );
        
        windowResize(700);
        
        const communitiesButton = await screen.findByRole('button', {name: 'Communities'});

        expect(communitiesButton).toBeVisible();
        expect(communitiesButton).toBeEnabled();
    });
});
