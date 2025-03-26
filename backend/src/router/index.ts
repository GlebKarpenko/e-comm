import express from 'express';
import users from './users';
import auth from './auth';
import categories from './categories';
import discounts from './discounts';
import products from './products';

const router = express.Router();

export default (): express.Router => {
    users(router);
    auth(router);
    categories(router);
    discounts(router);
    products(router);
    
    return router;
}