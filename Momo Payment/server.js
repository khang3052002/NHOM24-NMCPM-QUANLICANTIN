const express = require('express')
const app = express()

const exphbs = require("express-handlebars");
const port = 3000
const fs = require('fs')
const bodyParser = require('body-parser')
const path = require('path')


app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: 'container.hbs'

}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'public/views'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const homeRouter = require('./routers/home.r');
const ZaloPay = require('./Zalo pay/ZaloPay');
const Momo = require('./Momo/Momo');
const { resourceLimits } = require('worker_threads');



var data = ''
var arr = []
app.post('/callback', (req, res) => {
    // const { data: dataStr, mac } = req.body;

    if(Object.keys(data).length !==0)
    {
        arr.push(data)
    }
    if(Object.keys(req.body).length !== 0)
    {

        // NƠI LƯU KQ THANH TOÁN VÀO DATABASE
        data = req.body
        // res.send(data)
        console.log(data)
        
        console.log('da send')
        // data = ''
        // console.log(data)
    }
    console.log('arr: ',arr)
    res.send(data)
   
    // const result = ZaloPay.VerifyCallback(req.body)

    // if (result.returncode !== -1) {
    //     // const data = JSON.parse(dataStr);
    //     // const { apptransid } = data;
    //     // hub.get(apptransid).send(dataStr);
    //     // OrderRespository.SaveOrder(data);
    // }
    // if(data.resultCode == 0 )
    // {
    //     console.log('THANH CONG ROI NE')
    //     console.log(data.resultCode)
    //     res.render('home',{result: true,show:true})
    // }
    // else{
    //     res.render('home',{result: false,show:true})
    // }
    // var empty = req.body
    // console.log(req.body)
    // console.log(abc)
    
    
});
// data= ''
// app.post('/momo',(req,res)=>{
//     console.log(req.query)
//     const result = Momo.VerifyCallback(req.query)
//     console.log(result)
// })

app.use('/', homeRouter)
app.listen(port)