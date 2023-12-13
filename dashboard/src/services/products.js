export const getProducts = async () => {
    try {

        const response = await fetch(`${import.meta.env.VITE_API_URL}/apis/products`)
        const result = await response.json();

        return result
        
    } catch (error) {
        console.error
    }
}

export const getSections = async() => {
    try {

        const response = await fetch(`${import.meta.env.VITE_API_URL}/apis/sections`)
        const result = await response.json();

        return result
        
    } catch (error) {
        console.error
    }
}

export const getBrands = async() => {
    try {

        const response = await fetch(`${import.meta.env.VITE_API_URL}/apis/brands`)
        const result = await response.json();

        return result
        
    } catch (error) {
        console.error
    }
}

export const createProduct = async(data) => {
    try {

        const response = await fetch(`${import.meta.env.VITE_API_URL}/apis/products`,{
            method: 'POST',
            body : JSON.stringify(data),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        const result = await response.json();

        return result
        
    } catch (error) {
        console.error
    }
}

export const updateProduct = async(data, id) => {
    try {

        const response = await fetch(`${import.meta.env.VITE_API_URL}/apis/products/${id}`,{
            method: 'PUT',
            body : JSON.stringify(data),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        const result = await response.json();

        return result
        
    } catch (error) {
        console.error
    }
}

export const deleteProduct = async(id) => {
    try {

        const response = await fetch(`${import.meta.env.VITE_API_URL}/apis/products/${id}`,{
            method: 'DELETE'
        })
        const result = await response.json();

        return result
        
    } catch (error) {
        console.error
    }
}