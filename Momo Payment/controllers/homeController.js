const CryptoJS = require('crypto-js')
const config = require('../config.json')
const moment = require('moment')
const axios = require('axios')

const ZaloPay = require('../Zalo pay/ZaloPay')
const Momo = require('../Momo/Momo')
let uid = Date.now()
const getIndex = (req, res) => {
    res.render('home',{result: false,show: false});
}


const receive = async (req, res) => {
    const val = req.body.value
    const name = req.body.name
    var result = ""
    if (name == 'Zalo')
    {
        result = await ZaloPay.CreateOrder({amount: val, description: 'hahaahah'})

    }else{
        result = await Momo.CreateOrder({amount:val,description:'hahahahhaakjhk'})
    }

    // console.log(result)

    res.send(result)
    // console.log(val,name)
    // let appTransID = `${moment().format('YYMMDD')}_${++uid}`


    // const order = {
    //     amount: val,
    //     app_id: config.appid,
    //     app_trans_id: appTransID,
    //     app_user: '0938549163',
    //     app_time: Date.now(),
    //     item: JSON.stringify([{ "itemid": "knb", "itename": "kim nguyen bao", "itemprice": 198400, "itemquantity": 1 }]),
    //     embed_data: JSON.stringify({ "promotioninfo": "", "merchantinfo": "du lieu rieng cua ung dung" }),
    //     bank_code: 'zalopayapp',
    //     description: 'Lazada - Thanh toán đơn hàng' + appTransID,
    // }

    // // console.log(typeof order.app_id)
    // // console.log(order.app_trans_id)
    // let data = order.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item

    // order.mac = CryptoJS.HmacSHA256(data, config.key1).toString()

    // // console.log(data)
    // // axios.post()
    // const { data: result } = await axios.post(config.api.createorder, null, {
    //     params: order
    // });


    // res.send(result)


    // console.log(result)


    // const orderJSON = JSON.stringify(order);
    // const b64Order = Buffer.from(orderJSON).toString('base64');
    // console.log(config.api.qr + encodeURIComponent(b64Order))

    // console.log(data)

    // console.log(order.mac)

    // console.log(data)
    // console.log(val)
}

const callback = async(req,res)=> {
    console.log('da vao call back')
    // console.log(req.query)
    try {
        const rs = await Momo.VerifyCallback(req.query)
        // console.log(rs)
    } catch (error) {
        console.log(error)
    }
    res.render('home')
}
module.exports = {
    getIndex, receive,callback
}