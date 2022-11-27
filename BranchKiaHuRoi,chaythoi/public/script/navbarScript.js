$('#sign-out-btn').click(()=>{
    location.replace('/sign-out');
})

$('.sign-up-btn').click(()=>{
    location.replace('/sign-up');
})

$('.sign-in-btn').click(()=>{
    location.replace('/sign-in');
})

$('#user-avatar-btn').click(()=>{
    var ajax1 = $.ajax({
        type: 'post',
        url: `/get-user-info`,
        success: function (data) {
            $('#user-balance').html('Số dư tài khoản: '+`${data[0].so_du}`);
            // $('#user-avatar-img').attr('src',`${data[0].img_url}`);
        }
    })
})


function openNav() {
    $("#mySidenav").css('width',"250px");
}

function closeNav() {
    $("#mySidenav").css('width',"0px");
}
$('.close-btn-container').click(function(){
    closeNav()
})
$('#close-nav-btn').click(function(){
    closeNav()
})

$('#menu-icon').click(function(){
    openNav()
})
