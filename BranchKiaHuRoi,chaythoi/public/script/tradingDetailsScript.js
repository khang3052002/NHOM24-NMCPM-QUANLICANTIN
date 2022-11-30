// console.log('hehe')
$("#search-id-btn").click(function () {
  // console.log('heeh')
  if ($("#id-order-search-field").val() != "") {
    window.location.href = `?id=${$("#id-order-search-field").val()}`;
  }
});
$("#print-bill").click(function () {
  $(".noti-content").html("In hoá đơn thành công");
  $(".pop-up").removeClass("hidden");
  $("#view-receipt-btn").removeClass("hidden");
});
