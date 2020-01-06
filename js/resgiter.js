import { APIuserRegister } from '../fetch.js'
var code;
function createCode() {
    code = '';
    var codeLength = 6;
    var codeV = $(".content-right span");

    var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
    for (var i = 0; i < codeLength; i++) {
        var index = Math.floor(Math.random() * 36)
        code += random[index];
    }
    codeV.text(code);
}
createCode();
$(".content-right span").bind('click', function () {
    createCode();
});

$('.bottom').load('./bottom.html');

//表单验证
var oNum = $('#num');
var oTel = $('#tel');
var oPassword = $('#password');
var oUpassword = $('#upassword');
var oChk = $('#chk');
var oBtn = $('#btn');
var oYzm = $('#yzm')
// var tel = oTel.val()
// var pass = oPassword.val();
// var oPass = oUpassword.val();
layui.use('layer', function () {
    var layer = layui.layer;

    oBtn.click(function () {
        var oYzm_value = oYzm.text();
        var oNum_value = oNum.val();
        var tel = oTel.val()
        var pass = oPassword.val();
        var oPass = oUpassword.val();
        // console.log(tel,pass)
        if (!oNum_value) {
            layer.open({
                type: 1,
                area: ['200px', '200px'],
                content: '请输入验证码'
            });
            return

        }

        if (oNum_value == oYzm_value) {
            var reg = /^1\d{10}$/;
            if (reg.test(tel)) {

                var peg = /^[\w!-@#$%^&*]{6,16}$/;
                if (peg.test(pass)) {
                    if (oPass == pass) {
                        APIuserRegister({
                            tel,
                            pass
                            
                        }).then(data => {
                            console.log(data)
                            if (data.code) {
                                // location.href =''
                                layer.open({
                                    type: 1,
                                    area: ['200px', '200px'],
                                    content: '注册成功'
                                });
                                location.href ='./user-login.html'
                            } else {
                                layer.open({
                                    type: 1,
                                    area: ['200px', '200px'],
                                    content: data.msg
                                });
                                
                            }
                            
                        })
                    } else {
                        layer.open({
                            type: 1,
                            area: ['200px', '200px'],
                            content: '两次密码不一致'
                        });
                        
                    }

                } else {
                    layer.open({
                        type: 1,
                        area: ['200px', '200px'],
                        content: '请输入6-16位的字符，可使用数字，字母或符号的组合'
                    });
                    return
                }

            } else {
                layer.open({
                    type: 1,
                    area: ['200px', '200px'],
                    content: '手机号码错误'
                });
                return
            }
        } else {
            layer.open({
                type: 1,
                area: ['200px', '200px'],
                content: '验证码输入错误'
            });
            createCode();
            return
        }

        //后端验证
       
    })
})

oChk.click(function () {
    if (oChk.prop('checked')) {
        oBtn.prop('disabled', false)
        oBtn.css('background', '#b52024')
    } else {
        oBtn.prop('disabled', true);
        oBtn.css('background', '#9A9A9A')
    }
})