
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { filterProductCategoryThunk } from '../store/slices/products.slice';

const ProductsDetails = () => {

    const {id} = useParams()
    const [products, setProducts] = useState({})
    const productsSuggested = useSelector(state => state.products)

    const allProducts = useSelector(state => state.products)
    const productsFiltered = allProducts.filter((products) => products.id !== Number(id));

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
            .then(res => {
                setProducts(res.data) 
                dispatch(filterProductCategoryThunk(res.data.category.id))
        })
    }, [ id ])

    useEffect(() => {
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
            .then(res => {
                setProducts(res.data) 
                dispatch(filterProductCategoryThunk(res.data.category.id))
        })
    }, [ id ])


    useEffect(() => {
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`)
            .then(res => {
                setProducts(res.data) 
                dispatch(filterProductCategoryThunk(res.data.category.id))
        })
    }, [ id ])

    

    
    const [rate, setRate] = useState("")
    const addToPurchases = () => alert(rate)
    
    return (
        <div>
            <h1>{products.title}</h1>
            <p>{products.description}</p>
            <p>{products.updatedAt}</p>
            <input type="text" value={rate} onChange={e => setRate(e.target.value)}/>
            <button onClick={() => addToPurchases()}>
                Add to cart
            </button>
            {
                productsSuggested.map(productItem => (
                    <li key={productItem.id} 
                        onClick={() => navigate(`/products/${productItem.id}`)}>
                        {productItem.title}
                    </li>
                ))
            }
            <img src={products.images?.[0].url} alt="" />
            <p>Mostrando id <b>{id}</b></p>
        </div>
    );
};

export default ProductsDetails;

