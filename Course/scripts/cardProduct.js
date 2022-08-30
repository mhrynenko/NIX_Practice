const colors = ['#EEAA56', '#A5C3B3', '#68171E', '#596479', '#EED737', 
                '#6F6D3A', '#2C354E', '#D2AD94', '#8A8767', '#0C0C0B']

$('.clr_radios input').each((i, value) => {
    value.style.backgroundColor = colors[i]; 
});

function addInCart() {
    let count = Number($('.counter .count').text());
    const cartStr = window.localStorage.getItem('cart');
    const productStr = window.localStorage.getItem('currentProduct');
    const product = JSON.parse(productStr);
    let cart = JSON.parse(cartStr) ?? {products: {}};
    let cartIndex = -1;
    let lastIndex = 0;
    for(let key in cart.products) {
        if (JSON.stringify(cart.products[key].product) === productStr) {
            cartIndex = key;
        }
        lastIndex = key;
    }
    if(cartIndex != -1) {
        cart.products[cartIndex].count += count;
    }
    else {
        cart.products[lastIndex + 1] = ({count: count, product: product});
    }
    let amount = Number($('.cart-btn .amount').text()) + count;
    $('.cart-btn .amount').text(amount);
    window.localStorage.setItem('cart', JSON.stringify(cart));
}

(function init() {
    let curProdStr = window.localStorage.getItem('currentProduct');
    if(!curProdStr) {
        window.location.href = '/';
        return;
    }

    let curProd = JSON.parse(curProdStr);
    let title = [curProd.type, curProd.compound, curProd.diametr, curProd.manufacturer, curProd.productLength].join(' ');
    $('.product-img').attr('src', curProd.defaultImg);
    
    $('.description h2:first-child').text(title);
    $('.description p').text(curProd.description || title);

    let vals = $('.characteristics .row .value');
    $(vals[0]).text(curProd.length || '-');
    $(vals[1]).text(curProd.manufacturer || '-');
    $(vals[2]).text(curProd.compound || '-');
    $(vals[3]).text(curProd.diametr || '-');

    let priceElems;
    if (curProd.priceNew) {
        priceElems = `
        <span class="old-price">
            ${curProd.priceOld}
        </span>
        <span class="new-price cost">
            ${curProd.priceNew}
        </span> `
    }
    else {
        priceElems = `<span class="cost">${curProd.priceOld}</span>`;
    }

    $('.cost-container').html(priceElems);
    setCounterEvents($('.counter')[0], $('.cost')[0]);

    const cartStr = window.localStorage.getItem('cart');
    let cart = JSON.parse(cartStr);
    if (!cart) {
        return;
    }

    let countProducts = 0;
    for (let key in cart.products) {
        if (!cart.products[key]) {
            continue;
        }
        
        countProducts += cart.products[key].count;
    }
    $('.my-btn-nav .amount').text(countProducts);
})();