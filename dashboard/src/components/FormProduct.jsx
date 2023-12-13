import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Form,
} from "react-bootstrap";

import PropTypes from 'prop-types'

import { createProduct, getBrands, getSections, updateProduct } from "../services/products";

export const FormProduct = ({setProducts, formValues, setFormValues, products}) => {
  const [data, setData] = useState({
    brands: [],
    sections: [],
    loading: true,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const sections = await getSections();
        const brands = await getBrands();

        if (!sections) throw new Error("Error al traer las secciones");
        if (!brands) throw new Error("Error al traer las marcas");

        if(sections.ok && brands.ok){
          setData({
            ...data,
            sections : sections.data,
            brands : brands.data,
            loading : false
          })
        }

      } catch (error) {
        console.error;
      }
    };
    getData();
  }, []);

  const handleInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name] : target.value
    })
  };

  const handleCleanForm = () => {
    setFormValues({
      id : null,
      name : "",
      price : "",
      discount : "",
      brandId : "",
      sectionId : "",
      description: ""
    })
  }

  const handleSubmitForm = async (event) => { 
    event.preventDefault();
    
    if(formValues.id) {
      
      const result = await updateProduct(formValues, formValues.id)
      
      const productsUpdated = products.map(product => {
          if(product.id === formValues.id){
            product = result.data
          }
          return product
      })

      setProducts(productsUpdated)

    }else {
      const result = await createProduct(formValues);
      setProducts([...products, result.data])
    }
    handleCleanForm()
   
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>{formValues.id ? "Editar" : "Agregar"} Producto</CardTitle>
      </CardHeader>
      <CardBody>
        <Form className="row" onSubmit={handleSubmitForm}>
          <Form.Group className="mb-3 col-12">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="name" onChange={handleInputChange} value={formValues.name}/>
          </Form.Group>
          <Form.Group className="mb-3 col-12 col-md-6">
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" name="price" onChange={handleInputChange} value={formValues.price}/>
          </Form.Group>
          <Form.Group className="mb-3 col-12 col-md-6">
            <Form.Label>Descuento</Form.Label>
            <Form.Control type="number" name="discount" onChange={handleInputChange} value={formValues.discount}/>
          </Form.Group>
          <Form.Group className="mb-3 col-12">
            <Form.Label>Marca</Form.Label>
            <Form.Select className={`form-control`} name="brandId" onChange={handleInputChange} >
              {
              
                data.loading ? (
                  <option hidden defaultValue>
                    Cargando...
                  </option>
                ) : (
                  <>
                    <option hidden defaultValue>
                      Seleccione...
                    </option>
                    {
                    data.brands.map(({ id, name }) => (
                      formValues.brandId == id
                      ?
                      <option key={id} selected value={id}>{name}</option>
                      :
                      <option key={id} value={id}>{name}</option>
                    ))
                    }
                  </>
                )
              }
             
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 col-12">
            <Form.Label>Sección</Form.Label>
            <Form.Select className={`form-control`} name="sectionId" onChange={handleInputChange}>
              <option hidden defaultValue>
                Selecciona la sección...
              </option>
              {data.sections &&
                data.sections.map(({ id, name }) => (
                  formValues.sectionId == id
                  ?
                  <option key={id} selected value={id}>
                    {name}
                  </option>
                  :
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3 col-12">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              className={`form-control`}
              name="description"
              rows={4}
              onChange={handleInputChange}
              value={formValues.description}
              style={{resize:"none"}}
            ></Form.Control>
          </Form.Group>
          <div className="d-flex justify-content-around w-100">
            <Button type="button" variant="outline-secondary" className="mt-5" onClick={handleCleanForm}>
              Cancelar
            </Button>
            <Button type="submit" variant="outline-dark" className="mt-5">
              Guardar
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};
FormProduct.propTypes = {
  formValues : PropTypes.object,
  setFormValues : PropTypes.func,
  products : PropTypes.array,
  setProducts : PropTypes.func
}
