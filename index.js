var currentBitcoinPrice = 0;
var currentbitcoinowned = 0;
// Convert String to Number Function

function ConvertToNumber(numberString) {

  var result = Number(numberString.replace(/[^0-9.-]+/g,""));

  return result;
};

// determines if input is a number or not, if not- return 0
function isNumber(input) {
  if (isNaN(input)) {
    return 0;
  }
  return input;
}

$("#worldpop").click(function() {

  $("#population").val("7,800,000,000");
})

$("#meaningfuladopters").click(function() {

  $("#population").val("2,200,000,000");
});

$("#currentadopters").click(function() {

  $("#population").val("106,000,000");
});


$("#maxcap").click(function() {
  $(".circulation").val("21,000,000");
});

$("#currentsupply").click(function() {
  $(".circulation").val("18,700,000");
})

$("#lostsupply").click(function() {
  $(".circulation").val("15,000,000");
})





$("#calculateshares").click(function() {
  $("#totalbtc").html(function() {

    var result = (ConvertToNumber($("#shares").val()) * ConvertToNumber($("#pershare").val())).toFixed(4);

    currentbitcoinowned = ConvertToNumber(result);

   return result + " Bitcoin via GBTC";

  });

  $("#addition-sign").removeClass("visibility");

});

$("#copyamount").click(function() {
  $(".owned").val(currentbitcoinowned + ConvertToNumber($("#real-btc").val()));
})
// end Convert String to Number Function

// var population = $("#population").val();
// var bitcoinowned = ConvertToNumber($(".owned").val());
// var percentile = ConvertToNumber($(".percentile").val()) * .01;


$(".calculate").click(function() {

  $("#results").removeClass("visibility");

  $("#bitcoiner").addClass("visibility");
  // $("#noCoiner").addClass("visibility");
  $("#hfsp").addClass("visibility");

  $("#satoshi").addClass("visibility");
  $("#onepercenter").addClass("visibility");

  $("#tenpercenter").addClass("visibility");
  $("#bullish").addClass("visibility");

  $("#richpic").addClass("visibility");
  $("#onetenthpercenter").addClass("visibility");

  $("#superrichpic").addClass("visibility");
  $("#onehundrethpercenter").addClass("visibility");

  var population = ConvertToNumber($("#population").val());
  var circulation = ConvertToNumber($(".circulation").val());
  var bitcoinowned = ConvertToNumber($(".owned").val());
  var percentile = ConvertToNumber($(".percentile").val()) * .01;


  // $(".answer").html(ConvertToNumber($(".owned").val()) + ConvertToNumber($(".percentile").val()) * .01);
  $(".answer").html((circulation/(population * percentile)).toFixed(4));

  $(".pop-result").html(ConvertNumToCommas(population));

  $(".circ-result").html(ConvertNumToCommas(circulation));

  $(".top-percent").html((percentile * 100) + "%");

  $(".bitcoin-price").html("$ " + ConvertNumToCommas(currentBitcoinPrice.toFixed(2)));

  $(".amount-needed").html("$ " + ConvertNumToCommas((currentBitcoinPrice.toFixed(2) * (circulation/(population * percentile))).toFixed(2)));

  // var onepercent = currentBitcoinPrice.toFixed(2) * (circulation/(population * .01)).toFixed(2);

  $(".current-holding").html(bitcoinowned + " Bitcoins");

  $(".personal-percent").html((((circulation/bitcoinowned) / population) * 100).toFixed(5) + " %");

  if (!(bitcoinowned>0)) {
    // $("#noCoiner").removeClass("visibility");
    $("#hfsp").removeClass("visibility");
  }
  else {
    $("#bitcoiner").removeClass("visibility");
  }

  var personalpercent = (((circulation/bitcoinowned) / population) * 100).toFixed(5);

  if(personalpercent <= .01) {
    $("#superrichpic").removeClass("visibility");
    $("#onehundrethpercenter").removeClass("visibility");
  }

  if((personalpercent > .01) && (personalpercent <= .1)) {
    $("#richpic").removeClass("visibility");
    $("#onetenthpercenter").removeClass("visibility");
  }

  if((personalpercent > .1) && (personalpercent <= 1) ) {
    $("#satoshi").removeClass("visibility");
    $("#onepercenter").removeClass("visibility");
  }

  if ((personalpercent <= 10) && (personalpercent > 1 )) {
    $("#tenpercenter").removeClass("visibility");
    $("#bullish").removeClass("visibility");
  }

  // if (bitcoinowned >= onepercent) {
  //   $("#satoshi").removeClass("visibility");
  // }
});



// ******************** bitcoin price update ************************ //

// var btn = document.querySelector("button");
var btcPriceDisplay = document.querySelector("#btcPrice");
var currSymbol = "USD";
// var	currencyDesc = document.querySelector("#currencyDesc");


function myFunction() {
  setInterval(function(){

    var XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function(){
     if(XHR.readyState == 4 && XHR.status == 200){
       var data = JSON.parse(XHR.responseText);
        price = data.bpi.USD.rate;
        bitcoinprice = data.bpi.USD.rate_float;
        symbol = data.bpi[currSymbol].code;
        desc = data.bpi.USD.description;
        btcPriceDisplay.innerText = " = $" + price;

        currentBitcoinPrice = isNumber(parseFloat(bitcoinprice));

        // currncySymbol.innerText =  currSymbol;
        // currencyDesc.innerText = desc;
       }
    }
    var url = "https://api.coindesk.com/v1/bpi/currentprice.json";
    XHR.open("GET", url);
    XHR.send();


  }, 100);
}

myFunction();

// ************************************************************************ //

function ConvertNumToCommas(result) {

  return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

};

$(".commas").change(function () {


  // the value of the populatiln field will be sent though the following function

  var result = ConvertToNumber($(this).val());
  // the new value of the poplulation field is the result of that function

  $(this).val(ConvertNumToCommas(result));

  });





  // edge cases

  $(".circulation").change(function () {

    if (ConvertToNumber($(".circulation").val()) > 21000000 || ConvertToNumber($(".circulation").val()) <= 0) {
      $(".circulation").val("21,000,000");
    }

    // if (ConvertToNumber($(".circulation").val()) < 0) {
    //   $(".circulation").val("0");
    // }

  })

  $("#population").change(function() {
    if(ConvertToNumber($("#population").val()) <= 0) {

      $("#population").val("7,800,000,000");

    }
  })


  $(".owned").change(function() {
    if(ConvertToNumber($(".owned").val()) < 0 || ConvertToNumber($(".owned").val()) > 21000000 )

    $(".owned").val("0");

  })

  // Tip Bitcoin Wallet Address code


function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}