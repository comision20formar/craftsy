import { getProducts } from "../../services/products"

export const loader = async () => {
    try {

        const response = await getProducts();

        if(!response) throw new Error("Error al traer los productos")

        return response.data
        
    } catch (error) {
        console.error
    }
}