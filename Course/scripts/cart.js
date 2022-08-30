function showEmpty() {
    let div = document.createElement('div');
    div.classList.add('empty');
    div.innerHTML = `<p>Пусто :(</p>`
    $('.product-list').append(div);
}

function updateCheck() {
    const counts = $('.counter .count');
    const costs = $('.cost.total-cost');
    let countSum = 0;
    let totalCost = 0;
    let discountSum = 0;
    for (let i = 0; i < counts.length; i++) {
        let count = +$(counts[i]).text();
        let discount = +costs[i].dataset.discount * count;
        countSum += count;
        totalCost += parseFloat($(costs[i]).text()) + discount;
        discountSum += discount;
    }
    $('.discount').text(discountSum + ' $');
    $('.checkout .cost').text(totalCost + ' $');

    $('.checkout .product-count').text(countSum);
    $('.checkout .total-cost').text(totalCost - discountSum + ' $');

    if (!countSum) {
        showEmpty();
    }
}


function initBasket() {
    const cartStr = window.localStorage.getItem('cart');
    const cart = JSON.parse(cartStr) ?? {};

    if (!cart.products) {
        showEmpty();
        return;
    }

    let countProducts = 0;
    for (let index in cart.products) {
        if (!cart?.products[index]) { 
            continue;
        }
        countProducts += cart.products[index].count;
        let productPosition = NewProductPosition(cart.products[index], index);
        $('.product-list').append(productPosition);
    }
    $('.cart-btn .amount').text(countProducts);

    const costs = $('.cost.total-cost');
    $('.counter').each((i, counter) => {
        setCounterEvents(counter, costs[i]);
        $(costs[i]).change(()=>{
            updateCheck();
        });
    });
}

function deleteProduct(index) {
    $(`.check-position[data-index=${index}]`).remove();
    const cartStr = window.localStorage.getItem('cart');
    let cart = JSON.parse(cartStr);
    let amount = (+$('.cart-btn .amount').text()) - cart.products[index].count;
    $('.cart-btn .amount').text(amount);
    delete cart.products[index];
    window.localStorage.setItem('cart', JSON.stringify(cart));
    updateCheck();
}

function NewProductPosition(data, index) {
    let product = document.createElement('div');
    let count = data.count;
    data = data.product;
    product.classList.add('row');
    product.classList.add('check-position');
    product.dataset.index = index;
    let title = [data.type, data.compound, data.diametr, data.manufacturer, data.productLength].join(' ');
    let price = data.priceOld;
    let discount = 0;
    if (data.priceNew) {
        discount = parseFloat(data.priceOld) - parseFloat(data.priceNew);
        price += `<br>(-${discount} $)`
    }
    product.innerHTML = `
        <div class="col-lg-2 d-flex justify-content-center align-items-center">
            <img src="${data.defaultImg}" class="d-block photo">
        </div>
        <div class="col-lg-4 d-flex justify-content-center align-items-center">
            <span>${title}</span>
        </div>
        <div class="col-lg-1 d-flex justify-content-center align-items-center">
            <span class="cost">${price}</span>
        </div>
        <div class="col-lg-2 d-flex justify-content-center align-items-center">
            <div class="counter-container col-lg-3 col-md-3 col-sm-12 d-flex justify-content-center">
                <div class="counter">
                    <span class="minus">-</span>
                    <span class="count">${count}</span>
                    <span class="plus">+</span>
                </div>
            </div>
        </div>
        <div class="col-lg-2 d-flex justify-content-center align-items-center">
            <span class="cost total-cost" data-discount=${discount}>${(parseFloat(price) - discount)* count} $</span>
        </div>
        <div class="col-lg-1 d-flex justify-content-center align-items-center">
            <a href="javascript:deleteProduct(${index})"><img src="img/trashcan.png" class="d-block trashcan"></a>
        </div>
    `;

    return product;

}

initBasket();
updateCheck();