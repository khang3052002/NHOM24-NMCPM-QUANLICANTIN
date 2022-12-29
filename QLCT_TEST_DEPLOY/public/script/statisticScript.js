
$('.month-select').change(function(){
    month=$(this).val()
    year= $('.year-select').val()
    month=parseInt(month)
    year=parseInt(year)
    
    if(Number.isInteger(year) && Number.isInteger(month)){
        window.location.href= `/statistic?month=${month}&year=${year}`
    }

})
$('.year-select').change(function(){
    year=$(this).val()
    month= $('.month-select').val()
    month=parseInt(month)
    year=parseInt(year)
    
    if(Number.isInteger(year) && Number.isInteger(month)){
        window.location.href= `/statistic?month=${month}&year=${year}`
    }
})