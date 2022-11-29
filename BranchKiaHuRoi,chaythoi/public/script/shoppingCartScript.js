function CreateOrder(params = {}) {
    return $.ajax({
        type: 'post',
        url: `/payment-momo`,
        // data: { value: value, name: 'Momo' },
        data: params
    })
}
function xuLiThanhToan() {
    return $.ajax({
        type: 'post',
        url: '/payment-momo/callback',
        // url: `https://webhook.site/67f5b308-2734-45a5-8d1a-1f32e4d2be66`,
        // data: {value: value,name:'Momo'},
    })
}

var arr = []
var count = 1
var click = 1

$('#payment').click(function () {
    console.log('tao ne m')
    var arrProductsID = []
    var arrQuantity = []
    $('.product-item').each(function (e) {
        // console.log($(this).attr('id'))
        arrProductsID.push($(this).attr('id'))
        // arrQuantity.push()
    })
    $('.quantity-item').each(function () {
        arrQuantity.push(parseInt($(this).val()))
    })
    console.log(arrProductsID, arrQuantity)

    var typePayment = $('.form-select').val()

    var total = $('#total').text()
    var numTotal = convertVNDToNumber(total) // giá tiền




    console.log(typeof typePayment, numTotal)

    // thanh toán Momo
    if (typePayment == 2) {
        $.when(CreateOrder({ value: numTotal, orderID: '123'}))
            .then(function success(data) {
                console.log(data.payUrl)
                window.open(data.payUrl)
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
                                        // $('#spin').addClass('d-none')
                                       
                                        // $('.notify').html(`<h1>GIAO DỊCH THẤT BẠI</h1>`)
                                        $(".noti-content").html('Thánh toán thất bại');
                                    }
                                    else {
                                        // $('.notify').html(`<h1>GIAO DỊCH THÀNH CÔNG</h1>`)
                                        // $('#spin').addClass('d-none')
                                        $(".noti-content").html('Thanh toán thành công');

                                    }
                                    $('.pop-up').removeClass('hidden')

                                }
                            }
                            count++
                        })
                        .fail(function (err) {
                            console.log(err)
                        })
                }
                a()


            }, function failed(err) {
                console.log(err)
            })

    }


})

function convertVNDToNumber(value) {
    var index = value.indexOf('V')
    var str = value.slice(0, index)
    var num = parseFloat(str)
    num = num * 1000
    return num
}
var total = $('#total').text()
// var index = total.indexOf('V')
// var str = total.slice(0, index)
// var num = parseFloat(str)
// num = num * 1000
var numTotal = convertVNDToNumber(total)
function convertToVND(value) {
    value = value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

    return value
}
$('.delete-product-btn').click(function (e) {
    const id = $(this).attr('id')
    console.log(id)

    console.log(numTotal)
    var findThanhTien = $('#' + id).find('.text-right')

    var strThanhTien = $(findThanhTien).text()
    console.log(strThanhTien)
    var numThanhTien = convertVNDToNumber(strThanhTien)
    // console.log(numTotal,numThanhTien)
    numTotal = numTotal - numThanhTien

    var str = convertToVND(numTotal)
    $('#total').text(str)





    $('#' + id).remove()
    $.ajax({
        method: 'post',
        url: '/shopping-cart',
        data: { id: id },
        success: function (data) {

        }
    })

})

$('#edit-cart').click(function (e) {

    // window.location.href = '/shopping-cart/edit'

    $('.visibility-change').toggleClass('visibility-hidden')
})
$('#update-cart').click(function (e) {
    console.log('heheheh')
    var arrProductsID = []
    var arrQuantity = []
    $('.product-item').each(function (e) {
        // console.log($(this).attr('id'))
        arrProductsID.push($(this).attr('id'))
        // arrQuantity.push()

    })
    $('.quantity-item').each(function () {
        arrQuantity.push(parseInt($(this).val()))
    })

    $.ajax({
        method: 'post',
        url: 'shopping-cart',
        data: { arrProID: arrProductsID, arrQuantity: arrQuantity },
        success: function (data) {



            $(".noti-content").html(data);

            $(".pop-up").removeClass("hidden");
            $(".fa-window-close").click(function () {
                window.location.reload();
            });

            $(".pop-up").click(function () {
                window.location.reload();
            });
        }
    })
    console.log(arrProductsID,arrQuantity)


})