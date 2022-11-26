function change(state) {
    console.log('hehe')
    if(state === null) { // initial page
        $('body').html("Original");
    } else {
        $('body').html(state.data);
    }
}

$(window).on("popstate", function(e) {
    change(e.originalEvent.state);
});

$('.too-much-item-container').click(()=>{
    id=$(this).attr('id');
    console.log(id)
})