// USER INTERACTION
$(document).ready(function() {
  var position = 1;
  $("#btn-start-order").click(function(){
    $("#landing").addClass("hide");
    $("#order-form").removeClass("hide");
  });
  $("#btn-form").click(function() {
    var formPosition = "step" + (position ++).toString();
    $("#" + formPosition).removeClass("hide");
    if(formPosition === "step6") {
      $("#btn-form").addClass("hide");
    }
  });
  $("#btn-review").click(function() {
    var personName = $("input#person-name").val();
    var personEmail = $("input#person-email").val();
    var pizzaSize = $("#size-selector").val();
    var pizzaCrust = $("#crust-selector").val();
    var pizzaCheese = $("#cheese-selector").val();
    var extrasDrink = $("#drink-selector").val();
    var extrasSalad = $("#salad-selector").val();
    var extrasSide = $("#side-selector").val();

    var orderPerson = new Person(personName, personEmail);
    var orderPizza = new Pizza(pizzaSize, pizzaCheese, pizzaCrust);
    var orderExtras = new Extras(extrasDrink, extrasSalad, extrasSide);
    var currentOrder = new Order(orderPerson, orderPizza, orderExtras);

    $("#topping-selector").each(function() {
      orderPizza.toppings.push($(this).val());
    });

    orderPizza.calculatePrice();
    orderExtras.calculatePrice();
    currentOrder.calculateTotal();

    $("#order-form").addClass("hide");
    $("#review-screen").removeClass("hide");
    $("#order-name").text(currentOrder.person.name);
    $("#order-email").text(currentOrder.person.email);
    $("#order-size").text(currentOrder.pizzas.size);
    $("#order-crust").text(currentOrder.pizzas.crust);
    $("#order-cheese").text(currentOrder.pizzas.cheese);
    $("#order-toppings").text(currentOrder.pizzas.toppings);
    $("#order-drinks").text(currentOrder.extras.drinks);
    $("#order-salad").text(currentOrder.extras.salad);
    $("#order-side").text(currentOrder.extras.side);
    $("#pizza-price").text(currentOrder.pizzas.price);
    $("#extras-price").text(currentOrder.extras.price);
    $("#order-total").text(currentOrder.total);
  });

  $("#btn-submit-order").click(function() {
    $("#review-screen").addClass("hide");
    $("#order-confirmation").removeClass("hide");
  });

  $("#btn-home").click(function() {
    location.reload(true);
  })


});


//BUSINESS LOGIC


//OBJECT CONSTRUCTORS

//person constructor
function Person(name, email) {
  this.name = name;
  this.email = email;
}

//pizza constructor
function Pizza(size, cheese, crust) {
  this.size = size;
  this.cheese = cheese;
  this.crust = crust;
  this.toppings = [];
  this.price = 12;
}

//extras constructor
function Extras(drinks, salad, side) {
  this.drinks = drinks;
  this.salad = salad;
  this.side = side;
  this.price = 0;
}

//order constructor
function Order(person, pizza, extras) {
  this.person = person;
  this.pizzas = pizza;
  this.extras = extras;
  this.total = 0;
}

// PROTOTYPES


// Calculate Pizza Price
Pizza.prototype.calculatePrice = function() {
  this.price += (this.toppings.length * 0.50);

  if(this.size === "Medium") {
    this.price += 1.00;
  }
  else if(this.size === "Large") {
    this.price += 2.00;
  }
  else if(this.size === "Gi-normous") {
    this.price += 3.00;
  }

  if(this.cheese === "None") {
    this.price -= 2.00;
  }
  else if (this.cheese === "Extra") {
    this.price += 1.50;
  }
}

// Calculate Extras Price
Extras.prototype.calculatePrice = function() {
  if (this.drinks != "None") {
    this.price += 2.00;
  }
  if (this.salad === "Personal") {
    this.price += 4.00;
  }
  else if (this.salad === "Family") {
    this.price += 7.00;
  }
  if (this.side != "None") {
    this.price += 5.00;
  }
  alert(this.price);
}

//Calculate Order total
Order.prototype.calculateTotal = function() {
  this.total += this.pizzas.price + this.extras.price;
}
