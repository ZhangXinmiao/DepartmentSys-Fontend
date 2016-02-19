<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head lang="zh-cmn-Hans">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>登录系统</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.5 -->
    <link rel="stylesheet" href="static/bootstrap/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="static/dist/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="static/dist/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="static/dist/css/AdminLTE.min.css">
    <!-- iCheck -->
    <link rel="stylesheet" href="static/plugins/iCheck/square/blue.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body class="hold-transition login-page">
<div class="login-box">
    <div class="login-logo">
        <b>Welcome To the</b> System
    </div><!-- /.login-logo -->
    <div class="login-box-body">
        <form method="post">
            <div class="form-group has-feedback">
                <input type="text" class="form-control" name="username" id="username" placeholder="帐号">
                <span class="glyphicon glyphicon-user form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
                <input type="password" class="form-control" name="password" id="password" placeholder="密码">
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="row">
                <div class="col-xs-4">
                    <button type="submit" id="login-button" class="btn btn-primary btn-block btn-flat">登 录</button>
                </div><!-- /.col -->
            </div>
        </form>

    </div><!-- /.login-box-body -->
</div><!-- /.login-box -->

<!-- jQuery 2.1.4 -->
<script src="static/plugins/jQuery/jQuery-2.1.4.min.js"></script>
<!-- Bootstrap 3.3.5 -->
<script src="static/bootstrap/js/bootstrap.min.js"></script>
<!-- iCheck -->
<script src="static/plugins/iCheck/icheck.min.js"></script>
<script src="static/dist/js/bootbox.min.js"></script>
<script>
    $(function () {
        var element = $("#login-button");
        element.click(function() {
            var data = { username : $("#username").val(), password : $("#password").val() };
            console.log(data);
            $.ajax({
                type: "POST",
                url: '/login',
                dateType: "json",
                data: JSON.stringify( { username : $("#username").val(), password : $("#password").val() } ),
                contentType: "application/json; charset=utf-8",
                success: function (result, textStatus) {
                    console.log(result);
                    if (result.code == 1) {
                        bootbox.alert("登陆成功");
                        window.location.href = "/center";
                    } else {
                        bootbox.alert("登陆失败");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(XMLHttpRequest, textStatus, errorThrown);
                    bootbox.alert("登陆失败");
                }
            });
            return false;
        });
    });
</script>
</body>
</html>

