$('.custom-fc').click(function(){
    window.location.href= `/daily-turnover?date=${$(this).attr('value')}`
})

$('#search-receipt-btn').click(function(){
    if($('#search-rec-id').val()!=""){
        window.location.href= `/daily-turnover?date=${$('#search-rec-id').val()}`
    }
    
})
$('.month-select').change(function(){
    console.log('change',$(this).val())
    month=$(this).val()
    window.location.href= `/monthly-turnover?month=${month}`
})