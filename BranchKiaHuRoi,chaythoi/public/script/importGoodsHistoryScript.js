$('#search-receipt-btn').click(function(){
    window.location.href=`/import-goods-history?searchID=${$('#search-rec-id').val()}`
})