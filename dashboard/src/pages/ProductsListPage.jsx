import { Card, Col, Row, Table } from "react-bootstrap";
import { FormProduct } from "../components/FormProduct";
import { FormSearchProducts } from "../components/FormSearchProducts";
import { TableItemProduct } from "../components/TableItemProduct";
import { useLoaderData } from "react-router-dom";

export const ProductsListPage = () => {
  const handleEditProduct = () => {};
  const handleDeleteProduct = () => {};

  const products = useLoaderData();

  console.log(products);

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Todos los productos</h1>
      </div>
      <Row>
        <Col sm={12} md={4}>
          <FormProduct />
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
                    {products.map((product, index) => (
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
