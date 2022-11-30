$('.custom-fc').click(function(){
    window.location.href= `/daily-turnover?id=${$(this).attr('value')}`
})

$('#search-receipt-btn').click(function(){
    if($('#search-rec-id').val()!=""){
        window.location.href= `/daily-turnover?id=${$('#search-rec-id').val()}`
    }
    
})