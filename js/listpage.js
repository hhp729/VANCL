$('.Head').load('./head.html')
$('.dibu').load('./bottom.html')
import {APIgoodsDetail} from '../fetch.js'

var search = location.search.substring(1);
var id = search.split('=')[1];
// console.log(id)

APIgoodsDetail({
    id
}).then(data =>{
    var {code,data} = data;
    if(code){
        data.forEach(({name,price,img}) =>{

            $('.goods_li img').prop('src',img);
            $('.desc_1 h2').html(name);
            $('.name span').html(price);
            $('#bigImg').prop('src',img);
        })
    }
})
var oBox = $('.goods_li')
var oB = $('.goods')
var oSmallImg = $('#smallImg')
var oMagnifier = $('.magnifier');
var oBigShowdow = $('.bigShowdow');
var oBigImg = $('#bigImg');


$(document).mousemove(function(event){
    var maxLeft = oBox.innerWidth() - oMagnifier.outerWidth();
    var maxTop = oBox.innerWidth() - oMagnifier.outerHeight();
    var x = event.pageX;
    var y = event.pageY;
    // console.log(oBox.offset().left)
    var left =x- oBox.offset().left - oMagnifier.outerWidth() / 2;
    var top =y- oBox.offset().top - oMagnifier.outerHeight() / 2;

    if (left <= 0) { left = 0; }
        if (left >= maxLeft) { left = maxLeft; }
        if (top <= 0) top = 0;
        if (top >= maxTop) top = maxTop;

    // oMagnifier.css({
    //     left:left,
    //     top:top
    // })
    oBigImg.css({
        left:-left/maxLeft*(oBigImg.outerWidth() -oBigShowdow.outerWidth()) + 'px',
        top:-top/maxTop*(oBigImg.outerHeight() - oBigShowdow.outerHeight()) + 'px'
    })
})

oBox.mouseover(function(){
    // console.log(666)
    // oMagnifier.css('display','block');
    oBox.css('cursor','move')
    oBigShowdow.css('display','block');

   
})

oSmallImg.mouseleave(function(){
    console.log(666)
    oMagnifier.css('display','none');
    oBigShowdow.css('display','none');
})
// console.log(oSmallImg)
