const CryptoJS = require('crypto-js')
const config = require('../config.json')
const moment = require('moment')
const axios = require('axios')
const Ngrok = require('./ngrok')



let uid = Date.now();
class ZaloPay {
    constructor() {
        // Ngrok.GetPublicURL().then(publicURL => {
        //     console.log('[public URL: ]', publicURL)
        //     this.publicURL = publicURL
        // })
    }
    NewOrder({ amount, description }) {
        let appTransID = `${moment().format('YYMMDD')}_${++uid}`
        return {
            amount: amount,
            app_id: config.appid,
            app_trans_id: appTransID,
            app_user: '0938549163',
            app_time: Date.now(),
            item: JSON.stringify([{ "itemid": "knb", "itename": "kim nguyen bao", "itemprice": 198400, "itemquantity": 1 }]),
            embed_data: JSON.stringify({ "promotioninfo": "", "merchantinfo": "du lieu rieng cua ung dung" }),
            bank_code: 'zalopayapp',
            description: description + appTransID,

        }
    }
    async CreateOrder(params = {}) {
        const order = this.NewOrder(params)
        let data = order.app_id + "|" + order.app_trans_id + "|"
            + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item

        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString()

        // console.log(data)
        // axios.post()
        const { data: result } = await axios.post(config.api.createorder, null, {
            params: order
        });



        return result

    }
    VerifyCallback(data, requestMac) {
        const result = {};
        const mac = CryptoJS.HmacSHA256(data, config.key2).toString();

        if (mac !== requestMac) {
            result.return_code = -1;
            result.return_message = "mac not equal";
        } else {
            result.return_code = 1;
            result.return_message = "success";
        }

        return result;
    }
}

module.exports = new ZaloPay()

