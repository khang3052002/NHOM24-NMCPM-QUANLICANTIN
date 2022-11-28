// count = 2;
// $(".add-new-line").click(function () {
//   var clone = $("#row-1").clone();
//   clone.attr("id", `row-${count}`);
//   clone.children().last().attr("id", `delete-btn-${count}`);
//   clone.children().last().prev('input').attr("id",`date-${count}`)
//   $(".import-good-main-panel").append(clone);
//   count++;

//   $(".fa-delete-left").click(function () {
//     if (!$(this).attr("id").includes("btn-1")) {
//       $(this).parent().remove();
//       count--;
//     }
//   });

//   $("input").on("change", function () {
//     if ($(this).val() != "") {
//       $(this).removeClass("red-border");
//     }
//   });
// });

// $(".fa-delete-left").click(function () {
//   if (!$(this).attr("id").includes("btn-1")) {
//     $(this).parent().remove();
//     count--;
//   }
// });

$(".take-amount").on("change", function () {
  if ($(this).val() != "") {
    $(this).removeClass("red-border");
  }
});

$("#confirm-btn").click(function () {
  idArr = [];
  amountArr = [];

  var checkFlag = true;
  $(".take-amount").each(function () {
    // checkFlag=true;
    // if (($(this).val() == "" && $(this).prop('disabled')==false)  ) {

    //   $(this).addClass("red-border");
    //   checkFlag = false;
    // }
    // if (($(this).val() == "" && $(this).prop('disabled')==false)){
    //   checkFlag = false;
    // }
    // if ($(this).val()> $(this).siblings('.current-amount').val() ) {
    //   $(this).addClass("red-border");
    //   checkFlag = false;
    // }
    // $(this).removeClass("red-border");
    if (
      $(this).val() != "" &&
      $(this).prop("disabled") == false &&
      $(this).val() > 0
    ) {
      idArr.push($(this).siblings(".item-id").attr("id"));
      amountArr.push($(this).val());
    }
  });
  console.log(amountArr, idArr);
  if (checkFlag == false) {
    return;
  } else {
    console.log(amountArr, idArr);
    $.ajax({
      method: "post",
      data: {
        id: idArr,
        amount: amountArr,
      },
      url: "/export-goods",
      success: function (data) {
        console.log(data)
        if (data.trangthai) {
          $(".noti-content").html(
            `Thao tác thành công. <br>Mã đơn hàng của bạn: ${data.trangthai}`
          );
        } else {
          $(".noti-content").html(data);
        }
        $(".pop-up").removeClass("hidden");
        $(".fa-window-close").click(function () {
          window.location.reload();
        });

        $(".pop-up").click(function () {
          window.location.reload();
        });
      },
    });
  }
});

$(".toggle-the-input").click(function () {
  $(this)
    .prev("input")
    .each(function () {
      $(this).prop("disabled", !$(this).prop("disabled"));
      $(this).val("");
      $(this).removeClass("red-border");
    });
});
