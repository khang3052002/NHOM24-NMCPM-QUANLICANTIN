var firebaseConfig = {
  apiKey: "AIzaSyBrKNB747xSRw5sV0ZGK73OFqHAXaFDSKk",
  authDomain: "uploading-img-a8c96.firebaseapp.com",
  projectId: "uploading-img-a8c96",
  storageBucket: "uploading-img-a8c96.appspot.com",
  messagingSenderId: "876723118070",
  appId: "1:876723118070:web:50c07a2b9a9d2a462f31d7"
};

firebase.initializeApp(firebaseConfig);

$('.fa-window-close').click(function(){
    $('.noti-content').html('')
    $('.pop-up-graph').toggleClass('visibility-hidden')
    if(!($('.pop-up').hasClass('hidden'))){
      $('.pop-up').addClass('hidden')
    }
  })


  $('.pop-up').click(function()
  {
    $(this).addClass('hidden')
  
  })
  
  $('.popup-container').click(function(event)
  {
    event.stopPropagation()
  })

  

$('.container-pos').click(function()
{
  $(this).addClass('hidden')

})

$('#invoice-POS').click(function(event)
{
  event.stopPropagation()
})


$('.graph-btn').click(function(){
  $('.pop-up-graph').toggleClass('visibility-hidden')
})

$('.add-to-cart-btn').click(function(e){
  e.preventDefault()
  e.stopPropagation()
  id=$(this).attr('id')
  quantity=$('.quantity-input').val();
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

$('.quantity-input').click(function(e){
  e.preventDefault()
  e.stopPropagation()
  
})