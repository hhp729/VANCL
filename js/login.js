import { APIuserLogin } from '../fetch.js'
$('.foot').load('./bottom.html')
var oBtn = $('#btn');
var oTelephone = $('#uname');
var oPassword = $('#upassword');

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
            alert(msg)
            // location.href = './列表.html'
            document.cookie = `login_user=${uname};path=/;expires=${new Date()}`
        } else {
            alert(msg)
            location.href = './user-login.html'
        }
    })
})