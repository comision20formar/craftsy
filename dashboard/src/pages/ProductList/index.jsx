import { Col, Row } from "react-bootstrap";
import { FormProduct } from "../../components/FormProduct";

import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../../services/products";
import { TableProducts } from "../../components/TableProducts";

export const ProductsListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(true);

  const [formValues, setFormValues] = useState({
    id: null,
    name: "",
    price: "",
    discount: "",
    brandId: "",
    sectionId: "",
    description: "",
  });

  const handleEditProduct = (idProduct) => {
    const { id, name, price, discount, brandId, sectionId, description } =
      products.find((product) => product.id === idProduct);
    setFormValues({
      id,
      name,
      price,
      discount,
      brandId,
      sectionId,
      description,
    });
  };
  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    const productsFiltered = products.filter((product) => product.id !== id);

    setProducts(productsFiltered);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getProducts();
      setProducts(response.data);
      setloading(false);
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
          <FormProduct
            setProducts={setProducts}
            products={products}
            formValues={formValues}
            setFormValues={setFormValues}
          />
        </Col>
        <Col sm={12} md={8}>
          <TableProducts
            itemsPerPage={7}
            loading={loading}
            products={products}
            handleDeleteProduct={handleDeleteProduct}
            handleEditProduct={handleEditProduct}
          />
        </Col>
      </Row>
    </>
  );
};
