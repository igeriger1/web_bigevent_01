// //入口函数
// $(function() {
//     //点击注册账号，隐藏登陆区域，显示注册区域
//     $("#link_reg").on("click", function() {
//             $(".login-box").hide();
//             $(".reg-box").show();
//         })
//         //点击去登陆 显示登陆区域 隐藏注册区域
//     $("#link_login").on("click", function() {
//         $(".login-box").show();
//         $(".reg-box").hide();
//     })

//     //    2.自定义校验规则
//     // 从layui中获取form对象
//     var form = layui.form;
//     form.verify({
//         // 属性就是定义的规则
//         pwd: [
//             // 数组的第一个元素正则
//             /^[\S]{6,16}$/, '密码必须6到12位，且不能出现空格'
//         ],
//         // 教研两次密码输入不一致规则
//         repwd: function(value) {
//             // 获取注册表单中的密码值
//             var pwd = $(".reg-box [name=password]").val().trim();
//             // 只判断有问题的情况
//             if (value !== pwd) {
//                 return '两次密码输入不一致';

//             }
//         }
//     });
//     var layer = layui.layer
//         // 监听注册表单的提交事件
//     $('#form_reg').on('submit', function(e) {
//         // 1. 阻止默认的提交行为
//         e.preventDefault()
//             // 2. 发起Ajax的POST请求
//         var data = {
//             username: $('#form_reg [name=username]').val(),
//             password: $('#form_reg [name=password]').val()
//         }
//         $.post('/api/reguser', data, function(res) {
//             if (res.status !== 0) {
//                 return layer.msg(res.message)
//             }
//             layer.msg('注册成功，请登录！')
//                 // 模拟人的点击行为
//             $('#link_login').click()
//                 // 重置form表单
//             $("#form_reg")[0].reset();
//         })
//     })

//     // 4.登录
//     var layer = layui.layer
//     $("#form_login").on("submit", function(e) {
//         //阻止默认提交
//         e.preventDefault();
//         //发送ajax
//         $.ajax({
//             method: 'POST',
//             url: '/api/login',
//             data: $(this).serialize(),
//             success: function(res) {
//                 //检验返回状态
//                 if (res.status !== 0) {
//                     return layer.msg(res.message);
//                 }
//                 // 提示信息 保存token界面 跳转界面
//                 layer.msg("登陆成功");
//                 // 保存token 未来的接口 要使用token
//                 localStorage.setItem("token", res.token);
//                 // 跳转
//                 location.href = "/index.html"
//             }
//         })
//     })

// })
$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从 layui 中获取 form 对象
    var form = layui.form
    var layer = layui.layer
        // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
            // 2. 发起Ajax的POST请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
                // 模拟人的点击行为
            $('#link_login').click()
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})