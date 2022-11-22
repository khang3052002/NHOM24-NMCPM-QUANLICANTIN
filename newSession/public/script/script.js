

$('#login').click(function (e) { 
    e.preventDefault();
    window.location.href='/sign_in';
});
$('#sign_inBtn').click(function(e){
    e.preventDefault();
    var pass=$('#floatingPassword').val();
    var acc=$('#floatingInput').val();
    $.ajax(
       {
        url:'/auth',
        type:'POST',
        dataType:'html',
        data:{
            password:pass,
            account:acc
        },
        success:function(res){
            console.log(res);
            $('body').html(res);
            window.history.pushState("object or string", "Title", "/home");
        }
       }
    )
})
$('#profile').click(function(e){
    e.preventDefault();
    window.location.href='/profile';
})
$('#logout').click(function (e) {
    e.preventDefault();
    window.location.href='/logout';
})
$('#products').click(function(e){
    e.preventDefault();
    window.location.href='/products';
})
$('#stock').click(function(e){
    e.preventDefault();
    window.location.href='/stocks';
})