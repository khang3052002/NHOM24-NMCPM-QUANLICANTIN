$('#edit-profile-btn').click(()=>{
    console.log('hehe')
    $('#user-info-panel').addClass('hidden')
    $('#edit-user-profile-panel').removeClass('hidden').addClass('show');
})
$('#close-edit-panel').click(()=>{
    $('#user-info-panel').removeClass('hidden')
    $('#edit-user-profile-panel').addClass('hidden').removeClass('show');
})


$('#update-btn').click(()=>
{
    const name = $('#name-input-field').val()
    const email = $('#email-input-field').val()
    const phone = $('#phone-input-field').val()
    
    $.ajax({
        method: 'put',
        data: {name: name, email:email, phone:phone},
        url: '/user-profile',
        success: function(data)
        {
            $(".noti-content").html(data.data);
            // if(data.result == 'OK')
            // {
                
            // //    window.location.reload()
            
            // }
            // else{

            // }
            setTimeout(function () {
                window.location.reload()
            }, 1300)
            $('.fa-window-close').click(function () {
                window.location.reload()
              })
            $(".pop-up").removeClass("hidden");
        }
    })
})
