import { Card, Col, Row, Table } from "react-bootstrap";
import { FormProduct } from "../../components/FormProduct";
import { FormSearchProducts } from "../../components/FormSearchProducts";
import { TableItemProduct } from "../../components/TableItemProduct";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/products";

export const ProductsListPage = () => {
  const handleEditProduct = () => {};
  const handleDeleteProduct = () => {};

  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function fetchData() {
            const response = await getProducts();
      setProducts(response.data)
      setloading(false)
    }
    fetchData();
  }, []);


  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Todos los productos</h1>
      </div>
      <Row>
        <Col sm={12} md={4}>
          <FormProduct setProducts={setProducts} products={products} />
        </Col>
        <Col sm={12} md={8}>
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <FormSearchProducts />
                </div>

                <Table striped>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Descuento</th>
                      <th>Marca</th>
                      <th>Sección</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                    
                    loading ?
                    <p>cargando...</p>
                    :
                    products.map((product, index) => (
                      <TableItemProduct
                        key={index + product.name}
                        product={product}
                        handleEditProduct={handleEditProduct}
                        handleDeleteProduct={handleDeleteProduct}
                      />
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
        </Col>
      </Row>
    </>
  );
};
