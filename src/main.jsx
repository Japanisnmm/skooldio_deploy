import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { MenProduct, WomenProduct, KidsProduct, ShoesProduct, Accessories } from './pages';
import PageProductDetail from './components/productDetails/PageProductDetail';
import ShoppingCart from './components/productCarts/ShoppingCart';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/men-product",
    element: <MenProduct/>,
  },
  {
    path: "/women-product",
    element: <WomenProduct/>,
  },
  {
    path: "/kids-product",
    element: <KidsProduct/>,
  },
  {
    path: "/shoes-product",
    element: <ShoesProduct/>,
  },
  {
    path: "/accessories-product",
    element: <Accessories/>,
  },
  {
    path: "/product-detail/:permalink",
    element: <PageProductDetail/>,
  },
  {
    path: "/cart",
    element: <ShoppingCart/>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
