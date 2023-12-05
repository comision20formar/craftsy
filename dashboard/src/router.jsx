import {createBrowserRouter} from 'react-router-dom'
import App from './App'
import { HomeAdminPage } from './pages/HomeAdminPage'
import { ProductsListPage } from './pages/ProductsListPage'
import { loader as ProductsListLoader } from './pages/loaderProductsListPage'

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
              /*   async lazy() {
                    let {ProductsListPage} = await import('./pages/ProductsListPage')
                    return {
                        loader : ProductsListLoader,
                        Component : ProductsListPage
                    }
                } */
            }
        ]
    }
])