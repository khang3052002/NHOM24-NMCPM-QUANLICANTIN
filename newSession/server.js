
const express=require('express');
const port =3000;
const app=express();
const exphbs=require('express-handlebars');
const session=require('express-session')
//routes module
const mainRoutes=require('./routes/homeRoutes');
const sign_inRoutes=require('./routes/sign_inRoutes');
const auth_Routes=require('./authencation/authRoutes')
const restrict=require('./authencation/restrictRoutes');
const profileRoutes=require('./routes/profileRoutes');
const productsRoutes = require('./routes/productsRoutes');
const restrictForUser = require('./authencation/restrictForUser');
const restrictForAdmin=require('./authencation/restrictForAdmin')
const stocksRoutes=require('./routes/stockRoutes');

//session config
const sessionConfig={
    name:'canteen',
    secret:'secretKey',
    cookie:{
        maxAge:100*60*60,
        secure:false,
        httpOnly:true,
    },
    resave:false,
    saveUnitialized:true
}
app.use(session(sessionConfig));
//hbs engine config
app.engine('hbs',exphbs.engine({
    extname:'hbs',
    defaultLayout:'container.hbs',
    layoutsDir:'views/_layouts'
}))
app.set('view engine', 'hbs')
app.use(express.static(__dirname+ '/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.redirect('/home')
});
app.use('/home',mainRoutes);
app.use('/sign_in',sign_inRoutes);
app.use('/auth',auth_Routes)
app.use('/profile',restrict,profileRoutes);
app.use('/logout',auth_Routes)
app.use('/products',restrictForUser,productsRoutes);
app.use('/stocks',restrictForAdmin,stocksRoutes);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
