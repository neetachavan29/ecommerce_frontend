import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { getProducts, deleteProduct } from "./apiAdmin";
import { useState } from "react";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();
  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title="Manage Products"
      description="Perform on CRUD on products"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total {products.length} products</h2>
          <hr />
          <ul className="list-group">
            {products.map((p, i) => {
              return (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <strong> {p.name} </strong>
                  <Link to={`/admin/product/update/${p._id}`}>
                    <span className="badge badge-warning badge-pill" style={{ backgroundColor: '#ffff00'}}>
                      Update
                    </span>
                  </Link>
                  <span
                    onClick={() => destroy(p._id)}
                    className="badge badge-danger badge-pill"
                    style={{ backgroundColor: '#ff0000' }}
                  >
                    Delete
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
