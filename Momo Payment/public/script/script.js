$('#Zalo').on('click', function (e) {
    e.preventDefault();

    const value = parseInt($('#input').val())
    // const

    $.ajax({
        type: 'post',
        url: `/`,
        data: { value: value, name: 'Zalo' },
        success: function (data) {
            console.log(data)
            const order_url = data.order_url

            console.log(order_url)
            window.open(order_url)
        }
    })
})


function CreateOrder(params = {}) {
    return $.ajax({
        type: 'post',
        url: `/`,
        // data: { value: value, name: 'Momo' },
        data: params
    })
}
function xuLiThanhToan() {
    return $.ajax({
        type: 'post',
        url: '/callback',
        // url: `https://webhook.site/67f5b308-2734-45a5-8d1a-1f32e4d2be66`,
        // data: {value: value,name:'Momo'},
    })
}
var arr = []
var count = 1
var click = 1
$('#Momo').on('click', function (e) {
    count = 1
    e.preventDefault();
    $('#spin').removeClass('d-none')

    const value = parseInt($('#input').val())
    // const
    console.log(click)
    click++
    console.log('hahaha')
    $.when(CreateOrder({ value: value, name: 'hahah' }))
        .then(function success(data) {
            // console.log(data.qrCodeUrl)
            window.open(data.qrCodeUrl)



            console.log('chua vao time out')
            var timeOut;

            var a = function timeOutThanhToan() {
                timeOut = setTimeout(a, 1000)
                $.when(xuLiThanhToan())

                    .done(function (data) {
                        var isEmpty = Object.keys(data).length === 0;
                        if (count > 9) {
                            if (isEmpty) {
                                console.log('KHONG LAM GI HET')
                                console.log(data)
                            }
                            else {

                                clearTimeout(timeOut)
                                console.log('thong bao')
                                console.log(data)
                                if (data.resultCode != 0) {
                                    $('#spin').addClass('d-none')
                                    $('.notify').html(`<h1>GIAO DỊCH THẤT BẠI</h1>`)
                                }
                                else {
                                    $('.notify').html(`<h1>GIAO DỊCH THÀNH CÔNG</h1>`)
                                    $('#spin').addClass('d-none')

                                }

                            }
                        }
                        count++
                    })
                    .fail(function (err) {
                        console.log(err)
                    })
                // .always(function () {
                //     timeOut = setTimeout(a, 1000)
                // })

            }
            // var a = function timeOutThanhToan() {


            //     $.when(xuLiThanhToan())
            //         .then(function success(data) {
            //             // console.log(data)
            //             console.log('Dang trong timeOut')
            //             timeOut = setTimeout(a, 10000)
            //             var isEmpty = Object.keys(data).length === 0;
            //             console.log(isEmpty)

            //             if (isEmpty) {
            //                 console.log('KHONG LAM GI HET')
            //                 console.log(data)
            //             }
            //             else {
            //                 clearTimeout(timeOut)
            //                 console.log('thong bao')
            //                 console.log(data)
            //                 if (data.resultCode != 0) {
            //                     $('#form').html(`<h1>GIAO DỊCH THẤT BẠI</h1>`)
            //                 }
            //                 else {
            //                     $('#form').html(`<h1>GIAO DỊCH THÀNH CÔNG</h1>`)
            //                 }
            //                 // console.log('Chua clear time out')

            //                 // console.log('Chua clear time out')
            //             }

            //         }, function failed(err) {
            //             console.log(err)
            //         })

            // }
            a()






        }, function failed(err) {
            console.log(err)
        })





    // $.ajax({
    //     type: 'post',
    //     url: `/`,
    //     data: { value: value, name: 'Momo' },
    //     success: function (data) {
    //         // console.log(data)

    //         const order_url = data.qrCodeUrl
    //         const timeWait = data.responseTime


    //         // console.log
    //         // console.log(order_url)
    //         window.open(order_url)
    //         console.log('11231231')
    //         console.log('11231231')
    //         console.log('11231231')
    //         // var active = true


    //             // $.ajax({
    //             //     type: 'post',
    //             //     url: '/callback',
    //             //     // url: `https://webhook.site/67f5b308-2734-45a5-8d1a-1f32e4d2be66`,
    //             //     // data: {value: value,name:'Momo'},
    //             //     success: function (data) {
    //             //         // console.log(data)
    //             //         // const order_url = data.qrCodeUrl
    //             //         // const timeWait = data.responseTime
    //             //         // console.log(data.length)

    //             //         var isEmpty = Object.keys(data).length === 0;
    //             //         if (isEmpty) {
    //             //             console.log('KHONG LAM GI HET')
    //             //             console.log(data)
    //             //         }
    //             //         else {
    //             //             console.log('thong bao')
    //             //             console.log(data)
    //             //             if (data.resultCode != 0) {
    //             //                 $('#form').html(`<h1>GIAO DỊCH THẤT BẠI</h1>`)
    //             //             }
    //             //             else {
    //             //                 $('#form').html(`<h1>GIAO DỊCH THÀNH CÔNG</h1>`)
    //             //             }
    //             //             active = false
    //             //         }



    //             //     }

    //             // })


    //     }

    // })



})