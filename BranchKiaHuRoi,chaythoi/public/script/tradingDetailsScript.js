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
  $.ajax({
    method: "post",
    data: {
        id:"hjsdfasj"

    },
    url: "/trading-details",
    success: function (data) {
        $('.noti-content').html(data)
        $('.pop-up').removeClass('hidden')
        $('.fa-window-close').click(function () {
            window.location.reload()
          })
    },
});
});
