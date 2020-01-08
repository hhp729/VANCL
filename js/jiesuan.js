$('.fot').load('./bottom.html');

import { APICarjie } from '../fetch.js'
import { getCookie } from './cookie.js'
var oProvince = $('#province');
var oCity = $('#city');
var oArea = $('#area');
$.ajax({
    url: 'http://api.yytianqi.com/citylist/id/2',
    dataType: 'json'
}).then(function (data) {
    // console.log(data);
    var { list } = data
    console.log(list)
    var html = ' <option value="">--省份/直辖市--</option>';
    list.forEach(({ name }) => {
        html += `
            <option value="${name}">${name}</option>
            `
    })
    oProvince.html(html);

    oProvince.change(function () {
        var province = this.value
        // console.log(province)
        var provinceObj = list.filter(item =>
            item.name == province)[0];

        console.log(provinceObj)
        var html = ' <option value="">--市/区--</option>'
        if (provinceObj) {
            var cityList = provinceObj.list;
            cityList.forEach(({ name }) => {
                html += `
                    <option value="${name}">${name}</option>
                    `
            })
        }
        oCity.html(html);


        oCity.change(function () {
            var city = this.value;
            var cityObj = cityList.filter(item =>
                item.name == city)[0];
            var html = '<option value="">--县/区--</option>'
            if (cityObj) {
                var areaList = cityObj.list;
                console.log(areaList)
                areaList.forEach(({ name }) => {
                    html += `
                        <option value="${name}">${name}</option>`

                })
            }
            oArea.html(html)
        })
    })

})
//点击确认地址
$(document).on('click', function (e) {
    var target = $(e.target)
    if (target.is('#baocun')) {
        var shouhuo = $('#province').val() + $('#city').val() + $('#area').val() + $('#inp').val()
        $('.qr p').html(shouhuo);

        if ($('input').eq(0).val() && $('input').eq(1).val() && $('input').eq(2).val() && $('input').eq(3).val()) {

            $('.addform').css('display', 'none')
        } else {
            layui.use('layer', function () {
                var layer = layui.layer;

                layer.alert('请填写正确的信息');
            });
        }

    }

})

$('.add-new').click(function () {
    $('.addform').css('display', 'block')
})

$('#x').click(function(){
    $('.addform').css('display', 'none')
})


var username = getCookie('login_user')
APICarjie({
    username
}).then(data => {
    //  console.log(data)
    var { code, data } = data;
    if (code) {
        var html = ''
        var count = 0
        data.forEach(({ name, price, num }) => {
            
            html += `
        <tr>
                        <td class="name">
                            <a target="_blank" href="http://item.vancl.com/6386717.html?ref=hp-hp-syms-1_3-v:n">${name}</a>
                        </td>
                        <td class="size">L
                        </td>
                        <td class="point" style="display: none">178
                            分
                        </td>
                        <td class="price">
                            ￥${price}
                        </td>
                        <td class="qty">${num}
                        </td>
                        <td class="preferential">
                            <div class="discount-cx">
                                    -
                            </div>
                        </td>
                        <td class="sub-total">
                            ￥${(price * num).toFixed(2)}
                        </td>
                    </tr>
        `
            count += (price * num);
            
        })
        console.log(count)
        $('#heji').html(count.toFixed(2) + '元')
    }
    
    $('tbody').html(html)


})