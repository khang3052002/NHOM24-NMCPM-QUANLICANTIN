$('#edit-profile-btn').click(()=>{
    console.log('hehe')
    $('#user-info-panel').addClass('hidden')
    $('#edit-user-profile-panel').removeClass('hidden').addClass('show');
})
$('#close-edit-panel').click(()=>{
    $('#user-info-panel').removeClass('hidden')
    $('#edit-user-profile-panel').addClass('hidden').removeClass('show');
})

