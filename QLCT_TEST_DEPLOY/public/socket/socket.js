const ConvertToVND = (value) => {
  // console.log(value)
  try {
    if (typeof value == "string") {
      try {
        value = parseInt(value);
      } catch (err) {}
    }
    gia_ban = value.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
    return gia_ban;
  } catch (error) {
    return value;
  }
};
var socket = io();
socket.on("connect", () => {});

socket.on("send update", function (data) {
  $(".product-item").each(function () {
    arr = data.filter((item) => item.ma_mat_hang == $(this).attr("id"));
    if (arr.length > 0) {
      $(this).children(".quantity-item-store").html(arr[0].so_luong);
    }
  });
});

socket.on("connect", function () {
  console.log("id: ", socket.id);
});
socket.on("send datachange", function (response) {
  var data = response.data;
  var info = response.info;
  if (info.id) {
    if (info.id == $(".user-id").attr("id")) {
      $(".my-user-balance").html(ConvertToVND(info.balance));
      $(".my-user-balance").addClass("text-success");
      $(".my-user-balance").addClass("fw-bold");
    }
  }
  $(".product-item").each(function () {
    arr = data.filter((item) => item.ma_mat_hang == $(this).attr("id"));
    if (arr.length > 0) {
      if ($(this).children(".quantity-item-store").html() != arr[0].so_luong) {
        $(this).children(".quantity-item-store").html(arr[0].so_luong);
        $(this).children(".quantity-item-store").addClass("text-success");
        $(this).children(".quantity-item-store").addClass("fw-bold");
      }
    }
  });
  $(".item-container").each(function () {
    arr = data.filter((item) => item.ma_mat_hang == $(this).attr("id"));
    if (arr.length > 0) {
      if (
        $(this)
          .children(".card-sl")
          .children(".quantity-text")
          .children(".good-quantity")
          .html() != arr[0].so_luong
      ) {
        $(this)
          .children(".card-sl")
          .children(".quantity-text")
          .children(".good-quantity")
          .html(arr[0].so_luong);
        $(this)
          .children(".card-sl")
          .children(".quantity-text")
          .children(".good-quantity")
          .removeClass("text-info");
        $(this)
          .children(".card-sl")
          .children(".quantity-text")
          .children(".good-quantity")
          .addClass("text-success");
        $(this)
          .children(".card-sl")
          .children(".quantity-text")
          .children(".good-quantity")
          .addClass("fw-bold");
      }
    }
  });
  $(".item-result").each(function () {
    arr = data.filter((item) => item.ma_mat_hang == $(this).attr("id"));
    // console.log( $(this).children('.text-quantity').children('.good-quantity'))
    if (arr.length > 0) {
      if (
        $(this).children(".quantity-text").children(".good-quantity").html() !=
        arr[0].so_luong
      ) {
        $(this)
          .children(".quantity-text")
          .children(".good-quantity")
          .html(arr[0].so_luong);
        $(this)
          .children(".quantity-text")
          .children(".good-quantity")
          .removeClass("text-info");
        $(this)
          .children(".quantity-text")
          .children(".good-quantity")
          .addClass("text-success");
        $(this)
          .children(".quantity-text")
          .children(".good-quantity")
          .addClass("fw-bold");
      }
    }
  });
  $(".product-detail").each(function () {
    arr = data.filter((item) => item.ma_mat_hang == $(this).attr("id"));
    // console.log( $(this).children('.text-quantity').children('.good-quantity'))
    if (arr.length > 0) {
      if ($(".quantity-pro").html() != arr[0].so_luong) {
        $(".quantity-pro").html(arr[0].so_luong);
        $(".quantity-pro").removeClass("text-info");
        $(".quantity-pro").addClass("text-success");
        $(".quantity-pro").addClass("fw-bold");
      }
    }
  });
});
socket.on("update quantity",function(response){

})
