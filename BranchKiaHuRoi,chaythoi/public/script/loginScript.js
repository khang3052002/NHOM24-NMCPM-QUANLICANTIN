$("#admin-login-btn").click(() => {
    // preparedData=$('#admin-login-form').serialize();
    // console.log(preparedData)
    // finalData=preparedData["role"]='admin';
    var ajax1 = $.ajax({
        type: 'post',
        url: `/sign-in`,
        data: $('#admin-login-form').serialize() + '&role=admin',
        success: function (data) {
            if (data) {
                $('.noti-content').html(`${data}`)
                if (data.includes('thành công')) {
                    setTimeout(function () {
                        window.location.href = '/';
                    }, 800)
                }
            }
            else {
                $('.noti-content').html(data)
            }
            $('.pop-up').removeClass('hidden')

        }
    })
})

$("#user-login-btn").click(() => {

    // preparedData=$('#user-login-form').serialize();
    // // console.log(preparedData)
    // finalData=preparedData+'&role=user';
    // console.log(finalData)
    var ajax1 = $.ajax({
        type: 'post',
        url: `/sign-in`,
        data: $('#user-login-form').serialize() + '&role=user',
        success: function (data) {
            if (data) {
                $('.noti-content').html(`${data}`)
                if (data.includes('thành công')) {
                    setTimeout(function () {
                        window.location.href = '/';
                    }, 800)
                }
            }
            else {
                $('.noti-content').html(data)
            }
            $('.pop-up').removeClass('hidden')
        }
    })
})