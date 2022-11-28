$('#payment').click(function()
{
    console.log('tao ne m')
    var arrProductsID =[]
    var arrQuantity = []
    $('.product-item').each(function(e)
    {
        // console.log($(this).attr('id'))
        arrProductsID.push($(this).attr('id'))
        // arrQuantity.push()

    })
    $('.quantity-item').each(function()
    {
        arrQuantity.push(parseInt($(this).val()))
    })
    console.log(arrProductsID,arrQuantity)
    

})