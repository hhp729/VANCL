import { APICartList } from '../fetch.js'
import { getCookie } from './cookie.js'

var username = getCookie('login_user');
if (username) {
    rederList()

}

function rederList() {
    APICartList({
        username
    }).then(data => {
        var { code, data } = data;
        if (code) {
            var html = ''
            data.forEach(({ name, img, price, num }) => {
                html += `
                <tr class="selected">
                <td class="white bd-left">&nbsp;</td>
                <td class="bar" rowspan="1">
                    <input class='check-one' type="checkbox">
                </td>
                <td class="image" rowspan="1">
                    <a target="_blank" href="http://item.vancl.com/6386970.html?ref=mycart_ref">
                        <img alt="卫衣 创可贴  惹毛我了 白色" src="${img}"></a>
                </td>
                <td class="name">
                    <a target="_blank" href="http://item.vancl.com/6386970.html?ref=mycart_ref" title="卫衣 创可贴  惹毛我了 白色">${name}</a>
                    <div style="float: right; width: 36%"></div>
                </td>
                <td class="size">L</td>
                <td class="price">￥${price}</td>
                <td class="count">
                    <span class="reduce">-</span>
                    <input class="count-input" type="text" value="${num}" />
                    <span class="add">+</span>
                <td> -</td>
                <td class="subtotal">￥${price}</td>
                <td class="operate">
                    <a class="del track" name="sp_cart_mycart_del">删除</a>
                </td>
                <td class="white bd-right">&nbsp;</td>
            </tr>
                `
            })
            $('tbody').html(html)
   
        }

    })

}


$('.ckb').click(function () {
    for (var i = 0; i < $('.check-one').length; i++) {
        $('.check-one')[i].checked = this.checked
    }
})



function checkAll() {

}

function setCount(symbol, oTr) {

}