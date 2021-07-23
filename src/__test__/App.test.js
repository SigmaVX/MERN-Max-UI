import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/MERN-Max/i);
  expect(linkElement).toBeInTheDocument();
});
