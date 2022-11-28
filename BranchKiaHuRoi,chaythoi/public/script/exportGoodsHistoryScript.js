$('#search-receipt-btn').click(function(){
    window.location.href=`/export-goods-history?searchID=${$('#search-rec-id').val()}`
})