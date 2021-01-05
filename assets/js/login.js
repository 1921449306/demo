$(function () {
  // 注册，登录页面跳转
  $("#gotologin").click(function () {
    $(".register").hide();
    $(".login").show();
  });
  $("#gotoregister").click(function () {
    $(".register").show();
    $(".login").hide();
  });
  //   密码验证
  let form = layui.form;
  form.verify({
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (value !== $(".register [type=password]").val()) {
        return "密码不一致";
      }
    },
  });

  $("#regiForm").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data,
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg("注册失败，用户名已被注册");
        }
        layer.msg("注册成功");
        $("#gotologin").click();
      },
    });
  });
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    // console.log(data);
    $.ajax({
      type: "POST",
      url: "/api/login",
      data,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg("注册失败");
        }
        // 存储token
        localStorage.setItem("token", res.token);
        layer.msg("登录成功, 即将跳转到首页", function () {
          location.href = "/home/index.html";
        });
      },
    });
  });
});
