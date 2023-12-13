import {createBrowserRouter} from 'react-router-dom'
import App from './App'
import { HomeAdminPage } from './pages/HomeAdminPage'
import { ProductsListPage } from './pages/ProductList'

export const router = createBrowserRouter([
    {
        path: '/',
        element :<App/>,
        children : [
            {
                index : true,
                element : <HomeAdminPage/>
            },
            {
                path : 'products',
                element: <ProductsListPage/>,
            }
        ]
    }
])