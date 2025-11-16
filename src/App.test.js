import { render, screen } from '@testing-library/react';
import SamuraiJsApp from './App';
import { Provider } from 'react-redux';
import store from './redux/redux-store';

test('renders learn react link', () => {
  render(
  <Provider store={store}>
    <SamuraiJsApp />
  </Provider>
    );
  const preloaderImage = screen.getByAltText(/Preloader/i);
  expect(preloaderImage).toBeInTheDocument();
});
