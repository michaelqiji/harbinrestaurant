'use strict';
var app = angular.module("rw", ['ngRoute']);
app.config(function($routeProvider) {
  $routeProvider
  .when('/index', { controller:'HomeCtrl', templateUrl:'/index.html'})
  .when('/', { controller:'HomeCtrl', templateUrl:'/home.html'})
  .when('/menu', { controller:'MenuCtrl', templateUrl:'/menu.html'})
  .when('/cart', { controller:'CartCtrl', templateUrl:'/cart.html'})
  .when('/contact', { controller:'ContactCtrl', templateUrl:'/contact.html'})
  .when('/login', { controller:'LoginCtrl', templateUrl:'/login.html'})
  .when('/secretadmin', { controller:'SecretadminCtrl', templateUrl:'/secretadmin.html'})
  .when('/loginsecret', { controller: 'LoginCtrl', templateUrl: '/loginsecret.html'})
  .when('/ordermanagement', { controller: 'orderManageCtrl', templateUrl: '/ordermanagement.html'})
  .when('/secretmessagepage', { controller: 'messageCtrl', templateUrl: '/secretmessagepage.html'})
})

app.controller("MenuCtrl", function($rootScope, $scope, $http) {
  if($rootScope.cart){

  } else {
    $rootScope.cart = [];
  }

  if($rootScope.codeQuantity){

  } else {
    $rootScope.codeQuantity = {};
  }

  $http.get("/menu/getpots")
  .then(function(response){
    console.log(response.data);
    $scope.pots = response.data;
    $scope.pots.sort(function(a, b){return a.value.code.substr(1) - b.value.code.substr(1)});
  })

  $http.get("/menu/getchefs")
  .then(function(response){
    $scope.chefs = response.data;
    $scope.chefs.sort(function(a, b){return a.value.code.substr(1) - b.value.code.substr(1)});
  })

  $http.get("/menu/gethomes")
  .then(function(response){
    $scope.homes = response.data;
    $scope.homes.sort(function(a, b){return a.value.code.substr(1) - b.value.code.substr(1)});
  })

  $http.get("/menu/getchuans")
  .then(function(response){
    $scope.chuans = response.data;
    $scope.chuans.sort(function(a, b){return a.value.code.substr(1) - b.value.code.substr(1)});
  })

  $http.get("/menu/getnortheasts")
  .then(function(response){
    $scope.northeasts = response.data;
    $scope.northeasts.sort(function(a, b){return a.value.code.substr(1) - b.value.code.substr(1)});
  })

  $http.get("/menu/getcolddish")
  .then(function(response){
    $scope.colddishes = response.data;
    $scope.colddishes.sort(function(a, b){return a.value.code.substr(1) - b.value.code.substr(1)});
  })

  $http.get("/menu/gaifan")
  .then(function(response){
    $scope.gaifans = response.data;
    $scope.gaifans.sort(function(a, b){return a.value.code.substr(1) - b.value.code.substr(1)});
  })

  $http.get("/menu/chaofan")
  .then(function(response){
    $scope.chaofans = response.data;
    $scope.chaofans.sort(function(a, b){return a.value.code.substr(1) - b.value.code.substr(1)});
  })

  $http.get("/menu/combos")
  .then(function(response){
    $scope.combos = response.data;
    $scope.combos.sort(function(a, b){return a.value.code.substr(1) - b.value.code.substr(1)});
  })

  $http.get("/menu/zhushis")
  .then(function(response){
    $scope.zhushis = response.data;
    $scope.zhushis.sort(function(a, b){return a.value.code.substr(1) - b.value.code.substr(1)});
  })

  $scope.addItemToCart = function(item){
    if($rootScope.codeQuantity[item.code]){
      $rootScope.codeQuantity[item.code]++;
      console.log($rootScope.codeQuantity);
    } else {
      $rootScope.codeQuantity[item.code] = 1;
      $rootScope.cart.push(item);
      console.log($rootScope.codeQuantity);
    }
    //$rootScope.cart.push(item);
  }

  $scope.addCasserole = function(pot, code, name, price){
    var newItem = { code: code + "(" + pot.code + ")", price: price, title: name, chinese: pot.chinese };
    if($rootScope.codeQuantity[newItem.code]){
      $rootScope.codeQuantity[newItem.code]++;
    } else {
      $rootScope.codeQuantity[newItem.code] = 1;
      $rootScope.cart.push(newItem);
    }
  }

  $scope.orderedCombos = [];
  $scope.springroll = true;
  $scope.saveandadd = function(){
    if($scope.springroll == true){
      var side = "spring roll";
    } else {
      var side = "sesame ball";
    }

    $scope.orderedCombos.push({combo1: $scope.firstDish.split(".")[0], combo2: $scope.secondDish.split(".")[0], side: side});
    var newItem = {
      code: "E(" + $scope.firstDish.split(".")[0] + "+" + $scope.secondDish.split(".")[0] + "+" + side + ")",
      title: "Combo",
      chinese: $scope.firstDish + "+" + $scope.secondDish + "+" + side,
      price: 14.99
    }

    if($rootScope.codeQuantity[newItem.code]){
      $rootScope.codeQuantity[newItem.code]++;
    } else {
      $rootScope.codeQuantity[newItem.code] = 1;
      $rootScope.cart.push(newItem);
    }
  }
  // $scope.openTab = function(tabName) {
  //   var i, x;
  //   x = document.getElementsByClassName("containerTab");
  //   for (i = 0; i < x.length; i++) {
  //      x[i].style.display = "none";
  //   }
  //   document.getElementById(tabName).style.display = "block";
  // }
})

app.controller("CartCtrl", function($rootScope, $scope, $http) {
  $scope.shoppingcart = $rootScope.cart;
  $scope.calQuantity = $rootScope.codeQuantity;
  $scope.getTotal = function(){
    var total = 0;
    for(var i = 0; i < $scope.shoppingcart.length; i++){
        var product = $scope.shoppingcart[i];
        total += (product.price * $scope.calQuantity[product.code]);
    }
    return total.toFixed(2);
  }

  // if($scope.shoppingcart && $scope.shoppingcart.length > 0){

  // } else {
  //   document.getElementById("sendBtn").style = "disabled";
  // }

  $scope.sendorder = function(){
    var orderDetail = {};
    orderDetail.orderInfo = $rootScope.codeQuantity;
    orderDetail.detail = $rootScope.cart;
    orderDetail.contact = $scope.contact;
    orderDetail.requirement = $scope.requirement;
    orderDetail.time = new Date().toLocaleString();
    orderDetail.status = "pending";
    orderDetail.total = ($scope.getTotal() * 1.13).toFixed(2);

    if($scope.shoppingcart.length>0){
      if($scope.contact != "" && $scope.contact != undefined){
        $http.post("/cart/sendorder", orderDetail)
        .then(function(response){
          alert("Your order is sent. You will get a comfirmatiom SMS from us soon. If you would like to make any changes or cancel your order, please call 6136931525.");
          $rootScope.cart = [];
          $rootScope.codeQuantity = {};
          $scope.shoppingcart = [];
          $scope.calQuantity = {};
          $scope.requirement = "";
          $scope.contact = "";
        })
      } else {
        alert("Please fill your phone number");
      }
    } else {
      alert("No order");
    }
  }
})

app.controller("LoginCtrl", function($scope) {
})

app.controller("orderManageCtrl", function($scope, $http) {

  $scope.getOrders = function(){
    $http.get("/ordermanage/getorders")
    .then(function(response){
      $scope.orders = response.data;
      //sort
    })
  }

  $scope.getOrders();

  setInterval(function(){ 
    $scope.getOrders();
  }, 10000);


  $scope.acceptOrderBtn = function(orderInfo){
    $scope.selectedBuilding = orderInfo;
    $scope.orderDetail = orderInfo.detail;
    $scope.codeQuantity = orderInfo.orderInfo;
    $scope.readyInMinute = orderInfo.readyInMinute;
    $scope.replyMessage = orderInfo.replyMessage;
  }

  $scope.replyFunc = function(){
    var acceptOrderInfo = $scope.selectedBuilding;
    acceptOrderInfo.status = "accepted";
    acceptOrderInfo.readyInMinute = $scope.readyInMinute;
    acceptOrderInfo.replyMessage = $scope.replyMessage;
    $http.post("/ordermanage/acceptandreply", acceptOrderInfo)
    .then(function(response){
      alert("Done");
    })
  }
})

app.controller("messageCtrl", function($scope, $http) {

  $scope.getMessage = function(){
    $http.get("/message/getmessages")
    .then(function(response){
      $scope.messages = response.data;
      //sort
    })
  }

  $scope.getMessage();

  setInterval(function(){ 
    $scope.getMessage();
  }, 10000);
})

app.controller("SecretadminCtrl", function($scope, $http) {
    $scope.saveBtn = function(){
      var newDish = {
        title: $scope.englishName,
        chinese : $scope.chineseName,
        code: $scope.code,
        type: $scope.type,
        price: $scope.price
      }

      $http.post("/menu/insertdish", newDish)
      .then(function(data){
        alert(data);
      })
    }
})

app.controller("ContactCtrl", function($scope, $http) {
  $scope.messageBody = {};

  $scope.submitFunc = function(){
    $scope.messageBody.name = $scope.name;
    $scope.messageBody.contact = $scope.contact;
    $scope.messageBody.message = $scope.message;
    $scope.messageBody.time = new Date().toLocaleString();
    $http.post("/sendmessage/contactpage", $scope.messageBody)
    .then(function(data){
      alert("Send");
    })
  }
});