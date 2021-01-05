function getUserInfo() {
  $.ajax({
    url: "/my/userinfo",
    success: function (res) {
      console.log(res);
      renderUserInfo(res.data);
    },
  });
}

getUserInfo();
function renderUserInfo(data) {
  let name = data.nickname || data.username;
  let first = name[0].toUpperCase();
  $("#welcome").text("欢迎 " + name);
  if (data.user_pic) {
    $(".layui-nav-img").attr("src", data.user_pic).show();
    $(".text-avatar").hide();
  } else {
    $(".text-avatar").text(first).show();
    $(".layui-nav-img").hide();
  }
}
