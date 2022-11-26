$('#sign-up-btn').click((e)=>{
    e.preventDefault();
    password=$('#password').val();
    confirmPassword=$('#confirm-password').val();
    if(password==confirmPassword){
        var ajax1 = $.ajax({
            type: 'post',
            url: `/sign-up`,
            data: $('#sign-up-form').serialize(),
            success: function (data) {
                window.alert(data);
                $('.update-product-popup').removeClass('show').addClass('hidden');
                window.location.reload();
            }
        })
    }
});