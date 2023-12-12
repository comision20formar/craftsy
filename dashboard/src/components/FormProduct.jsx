import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Form,
} from "react-bootstrap";
import { createProduct, getBrands, getSections } from "../services/products";

export const FormProduct = ({setProducts, products}) => {
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

  const [formValues, setFormValues] = useState({
    name : "",
    price : "",
    discount : "",
    brandId : "",
    sectionId : "",
    description: ""
  });

  const handleInputChange = ({target}) => {
    setFormValues({
      ...formValues,
      [target.name] : target.value
    })
  };

  const handleSubmitForm = async (event) => { 
    event.preventDefault();
    const result = await createProduct(formValues);
    
    setProducts([...products, result.data])
   
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Agregar Producto</CardTitle>
      </CardHeader>
      <CardBody>
        <Form className="row" onSubmit={handleSubmitForm}>
          <Form.Group className="mb-3 col-12">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="name" onChange={handleInputChange}/>
          </Form.Group>
          <Form.Group className="mb-3 col-12 col-md-6">
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" name="price" onChange={handleInputChange}/>
          </Form.Group>
          <Form.Group className="mb-3 col-12 col-md-6">
            <Form.Label>Descuento</Form.Label>
            <Form.Control type="number" name="discount" onChange={handleInputChange}/>
          </Form.Group>
          <Form.Group className="mb-3 col-12">
            <Form.Label>Marca</Form.Label>
            <Form.Select className={`form-control`} name="brandId" onChange={handleInputChange}>
              {data.loading ? (
                <option hidden defaultValue>
                  Cargando...
                </option>
              ) : (
                <>
                  <option hidden defaultValue>
                    Seleccione...
                  </option>
                  {
                  data.brands.map(({ id, name }) => <option key={id} value={id}>{name}</option>)
                  }
                </>
              )}
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
              rows={3}
              onChange={handleInputChange}
            ></Form.Control>
          </Form.Group>
          <div className="d-flex justify-content-around w-100">
            <Button type="button" variant="outline-secondary" className="mt-5">
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
