function change(state) {
    console.log('hehe')
    if(state === null) { // initial page
        $('body').html("Original");
    } else {
        $('body').html(state.data);
    }
}

$(window).on("popstate", function(e) {
    change(e.originalEvent.state);
});

$('.item-container').click(function(){
    id=$(this).attr('id');
    window.location.href=`/item-detail?id=${id}`
})

$('.add-to-cart-btn').click(function(e){
    e.preventDefault()
    e.stopPropagation()
    id=$(this).attr('id')
    quantity=1;
    name=$(this).attr('name')
    console.log(id,quantity,name)
    $.ajax({
        method: 'post',
        url: '/item-detail',
        data: {id: id,quantity:quantity,name:name},
        success: function(data)
        {

          if(data.name==false){
            $('.noti-content').html('Vui lòng đăng nhập')
            $('.pop-up').removeClass('hidden')
            $('.fa-window-close').click(
              function(){
                window.location.href='/sign-in'
              }
            )
          }else{
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


        }
    })
})