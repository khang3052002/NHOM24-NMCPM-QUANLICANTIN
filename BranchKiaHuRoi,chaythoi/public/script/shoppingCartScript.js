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


})