const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const homeController=require('../app/http/controllers/homeController');

function initRoutes(app) {
    app.get('/',homeController().index);
    //this homeControllers() function will give the same responce
    //ie
    //(req,res) =>{
    // res.render('home')
    // }
    
    app.get('/login',authController().login);
    
    app.get('/register',authController().register);

    app.get('/cart',cartController().index);
    app.post('/update-cart',cartController().update);
}

module.exports = initRoutes;