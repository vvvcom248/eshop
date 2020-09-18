
var cart = {};//моя корзина


$('document').ready(function () {
    loadGoods();//вывод товара на страницу
    checkCart();//проверка корзины
    showMiniCart();//вывод корзины
});

function loadGoods(param) {
    //Загружаю товары на страницу
    $.getJSON('goods.json', function (data) {
        //console.log(data);
        var out = '';
        for (var key in data) {
            out += '<div class="single-goods">';
            out += '<h3>' + data[key]['name'] + '</h3>';
            out += '<p>Цена: ' + data[key]['cost'] + '</p>';
            out += '<img src="' + data[key].image + '">';
            out += '<button class="add-to-cart" data-art="' + key + '">Купить</button>';
            out += '</div>';
        }
        $('#goods').html(out);
        $('button.add-to-cart').on('click', addToCart);
    });
}
function addToCart() {
    //добавляем товар в корзину
    var articul = $(this).attr('data-art');
    if (cart[articul] != undefined) {//проверка на наличие товара
        cart[articul]++;
    }
    else {
        cart[articul] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));//сохраняем значение корзины в localStorage
    //console.log(cart);
    showMiniCart();
}
function checkCart() {
    //проверяем наличие корзины в localStorage
    //console.log(localStorage.getItem('dddd'));
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));//значение из localeStorage обратно преобразовать в массив и положить в cart
    }
}
function showMiniCart() {
    //показываю содержимое корзины
    var out = '';
    for (var w in cart) {
        out += w + '---' + cart[w] + '<br>';
    }
    out+='<br><a href="cart.html">Корзина</a>'//переход в корзину
    $('#mini-cart').html(out);

}
