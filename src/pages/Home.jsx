import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  filterProductCategoryThunk,
  filterProductTitleThunk,
  getProductsThunk,
} from "../store/slices/products.slice";

const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const [productSearch, setProductSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductsThunk());

    axios
      .get("https://e-commerce-api-v2.academlo.tech/api/v1/categories/")
      .then(res => setCategories(res.data));
  }, []);
  console.log(categories);
  return (
    <div className="container">
      <Row>
        {/**Categories */}
        <Col lg={3}>
          <ListGroup>   

            {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => dispatch(filterProductCategoryThunk(category.id))}
            >
              {category.name}
            </button>
          ))
          }

          </ListGroup>
          
        </Col>

            {/**Products */}

        <Col lg={9}>
          <h1>Home</h1>

          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
            />
            <Button
              onClick={() => dispatch(filterProductTitleThunk(productSearch))}
              variant="outline-secondary"
              id="button-addon2"
            >
              Search
            </Button>
          </InputGroup>

          {productList.map((products) => (
            <li
              key={products.id}
              onClick={() => navigate(`/products/${products.id}`)} 
            >
              <img
                src={products.images?.[0].url}
                alt=""
                style={{ width: 300 }}
              />
              <br />
                {products.title}
            </li>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Home;