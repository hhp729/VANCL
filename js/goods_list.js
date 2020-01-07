
import { APIgoodsList } from '../fetch.js';

layui.use(['laypage'], function () {
    var laypage = layui.laypage;

var key = '';
var order = 'price';
var sort = 'asc';

rederlist()

$('#but').click(function(){
    key = $('#inp').val();
    rederlist()
})
$('#name-up').click(function(){
    order = 'name';
    sort = 'asc';
    rederlist()
})
$('#name-down').click(function(){
    order='name';
    sort = 'desc';
    rederlist()
})
$('#price-up').click(function(){
    order = 'price';
    sort = 'asc';
    rederlist()
})
$('#price-down').click(function(){
    order = 'price';
    sort = 'desc';
    rederlist()
})

function rederlist() {
    APIgoodsList({
        key,
        sort,
        order
    }).then(data => {
        var { code, data } = data;
        console.log(data)
        if (code) {
            var html = ''
            data.forEach(({ name, price, img, id }) => {
                html += `
                <li id="watch">
                    <a href="./listpage.html?id=${id}" target="_blank">
                    <img id="image" src="${img}" alt="">
                    <p id="name" href="">${name}</p>
                    <span id="price">售价￥${price}</span>
                    </a>
                </li>
                `
            })
            $('#ul').html(html);
        }
    })
}
})