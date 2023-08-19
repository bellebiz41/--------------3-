var product = [{
    id: 1,
    img: 'https://scontent.fcnx4-1.fna.fbcdn.net/v/t1.15752-9/367398616_826792422168583_2760816979625070052_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHWbC-A6LSAfcvdTGWdCg8oFaVhg0hEtaMVpWGDSES1ozhi7WvharGxj3Ru1iskSxFqKKmO1sRrKo4H33ggId3I&_nc_ohc=rqRj8__WXJYAX_xjN0y&_nc_ht=scontent.fcnx4-1.fna&oh=03_AdSfh2WFlCtPXJ9DSMFM-GhTykj_XZdhyb1mxYmwclgg4w&oe=6506F903',
    name: 'Kuromi',
    price: 450,
    description: 'Kuromi Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'dolls'
}, {
    id: 2,
    img: 'https://scontent.fcnx4-1.fna.fbcdn.net/v/t1.15752-9/368682215_602634315405608_7180268668159956750_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeF7dfd0M1JTywYVEf3w0IGckppz32N1HqmSmnPfY3UeqcxAk0p9c8dHsXQBRj5-DD1c7qar9MRT7ucO9gKQwqOK&_nc_ohc=V0wWCzuEykIAX9F6Xs5&_nc_ht=scontent.fcnx4-1.fna&oh=03_AdS_s08c5_3sS1zr-tNSaJhbrjgZMJJXVeKWoMlGVQMDIA&oe=65073432',
    name: 'pompompurin',
    price: 1500,
    description: 'pompompurin Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'lamp'
}, {
    id: 3,
    img: 'https://scontent.fcnx4-1.fna.fbcdn.net/v/t1.15752-9/367734780_320257690438845_897646736093720439_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeEQeBA0m-wKRZxFZHPPqUeOukE-CyDCbmW6QT4LIMJuZRtcLfgVQtWQEDuH3Vp7Cw8glj3UupHVYI7NY1zc1G0l&_nc_ohc=DxhxELkw8WQAX9QgHOt&_nc_ht=scontent.fcnx4-1.fna&oh=03_AdQJMDGnEoPMhVW8iTJ3a2GpNiwKtR1btkCSnVQj198QrQ&oe=6506D4EA',
    name: 'korikuma',
    price: 890,
    description: 'korikuma Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'dolls'
}, {
    id: 3,
    img: 'https://scontent.fcnx4-1.fna.fbcdn.net/v/t1.15752-9/367418776_1058645555519736_8019449074798113722_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHnhOJ8tcqWM7QpzBZLn4jaPcd1jkH37BQ9x3WOQffsFA5g0on9sL8IzP95etppBNH8bIi5li5cR0-Wc0_VPRol&_nc_ohc=-ac-4xPgE6oAX8XjWEk&_nc_ht=scontent.fcnx4-1.fna&oh=03_AdTPFekVscSLP1fY1zQzTl_6X9T6Cpq-DObgMf6heufdqw&oe=65073AB6',
    name: 'Kuromi milk',
    price: 1290,
    description: 'Kuromi Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, labore dolorum optio ad consequatur cupiditate!',
    type: 'dolls'
}];

$(document).ready(() => {
    var html = '';
    for (let i = 0; i < product.length; i++) {
        html += `<div onclick="openProductDetail(${i})" class="product-items ${product[i].type}">
                    <img class="product-img" src="${product[i].img}" alt="">
                    <p style="font-size: 1.2vw;">${product[i].name}</p>
                    <p stlye="font-size: 1vw;">${numberWithCommas(product[i].price)} THB</p>
                </div>`;
    }
    $("#productlist").html(html);

})
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

var productindex = 0;
function openProductDetail(index) {
    productindex = index;
    console.log(productindex)
    $("#modalDesc").css('display', 'flex')
    $("#mdd-img").attr('src', product[index].img);
    $("#mdd-name").text(product[index].name)
    $("#mdd-price").text(numberWithCommas(product[index].price) + ' THB')
    $("#mdd-desc").text(product[index].description)
}
function closeModal() {
    $(".modal").css('display', 'none')

}
var cart = [];
function addtocart() {
    var pass = true;

    for (let i = 0; i < cart.length; i++) {
        if( productindex == cart[i].index) {
            console.log('found same product')
            cart[i].count++;
            pass = false;
        }
    }
    if(pass) {
        var obj = {
            index: productindex,
            id: product[productindex].id,
            name: product[productindex].name,
            price: product[productindex].price,
            img: product[productindex].img,
            count: 1
        };
        //console.log(obj)
        cart.push(obj)
    }
    console.log(cart)

    Swal.fire({
        icon: 'success',
        title: 'Add ' + product[productindex].name + ' to cart !'


    })
    $("#cartcount").css('display', 'flex').text(cart.length)
}
function openCart() {
    $("#modalCart").css('display','felx')
    rendercart();
}

function rendercart() {
    if(cart.length > 0 ) {
        var html = '';
        for (let i = 0; i < cart.length; i++) {
            html += `<div class="cartlist-items">
                        <div class="cartlist-left">
                        <img src="${cart[i].img}" alt="">
                        <div class="cartlist-detail">
                            <p style="font-size: 1.5vw;">${cart[i].name}</p>
                            <p style="font-size: 1.2vw;">${numberWithCommas(cart[i].price * cart[i].count)} THB </p>
                        </div>
                        </div>
                        <div class="cartlist-right">
                        <p class="btnc">-</p>
                        <p style="margin: 0 20px;">${cart[i].count}</p>
                        <p class="btnc">+</p>
                        </div>
                    </div>`;

        }
        $("#mycart").html(html)
    }
    else {
        $("mycart").html(`<p>Not found product list</p>`)
    }
}
function deinitems(action, index) {
    if(action == '-') {
        if(cart[index].count > 0) {
            cart[index].count--;
            $("#countitems"+index).text(cart[index].count)

            if(cart[index].count <= 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Are you sure to delete?',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel'
                }).then((res) => {
                  if(res.isConfirmed) {
                     cart.splice(index, 1) 
                     console.log(cart)
                     rendercart();
                     $("#cartcount").css('display','flex').text(cart.length)
                     
                     if(cart.length <= 0) {
                        $("#cartcount").css('display','none')
                     }
                  }  
                  else {
                    cart[index].count++;
                    $("#countitems"+index).text(cart[index].count)
                    rendercart();
                  }
                })
            }
            rendercart();
        }
        
    }
    else if(action == '+') {
        cart[index].count++;
        $("#countitems"+index).text(cart[index].count)
        rendercart();
    }
}