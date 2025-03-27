import express from 'express';
import users from './users';
import auth from './auth';
import categories from './categories';
import discounts from './discounts';
import products from './products';
import sessions from './sessions';
import shipment from './shipment';
import cartItem from './cartItem';
import payments from './payments';
import orders from './orders';

const router = express.Router();

export default (): express.Router => {
    users(router);
    auth(router);
    categories(router);
    discounts(router);
    products(router);
    sessions(router);
    shipment(router);
    cartItem(router);
    payments(router);
    orders(router);
    
    return router;
}