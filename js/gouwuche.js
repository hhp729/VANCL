import { APICartList ,APICartnum ,APICardel} from '../fetch.js'
import { getCookie, removeCookie } from './cookie.js'

$('.fot').load('./bottom.html')

var username = getCookie('login_user');
$('#username').html(username);

$('#tt').click(function(){
    removeCookie('login_user')
    location.reload()
})
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
            data.forEach(({ name, img, price, num ,id}) => {
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
                    <a target="_blank" href="http://item.vancl.com/6386970.html?ref=mycart_ref" title="卫衣 创可贴  惹毛我了 白色" data-id ='${id}'>${name}</a>
                    <div style="float: right; width: 36%"></div>
                </td>
                <td class="size">L</td>
                <td class="price">${price}</td>
                <td class="count">
                    <span class="reduce">-</span>
                    <input class="count-input" type="text" value="${num}" />
                    <span class="add">+</span>
                <td> -</td>
                <td class="subtotal">${(price*num).toFixed(2)}</td>
                <td class="operate">
                    <a class="del track" name="sp_cart_mycart_del" data-id='${id}'>删除</a>
                </td>
                <td class="white bd-right">&nbsp;</td>
            </tr>
                `
            })
            $('tbody').html(html)
        }
    })

}


//全选
$('.ckb').click(function () {
    for (var i = 0; i < $('.check-one').length; i++) {
        $('.check-one')[i].checked = this.checked
    }
    getTotal()
})


//单选
$(document).on('click','.check-one',function(){

    if(!this.checked){
        $('.ckb').prop('checked',false)
    }
    getTotal()
})

$(document).on('click','.add',function(){
    console.log(this)
    var count = this.previousElementSibling.value;
    count++;
    this.previousElementSibling.value = count;
    var price = this.parentNode.previousElementSibling.innerText;
    console.log(price)
    this.parentNode.nextElementSibling.nextElementSibling.innerText = (price * count).toFixed(2);
    getTotal()

    var id = $('.name a').attr('data-id');
    APICartnum({
        id,
        count
    })
    // console.log(id);
    
})
$(document).on('click','.reduce',function(){
    if(!this.innerText) return
    var count = this.nextElementSibling.value;
    count--;
    if(count<=1){
        this.innerText = ''
    }
    this.nextElementSibling.value = count;
    var price = this.parentNode.previousElementSibling.innerText;
    this.parentNode.nextElementSibling.nextElementSibling.innerText = (price * count).toFixed(2);
    getTotal()
     var id = $('.name a').attr('data-id');
    APICartnum({
        id,
        count
    })
})

//删除
$(document).on('click','.del',function(){
    var id = $('.name a').attr('data-id');
    APICardel({
        id
    })
    this.parentNode.parentNode.remove();
})

function getTotal(){
    var sum = 0;
    var total = 0;
    var oCheckOne = $('.check-one');
    console.log(oCheckOne.length)
    for(var i = 0;i<oCheckOne.length;i++){
        if(oCheckOne[i].checked){
            var oTr = oCheckOne[i].parentNode.parentNode;
            var oCount = oTr.querySelector('.count-input');
            var oSubTotal = oTr.querySelector('.subtotal');
            sum+=oCount.value*1;
            total += oSubTotal.innerHTML * 1
        }
    }
    $('#coun').html(sum)
    $('#total').html(total)
}
