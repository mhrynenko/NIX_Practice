let totalItems = $('.carousel-item').length;
let currentIndex = $('div.carousel-item.active').index() + 1;
$('.counter').html(''+currentIndex+'/'+totalItems+'');

$('.carousel').on('slid.bs.carousel', function() {
    currentIndex = $('div.carousel-item.active').index() + 1;
   $('.counter').html(''+currentIndex+'/'+totalItems+'');
});

function addInCart(index) {
    const cartStr = window.localStorage.getItem('cart');
    const product = products[index];
    const productStr = JSON.stringify(product);
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
        cart.products[cartIndex].count++;
    }
    else {
        cart.products[lastIndex + 1] = {count: 1, product: product};
    }
    let amount = Number($('.cart-btn .amount').text()) + 1;
    $('.cart-btn .amount').text(amount);
    window.localStorage.setItem('cart', JSON.stringify(cart));
}

function goToProductPage(index) {
    window.localStorage.setItem('currentProduct', JSON.stringify(products[index]));
    window.location.href = '/cardProduct.html'
}

const products = [
    {
        type : 'Шпагат',
        description: `
            Хлопковый шпагат для рукоделия 4 мм состоит из 100 тонких скрученных нитей. 
            Для создания модных перьев (листьев), кисточек, панно, ловцов снов, брелков, 
            украшений, салфеток, кашпо, наволочек и других изделий в технике макраме. 
            Мягкий и приятный на ощупь, при желании, можно легко расплести в бахрому.
        `,
        compound : '100% бавовна',
        diametr : '4 мм',
        manufacturer: 'Macrametr',
        length: '100 м',
        productLength : '100 нитей',
        colors : ['1', '2', '3', '4', '5', '6', '7', '8'],
        priceOld : '332 $',
        priceNew : null,
        defaultImg : './img/macrametr.png'
    },
    {
        type : 'Шпагат джутовый',
        compound : 'Хлопок',
        diametr : '3 мм',
        manufacturer: 'Сибшнур',
        productLength : '500 м',
        colors : ['1', '2', '3'],
        priceOld : '422 $',
        priceNew : '385 $',
        defaultImg : './img/twine.png'
    },
    {
        type : 'Пряжа',
        compound : 'Синтетика',
        diametr : '4,5 мм',
        manufacturer: 'Macrametr',
        productLength : '500 м',
        colors : ['1', '2', '3', '4', '5', '6'],
        priceOld : '1092 $',
        priceNew : null,
        defaultImg : './img/arachna_maxi.png'
    },
    {
        type : 'Пряжа',
        compound : 'Синтетика',
        diametr : '3 мм',
        manufacturer: 'Arachna "Macrame MINI"',
        productLength : '500 м',
        colors : ['1', '2', '3', '4', '5', '6'],
        priceOld : '1053 $',
        priceNew : null,
        defaultImg : './img/arachna_mini.png'
    },
    {
        type : 'Шнур',
        compound : 'Хлопок',
        diametr : '0.8 мм',
        manufacturer: 'Гамма',
        productLength : '500 м',
        colors : ['1', '2', '3', '4', '5', '6'],
        priceOld : '852 $',
        priceNew : null,
        defaultImg : './img/gamma.png'
    },
    {
        type : 'Веревка',
        compound : 'С сердечником',
        diametr : '4 мм',
        manufacturer: 'Зефирка',
        productLength : '100 м',
        colors : ['1', '2', '3', '4', '5'],
        priceOld : '617 $',
        priceNew : null,
        defaultImg : './img/zefirka.png'
    }
]

let showedItems = products.slice();

function NewCard(data, index) {
    let card = document.createElement('div');
    card.classList.add('col');
    card.dataset.index = index;
    let title = [data.type, data.compound, data.diametr, data.manufacturer, data.productLength].join(' ');
    let priceElems;
    if (data.priceNew) {
        priceElems = `
        <span class="old-price">
            ${data.priceOld}
        </span>
        <span class="new-price">
            ${data.priceNew}
        </span> `
    }
    else {
        priceElems = `<span>${data.priceOld}</span>`;
    }
    card.innerHTML = `
        <div class="card h-100">
            <div class="container d-flex card-top">
                <div class="container heart ${index}" onclick="saveToChoosen(${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                    </svg>
                </div>
                <div class="container dots">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                </div>
            </div>
            <img src="${data.defaultImg}" class="card-img-top product-image" onclick="goToProductPage(${index})" alt="...">
            <div class="card-body">
                <p class="card-text" onclick="goToProductPage(${index})">${title}</p>
                <div class="container d-flex colors">
                    <ul class="list-unstyled d-flex">
                        <li>
                            <a href="">
                                <div class="container color yellowMetal"></div>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <div class="container color antiqueRuby"></div>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <div class="container color sandyBrown"></div>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <div class="container color sandStorm"></div>
                            </a>
                        </li>
                        <li>
                            <a href="">
                                <div class="container color extra">+5</div>
                            </a>
                        </li>
                    </ul>
                </div>
                <h5 class="card-title">
                    <div class="row">
                        <div class="col">
                            ${priceElems}   
                        </div>
                    </div>
                </h5>
                <button class="btn inCart-btn" onclick="addInCart(${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket3-fill" viewBox="0 0 16 16">
                        <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z"/>
                    </svg>
                    В корзину
                </button>
            </div>
        </div>
    `;
//<h5 class="card-title">${data.priceNew ?? data.priceOld}</h5>
    return card;
}

(function init() {
    fillProductDiv(products);
    $('.choosed span')[0].innerHTML = products.length;

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
    $('.cart-btn .amount').text(countProducts);
})();


function clearProductDiv() {
    let productDiv = $('div.product-list')[0];
    let child = productDiv.lastElementChild; 
    while (child) {
        productDiv.removeChild(child);
        child = productDiv.lastElementChild;
    }
}

function fillProductDiv(items) {
    let productDiv = $('div.product-list')[0];

    for(let i = 0; i < items.length; i++) {
        let card = NewCard(items[i], products.findIndex(product => JSON.stringify(product) === JSON.stringify(items[i])));
        productDiv.append(card);
    }
}

function applyFilters() {
    let filters = [];
    Array.from($('.list-group')).forEach((filter, index) => {
        let filterType = filter.dataset.filtertype;
        let filterParametrs = filter.children;
        
        let checkedFilters = Array.from(filterParametrs).filter((parametr) => {
            if(parametr.children[0].checked) {
                return parametr.children[0];
            }
        })

        if (checkedFilters.length !== 0) {
            filters.push({
                type : filterType,
                checked : checkedFilters
            })
        }

    });

    if (filters.length === 0) {
        $('.choosed span')[0].innerHTML = products.length;
        clearProductDiv();
        fillProductDiv(products);
        return;
    }

    let finalItems = [];

    filters.forEach((filter) => {
        let filteredItems = products.filter((item) =>{
            let flag = false;
            for (let i = 0; i < filter.checked.length; i++) {
                let filterParamSplited = filter.checked[i].lastElementChild.value.toLowerCase().split(' ');
                let itemType = item[filter.type].toLowerCase().split(' ')[0];
                if (filterParamSplited.includes(itemType)) {
                    flag = true;
                    break;
                }
            }

            if (flag) {
                return item;
            }
        })

        finalItems.push(filteredItems.slice());
    })

    let tmp = [];
    for (const filtered of finalItems) {
        tmp.push(...filtered);
    }

    if(JSON.stringify(tmp) !== JSON.stringify(finalItems[0])) {
        finalItems = tmp.filter((item, index) => tmp.indexOf(item) !== index);
    }
    else {
        finalItems = finalItems[0].slice();
    }
    finalItems = finalItems.filter((item, index) => finalItems.indexOf(item) === index);

    if (JSON.stringify(showedItems) === JSON.stringify(finalItems)){ 
        return;
    }

    showedItems = finalItems.slice();

    $('.choosed span')[0].innerHTML = finalItems.length;

    clearProductDiv();

    fillProductDiv(finalItems);
}

function clearFilters() {
    Array.from($('.list-group')).forEach((filter) => {
        Array.from(filter.children).forEach((parametr) => {
            parametr.children[0].checked = false;
        })

    });
}

function lowToHigh() {
    let button = $('.price-low-high');
    
    if (button.hasClass('activated')) {
        button.removeClass('activated');
        clearProductDiv();
        fillProductDiv(showedItems);
    } else {
        button.addClass('activated');
        $('.price-high-low').removeClass('activated')

        let sorted = showedItems.slice();
        sorted.sort((a, b) => {
            let aPrice = a.priceNew === null ? a.priceOld : a.priceNew; 
            let bPrice = b.priceNew === null ? b.priceOld : b.priceNew;
            aPrice = Number(aPrice.split(' ')[0]);
            bPrice = Number(bPrice.split(' ')[0]);

            return aPrice- bPrice;
        });

        clearProductDiv();
        fillProductDiv(sorted);
    }
}

function highToLow() {
    let button = $('.price-high-low');
    
    if (button.hasClass('activated')) {
        button.removeClass('activated');
        clearProductDiv();
        fillProductDiv(showedItems);
    } else {
        button.addClass('activated');
        $('.price-low-high').removeClass('activated')

        let sorted = showedItems.slice();
        sorted.sort((a, b) => {
            let aPrice = a.priceNew === null ? a.priceOld : a.priceNew; 
            let bPrice = b.priceNew === null ? b.priceOld : b.priceNew;
            aPrice = Number(aPrice.split(' ')[0]);
            bPrice = Number(bPrice.split(' ')[0]);

            return bPrice - aPrice;
        });

        clearProductDiv();
        fillProductDiv(sorted);
    }
}


function saveToChoosen(index) {
    let heart = $(`.heart.${index}`);

    if (heart.hasClass('chosenOne')) {
        heart.removeClass('chosenOne');
        heart.children().html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>`);
       
        const chosenList = JSON.parse(window.localStorage.getItem('chosenList')) ?? [];
        let indexToDel = chosenList.findIndex(object => object.index === index);
        chosenList.splice(indexToDel, 1);
        window.localStorage.setItem('chosenList', JSON.stringify(chosenList));

    } 
    else {
        heart.addClass('chosenOne');
        heart.children().html(`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>`);
        
        const chosenList = JSON.parse(window.localStorage.getItem('chosenList')) ?? [];
        chosenList.push({
            index : index,
            product : products[index]
        });
        window.localStorage.setItem('chosenList', JSON.stringify(chosenList));
    }
}
