
var cart = {};//корзина


$.getJSON('goods.json', function (data) {//вызываем фаил с товаром
    var goods = data;//загружаем данные из файла в переменную goods
    //console.log(goods);
    checkCart();
    //console.log(cart);
    showCart();//вывожу товары на страницу

    function showCart() {
        var out = '';
        for (var key in cart) {
            out += '<button class="delete">X</button>';
            out += '<img src="' + goods[key].image + '" width="48">';
            out+=goods[key].name;
            out += '<button class="minus">-</button>';
            out+=cart[key];
            out += '<button class="plus">+</button>';
            out+=cart[key]*goods[key].cost;
            out+='<br>';
        }
        $('#my-cart').html(out);

    }
});
function checkCart() {
    //проверяем наличие корзины в localStorage
    //console.log(localStorage.getItem('dddd'));
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));//значение из localeStorage обратно преобразовать в массив и положить в cart
    }
}
