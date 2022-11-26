
function setDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    var today = year + "-" + month + "-" + day;       
    $(".mf-date").attr("value", today);
}
setDate();
count = 2;
$(".add-new-line").click(function () {
  $(".import-good-main-panel").append($('#row-1').clone());
  count++;
    setDate();
  $(".fa-delete-left").click(function () {
    console.log("xoa roi ne");
    $(this).parent().remove();
    count--;
  });
});

$(".fa-delete-left").click(function () {
  console.log("xoa roi ne");
  $(this).parent().remove();
  count--;
});
