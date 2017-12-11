$(document).ready(function() {
    var currency = "$";
    $("#product-list").Shop("#cart-list", currency);
});

$.fn.Shop = function(cartSelector, currency) {
    var loadFrom = 1;
    var loadTo = 24;
    var productsSelector = "#" + this[0].id;

    var Cart = (function(cartSelector) {
        function addToCart(productDataObject) { ////!! add productDataObject parameter fro mbtn press instead of getting from DOM
            itemIndex = $(this).attr("data-product-index");
            var existingItemInCart = $("#" + itemIndex);
            // Check if product is already in cart, if not, add it
            if (!existingItemInCart.length) {
                addProductToCartFirstTime();
            } else { // If yes, change quantity
                changeLineQuantityOnCart(1);
                changeLineTotalOnCart(1);
                changeSubTotalQty();
            }
        }

        // Creates a new tr, where each td has name, QTY, price and total + append it to cart
        // Each tr gets index of it's location in the JSON file
        // tdQty gets class "tdQty", tdPrice gets class "tdPrice", tdTotal gets class "tdTotal"
        function addProductToCartFirstTime() {
            var product = getProductPropertiesFromButton(itemIndex);
            var tdName = $("<td>", { class: "tdName" }).text(product.name);
            var qtyInput = $("<input>", { type: "number", min: "1", max: "20", class: "tdQty" }).val(1);
            var tdQty = $("<td>").append(qtyInput);
            var tdPrice = $("<td>", { class: "tdPrice" }).text(currency + product.price.toFixed(2));
            var tdTotal = $("<td>", { class: "tdTotal" }).text(currency + product.price.toFixed(2));
            delItem = $("<td>").append($("<a>", { href: "#", class: "delItem" }).text("X"));

            var line = $("<tr>", { id: itemIndex, class: "cart-line" });
            line.append(tdName, tdQty, tdPrice, tdTotal, delItem);
            $(cartSelector + " #cart tr:last").before(line);
            changeSubTotalQty();

            changeSubTotal();
            addListenerChangeQtyUpDown(qtyInput);
        }

        // Changes QTY of a line in the cart
        function changeLineQuantityOnCart(sign) {
            var tdQty = $("#" + itemIndex + " .tdQty");
            var newQty = parseInt(tdQty.val()) + sign;
            tdQty.val(newQty);
        }

        // Changes Total of a line in the cart
        function changeLineTotalOnCart(qty) {
            var tdTotal = $("#" + itemIndex + " .tdTotal");
            var tdQty = $("#" + itemIndex + " .tdQty");
            var tdPrice = $("#" + itemIndex + " .tdPrice");
            var cleanPrice = parseFloat(tdPrice.text().replace(currency, ""));

            tdTotal.text(currency + (parseInt(tdQty.val()) * cleanPrice).toFixed(2));
            changeSubTotal();
        }

        function changeSubTotalQty() {
            var thQty = $("#sub-qty");
            var newSubQty = 0;

            $(".tdQty").each(function(index, element) {
                var lineQty = $(this).val();
                newSubQty += parseInt(lineQty);
            });
            thQty.text(newSubQty);
        }

        function changeSubTotal() {
            var newSubTotal = 0;
            $(".tdTotal").each(function(index, element) {
                var lineTotal = parseFloat($(this).text().replace(currency, ""));
                newSubTotal += lineTotal;
            });
            $("#sub-total").text(currency + parseFloat(newSubTotal).toFixed(2));
        }

        function addListenerDeleteCartLine() {
            $(cartSelector + " #cart").on("click", ".delItem", function() {
                var selectToDelete = $(this).parent().parent();
                var lineTotal = selectToDelete.children()[3];
                var oldLineTotal = $(lineTotal).text();
                var cleanOldLineTotal = oldLineTotal.replace(currency, "");

                var lineQtyTd = selectToDelete.children()[1];
                var lineQty = $(lineQtyTd).children();
                var oldLineQty = $(lineQty).val();

                selectToDelete.fadeOut(200, function() {
                    selectToDelete.remove();
                    changeSubTotal();
                    changeSubTotalQty();
                });
            });
        }

        function addListenerChangeQtyUpDown(tdQty) {
            $(tdQty).data("oldVal", $(tdQty).val());
            $(tdQty).on("input", function() {
                var newVal = parseInt($(this).val());
                var oldVal = $(this).data("oldVal");
                var diff = newVal - oldVal;
                changeLineTotalOnCart(diff);
                changeSubTotalQty();
                $(this).data("oldVal", newVal)
            });
        }

        function addListenerPayWithPayPal() {
            $("#paypal_btn").on("click", function() {
                payPalCheckout();
            })
        };

        function buildCartArray() {
            var cartContent = [];
            var cartTrs = $("#cart").find("tbody").find("tr.cart-line");
            cartTrs.each(function(index, element) {
                var lineName = $(this).find("td.tdName").text();
                var lineQty = $(this).find("td input").val();
                var linePrice = $(this).find("td.tdPrice").text().replace("$", "");
                var lineObject = {
                    name: lineName,
                    qty: lineQty,
                    price: linePrice
                }
                cartContent.push(lineObject);
            });
            return cartContent;
        }

        function payPalCheckout() {
            $form = $('<form id="paypal-checkout" action="https://www.paypal.com/cgi-bin/webscr" method="post">');
            $form.append('<input type="hidden" name="cmd" value="_cart">');
            $form.append('<input type="hidden" name="upload" value="1">');
            $form.append('<input type="hidden" name="business" value="ronny@hoojima.com">');
            $form.append('<input type="hidden" name="image_url" value="http://www.experis-software.co.il/wp-content/uploads/2015/01/logo.jpg">');


            createCartProductsPaypalFormat($form);

            $("#cart").append($form);
            $form.submit();
        }

        function createCartProductsPaypalFormat($form) {
            var cartContent = buildCartArray();
            var prefix = '<input type="hidden" name="';
            for (var cartIndex = 1; cartIndex <= cartContent.length; ++cartIndex) {
                var itemName = cartContent[cartIndex - 1].name;
                var itemPrice = cartContent[cartIndex - 1].price;
                var itemQty = cartContent[cartIndex - 1].qty;

                $form.append(prefix + 'item_name_' + cartIndex + '" value="' + itemName + '">');
                $form.append(prefix + 'amount_' + cartIndex + '" value="' + itemPrice + '">');
                $form.append(prefix + 'quantity_' + cartIndex + '" value="' + itemQty + '">');
            }
        }

        $(function() {
            $(window).scroll(function() {

                if ($(window).scrollTop() >= ($(document).height() - $(window).height())) {
                    $("footer").addClass("show");
                    $("footer").delay("slow").fadeIn();
                    loadFrom = loadFrom += 24;
                    loadTo = loadTo += 24;
                    addProductsToDom(loadFrom, loadTo);
                    $("footer").delay("slow").fadeOut();
                }
                if ($(window).scrollTop() > $(cartSelector).offset().top) {
                    $(cartSelector).children().addClass("cart-fixed");
                } else {
                    $(cartSelector).children().removeClass("cart-fixed");
                }
            });
        });

        return {
            addToCart: addToCart,
            addListenerDeleteCartLine: addListenerDeleteCartLine,
            addListenerPayWithPayPal: addListenerPayWithPayPal,
            payPalCheckout: payPalCheckout
        }
    })(cartSelector);

    function addProductsToDom(from, to) {
        $.ajax({
            url: "http://wpwith.us/experis/cart-products-ajax.php",
            type: "POST",
            dataType: "json",
            crossDomain: true,
            cache: false,
            data: { from: from, to: to },
            success: function(data) {
                createProduct(data, from, to);
            }
        });
    }

    function createProduct(data, from, to) {
        for (var i = 0; i < data.length; ++i) {
            var product = data[i];
            var productIndex = i + from;
            var name = product.name;
            var price = parseFloat(product.price).toFixed(2);
            var image = product.image;
            var newProduct = $("<div>", { class: "product", "data-currency": currency });
            var newImage = $("<img>", { class: "image", src: image });
            var newName = $("<p>", { class: "name" });
            var newPrice = $("<p>", { class: "price" });
            var newButton = $('<input/>').attr({ type: "button", class: "add-button " + productIndex, value: "Add", "data-product-index": productIndex, "data-name": name, "data-price": price });
            newName.text(name);
            newPrice.text(currency + price);
            newProduct.append(newImage, newName, newPrice, newButton);
            $(productsSelector).append(newProduct);
        }
        addListenerBuyButton();
    }

    function getProductPropertiesFromButton(itemIndex) {
        var name = $("." + itemIndex).data("name");
        var price = $("." + itemIndex).data("price");
        return {
            "name": name,
            "price": price
        }
    }

    // Clicking on Add, adds the product to the cart
    function addListenerBuyButton() {
        $(productsSelector + " .add-button").click(Cart.addToCart);

        $(productsSelector + " .add-button").on("click", function() {
            var itemImg = $(this).parent().find("img");
            flyToCart($(itemImg), $("#total-title"));
        });
    }

    // Recives the object to fly and the flying id in the DOM
    function flyToCart(flyer, flyingTo) {
        var $func = $(this);
        var divider = 10;
        var flyerClone = $(flyer).clone();
        $(flyerClone).css({ position: "absolute", top: $(flyer).offset().top + "px", left: $(flyer).offset().left + "px", opacity: 1, "z-index": 200 });
        $("body").append($(flyerClone));
        var gotoX = $(flyingTo).offset().left + ($(flyingTo).width() / 2) - ($(flyer).width() / divider) / 2 + 10;
        var gotoY = $(flyingTo).offset().top + ($(flyingTo).height() / 2) - ($(flyer).height() / divider) / 2 - 33;

        $(flyerClone).animate({
                opacity: 0.5,
                left: gotoX,
                top: gotoY,
                width: $(flyer).width() / divider,
                height: $(flyer).height() / divider
            }, 500,
            function() {
                $(flyerClone).fadeOut("ease", function() {
                    $(flyerClone).remove();
                });
            });
    }

    addProductsToDom(loadFrom, loadTo);
    addListenerBuyButton();
    Cart.addListenerDeleteCartLine();
    Cart.addListenerPayWithPayPal();
    // Cart.payPalCheckout();

}