
var cart = {};//корзина


$.getJSON('goods.json', function (data) {//вызываем фаил с товаром
    var goods = data;//загружаем данные из файла в переменную goods
    //console.log(goods);
    checkCart();
    //console.log(cart);
    showCart();//вывожу товары на страницу

    function showCart() {
        if ($.isEmptyObject(cart)) {//если корзина пуста 
            var out='Корзина пуста.Добавте товар в корзину.<a href="index.html">Главная страница</a>';
            $('#my-cart').html(out);
        }
        else {
            var out = '';
            for (var key in cart) {
                out += '<button class="delete" data-art="' + key + '">X</button>';
                out += '<img src="' + goods[key].image + '" width="48">';
                out += goods[key].name;
                out += '<button class="minus" data-art="' + key + '">-</button>';
                out += cart[key];
                out += '<button class="plus" data-art="' + key + '">+</button>';
                out += cart[key] * goods[key].cost;
                out += '<br>';
            }
            $('#my-cart').html(out);
            $('.plus').on('click', plusGoods);//вещаем на кнопку plus функцию plusGoods
            $('.minus').on('click', minusGoods);
            $('.delete').on('click', deleteGoods);
        }
    }

    function plusGoods() {//добавляем товар
        var articul = $(this).attr('data-art');// в переменную articul ложим значение 'data-art'
        //console.log(articul);//проверяем содержимое 
        cart[articul]++;//увеличиваю количество товара на 1
        saveCaroLS();//сохраняем данные в localStoreg
        showCart();//заново перерисовываем корзину
    }
    function minusGoods() {//добавляем товар
        var articul = $(this).attr('data-art');// в переменную articul ложим значение 'data-art'
        if (cart[articul] > 1) {
            cart[articul]--;
        }
        else {
            delete cart[articul];
        }//тогда удалить товар из корзины
        saveCaroLS();//сохраняю корзину в localStorage
        showCart();//заново перерисовываем корзину
    }
    function deleteGoods() {//удаляем товар
        var articul = $(this).attr('data-art');// в переменную articul ложим значение 'data-art'
        delete cart[articul];// удалить товар из корзины
        saveCaroLS();//сохраняю корзину в localStorage
        showCart();//заново перерисовываем корзину
    }
});
function checkCart() {
    //проверяем наличие корзины в localStorage
    //console.log(localStorage.getItem('dddd'));
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));//значение из localeStorage обратно преобразовать в массив и положить в cart
    }
}
function saveCaroLS() {
    localStorage.setItem('cart', JSON.stringify(cart));//сохраняем значение корзины в localStorage
}
