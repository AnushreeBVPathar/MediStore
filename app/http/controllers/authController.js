const bcrypt =require('bcrypt');
const passport = require('passport');
const User = require('../../models/user');
function authController() {
    const _getRedirectUrl = (req) => {
        return req.user.role === 'admin' ? '/admin/orders' : '/customer/orders'
    }

    return {
        login(req,res){
            res.render('auth/login');
        },

        postLogin(req,res,next){
            const { email, password } = req.body;
            //validate request
            if(!email || !password ){
                req.flash('error','Missing Credentials');
                return res.redirect('/login');
            }
            passport.authenticate('local',(err,user,info)=> {
                if(err){
                    req.flash('error',info.message);
                    return next(err)
                }
                if(!user){
                    req.flash('error',info.message);
                    return res.redirect('/login')
                }
                req.logIn(user, () =>{
                    if(err){
                        req.flash('error',info.message);
                        return next(err);
                    }

                    
                    return res.redirect(_getRedirectUrl(req));
                })
            })(req,res,next)
        },

        register(req,res){
            res.render('auth/register');
        },
        async postRegister(req,res){
            const { name, email, password } = req.body;
            //validate request
            if(!name || !email || !password ){
                req.flash('error','All fields are required');
                req.flash('name', name);
                req.flash('email',email);

                return res.redirect('/register');
            }

            //check if email exists
            User.exists({ email :email }, (err, result) =>{
                if(result) {
                 req.flash('error','Email already exist');
                req.flash('name', name);
                req.flash('email',email);
                return res.redirect('/register');
                }
            })

            //hash password
            const hashedPassword = await bcrypt.hash(password,10);


            //create a user
            const user = new User({
                name : name,
                email : email,
                password :hashedPassword
            })

            user.save().then((user) =>{
                //login 

                return res.redirect('/');
            }).catch(err => {
                req.flash('error','Something went wrong');
                return res.redirect('/register');
            })
        },
        logout(req,res){
            req.logout();
            return res.redirect('/login')
        }
    }
}

module.exports = authController;