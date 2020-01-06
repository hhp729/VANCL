import { APIuserLogin } from '../fetch.js'
$('.foot').load('./bottom.html')
var oBtn = $('#btn');
var oTelephone = $('#uname');
var oPassword = $('#upassword');
layui.use('layer', function(){
    var layer = layui.layer;
oBtn.click(function () {
    var uname = oTelephone.val();
    var password = oPassword.val();
    console.log(666)

    APIuserLogin({
        uname,
        password
    }).then(data => {
        var { code, msg } = data;
        console.log(data)
        if (code) {
                layer.msg('登录成功',{time:2000},function(){
                    var href = sessionStorage.getItem('login-url');
                    location.href = href
                }
                )
                
            // location.href = './列表.html'
            document.cookie = `login_user=${uname};path=/;expires=${new Date()}`
            
        } else {
            layer.msg(msg, function(index){
        
                location.href = './user-login.html'
              });   
            
        }
    })
})
});