$('.form-control').click(function(){
    window.location.href= `${window.location.href}/details?id=${$(this).attr('value')}`
})