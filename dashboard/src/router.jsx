import {createBrowserRouter} from 'react-router-dom'
import App from './App'
import { HomeAdminPage } from './pages/HomeAdminPage'
import { ProductsListPage } from './pages/ProductList'
import { loader as ProductsListLoader } from './pages/ProductList/loader'

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
                loader : ProductsListLoader
            }
        ]
    }
])