import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Router/Router';

function App({ children }) {
  return (
    <div className='max-w-[1340px] mx-auto'>
      <RouterProvider router={router}>
        {children}
      </RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
