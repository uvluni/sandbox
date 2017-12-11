var products = [{
        selector: "#recent",
        items: [{
                "photo": "https://robohash.org/omnisaliaspraesentium.bmp?size=200x150&set=set1",
                "title": "Wine - Rhine Riesling Wolf Blass",
                "price": "235.49"
            },
            {
                "photo": "https://robohash.org/veritatisinaut.jpg?size=200x150&set=set1",
                "title": "Bread - Mini Hamburger Bun",
                "price": "192.91"
            },
            {
                "photo": "https://robohash.org/molestiasminimareiciendis.png?size=200x150&set=set1",
                "title": "Beans - Soya Bean",
                "price": "105.57"
            },
            {
                "photo": "https://robohash.org/etoditvitae.bmp?size=200x150&set=set1",
                "title": "Fish - Halibut, Cold Smoked",
                "price": "182.49"
            },
            {
                "photo": "https://robohash.org/quiverorerum.bmp?size=200x150&set=set1",
                "title": "Lamb - Loin, Trimmed, Boneless",
                "price": "193.48"
            }
        ]
    },
    {
        selector: "#favorites",
        items: [{
                "photo": "https://robohash.org/occaecatisintaut.bmp?size=200x150&set=set1",
                "title": "Beef - Chuck, Boneless",
                "price": "483.18"
            },
            {
                "photo": "https://robohash.org/nihilenimsed.bmp?size=200x150&set=set1",
                "title": "Wine - Jaboulet Cotes Du Rhone",
                "price": "43.57"
            },
            {
                "photo": "https://robohash.org/asperioresquisquamquis.png?size=200x150&set=set1",
                "title": "Scrubbie - Scotchbrite Hand Pad",
                "price": "231.79"
            },
            {
                "photo": "https://robohash.org/istenamofficiis.bmp?size=200x150&set=set1",
                "title": "Pepper - Yellow Bell",
                "price": "30.35"
            },
            {
                "photo": "https://robohash.org/molestiaesedenim.png?size=200x150&set=set1",
                "title": "Trueblue - Blueberry",
                "price": "400.09"
            }
        ]
    }
];

function shop(products, cartSelector) {
    var cart = (function(selector) {

        return { addItem: addItem };
    })(cartSelector);

    for (var i = 0; i < products.length; ++i) {
        var prod = products[i];
        var product = new ProductList(prod.items, prod.selector, cartSelector);
    }
}

function ProductList(items, selector, cart) {
    var container = $(selector);
    items.forEach(function(element, i) {
        // create the product div
        var btn = $('<button>').text('Add to Cart');
        btn.data('prod', {
            sku: element.sku,
            title: element.title,
            price: element.price
        });
        btn.click(function() {
            cart.addItem($(this).data('prod'));
        });
        // add product div to container
    });
}

function addItem(sku, title, price) {
    if (typeof sku === 'object' && arguments.length === 1) {
        title = sku.title;
        price = sku.price;
        sku = sku.sku;
    }

    // Do all the rest
}