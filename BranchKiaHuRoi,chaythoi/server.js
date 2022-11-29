
const express=require('express');
const dbConnector=require('./models/dbConnect/db');
const exphbs=require('express-handlebars');
const session=require('express-session')
const hbsHelper=require('./models/hbsHelpers/hbsHelper');
const port =3000;
const app=express();
app.engine('hbs',exphbs.engine({
    extname:'hbs',
    defaultLayout:'container.hbs',
    layoutsDir:'views/_layouts',
    helpers:hbsHelper
}))
app.set('view engine', 'hbs')
app.use(express.static(__dirname+ '/public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//session config
const sessionConfig={
    name:'canteen',
    secret:'secretKey',
    cookie:{
        maxAge:1000*60*60*4,
        secure:false,
        httpOnly:true,
    },
    resave:false,
    saveUninitialized:true
}
app.use(session(sessionConfig));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

// //routes module
const signUpRoutes=require('./routers/signUpRoutes')
const signInRoutes=require('./routers/signInRoutes')
const signOutRoutes=require('./routers/signOutRoutes')
const homeRoutes=require('./routers/homeRoutes')
const itemDetailRoutes=require('./routers/itemDetailRoutes')
const getUserInfoRoutes=require('./routers/getUserInfoRoutes')
const importGoodsRoutes=require('./routers/importGoodsRoutes')
const goodsInfoRoutes=require('./routers/goodsInfoRoutes')
const importGoodsHistoryRoutes=require('./routers/importGoodsHistoryRoutes')

const exportGoodsRoutes=require('./routers/exportGoodsRoutes')
const exportGoodsHistoryRoutes=require('./routers/exportGoodsHistoryRoutes')
const searchGoodsRoutes = require('./routers/searchGoodRoutes')
const shoppingCartRoutes = require('./routers/shoppingCartRoutes')
const todayMenuRoutes=require('./routers/todayMenuRoutes')
const inStoreRoutes=require('./routers/inStoreRoutes')
const getAllUsersInfoRoutes=require('./routers/getAllUserInfoRoutes')
const inStockRoutes=require('./routers/inStockRoutes')
const momoPaymentRoutes = require('./routers/momoPaymentRoutes')
// const sign_inRoutes=require('./routes/sign_inRoutes');
// const profileRoutes=require('./routes/profileRoutes');
// const productDetailsRoutes = require('./routes/productDetailsRoutes');

// const addProductRoutes=require('./routes/addNewProductRoutes');
// const getCatRoutes=require('./routes/getCategoryRoutes');
// const delProRoutes=require('./routes/delProductRoutes')
// const updateProRoutes=require('./routes/updateProductRoutes')
// //restrict 
// const auth_Routes=require('./authencation/authRoutes')
// const restrict=require('./authencation/restrictRoutes');
// const restrictRegister=require('./authencation/restrictRegister');
// const restrictForUser = require('./authencation/restrictForUser');
// const restrictForAdmin=require('./authencation/restrictForAdmin');

app.use('/sign-up',signUpRoutes)
app.use('/sign-in',signInRoutes)
app.use('/sign-out',signOutRoutes)
app.use('/home',homeRoutes)
app.use('/get-user-info',getUserInfoRoutes)
app.use('/item-detail',itemDetailRoutes)
app.use('/import-goods',importGoodsRoutes)
app.use('/import-goods-history',importGoodsHistoryRoutes)

app.use('/export-goods',exportGoodsRoutes)
app.use('/export-goods-history',exportGoodsHistoryRoutes)
app.use('/goods-info',goodsInfoRoutes)
app.use('/search-goods',searchGoodsRoutes)
app.use('/shopping-cart', shoppingCartRoutes)
app.use('/today-menu',todayMenuRoutes);
app.use('/in-store',inStoreRoutes)
app.use('/manage-users',getAllUsersInfoRoutes);

app.use('/payment-momo',momoPaymentRoutes)

app.use('/in-stock',inStockRoutes)
app.get('/',(req,res)=>{
   res.redirect('/home');
})
app.use((req,res)=>{
    user={}
    if(req.session.user){
        user=req.session.user
    }
    res.render('errorPage',{message:'404 Page not found',user:user})
})



