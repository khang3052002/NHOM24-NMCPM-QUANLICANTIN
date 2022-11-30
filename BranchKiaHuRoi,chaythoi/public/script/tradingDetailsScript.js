// console.log('hehe')
$("#search-id-btn").click(function () {
  // console.log('heeh')
  if ($("#id-order-search-field").val() != "") {
    window.location.href = `?id=${$("#id-order-search-field").val()}`;
  }
});
$("#print-bill").click(function () {
  // $(".noti-content").html("In hoá đơn thành công");
  // $(".pop-up").removeClass("hidden");
  // $("#view-receipt-btn").removeClass("hidden");
  id=$('.infor-container').attr('id')
  console.log(id)
  $.ajax({
    method: "post",
    data: {
        id:id
    },
    url: "/trading-details",
    success: function (data) {
        $('.container-pos').removeClass('hidden')
        $('.noti-content').html(data)
        setTimeout(function(){
          $('.pop-up').removeClass('hidden')
        },1500)
       
    },
});
});
