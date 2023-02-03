import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {
    const purchases = useSelector(state => state.purchases);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPurchasesThunk());
      }, []);

      console.log(purchases );

    return (
        <div>
            <h1>Purchases</h1>
            <ul>
            {purchases?.map(purchase => (
                   <li className='mb-4' key={purchase.id}>
                     <Link to={`/products/${purchase.products.id}`}>
                        <Row>
                            <Col>
                            <img src={purchase.products.image} className="img-fluid" alt="" />
                            </Col>
                            <Col>
                            {purchase.products.title}
                            </Col>
                        </Row>
                        
                       
                    </Link>
                        
                   </li>
                ))    
            }         
            </ul>
            
        </div>
    );
}; 

export default Purchases;