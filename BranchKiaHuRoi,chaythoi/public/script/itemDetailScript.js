$('#add-to-cart').click(function()
{
    // console.log('hahaha')
    const id = $('.product-detail').attr('id')
    const quantity = $('#quantity').val()
    const name = $('.name-product').text()
    $.ajax({
        method: 'post',
        url: '/item-detail',
        data: {id: id,quantity:quantity,name:name},
        success: function(data)
        {
            console.log(data.name)
            if(data.name){
                $('.noti-content').html(`Thêm mặt hàng thành công. <br>Chi tiết: ${data.name} - Số lượng: ${quantity}`)
              }
              else{
                $('.noti-content').html(data)
              }
            console.log(data)
            $('.pop-up').removeClass('hidden')

        }
    })
    console.log(id,quantity)
})

