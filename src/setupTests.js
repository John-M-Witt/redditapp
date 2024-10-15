// Mock window.matchMedia
window.matchMedia = jest.fn().mockImplementation((query) => {
  return {
      matches: false, // Default to large screen (768px+)
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
  };
});