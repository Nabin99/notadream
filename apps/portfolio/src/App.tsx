import { RouterProvider } from 'react-router-dom';

import { browserRouter } from './Routes';
import { ReactRouterAdapter } from './routing-adapter';
import { useRotateCSSColorValue } from './utils';

import '@notadream/react/dist/index.css';
import './assets/css/index.css';

function App() {
  useRotateCSSColorValue();

  return (
    <ReactRouterAdapter>
      <RouterProvider router={browserRouter} />
    </ReactRouterAdapter>
  );
}

export default App;
