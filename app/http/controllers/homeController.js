const Product = require('../../models/product');
const Menu = require('../../models/product')

function homeController() {
    return {
        async index(req,res){
                const medicines = await Product.find()

                return res.render('home',{medicines:medicines});
            // Product.find().then(function(medicines){
            //     console.log(medicines);
            //     res.render('home',{medicines:medicines});
            // });
            
        }
    }
}

module.exports = homeController;