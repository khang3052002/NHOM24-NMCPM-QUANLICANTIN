$('.fa-window-close').click(function(){
    $('.noti-content').html('')
    if(!($('.pop-up').hasClass('hidden'))){
      $('.pop-up').addClass('hidden')
    }
  })


