'use strict';
/*
function getItemInfor(barcode) {
  var itemList = loadAllItems();

  for (var i = 0; i < itemList.length; i++) {
    if (barcode == itemList[i].barcode)
      return itemList[i]
  }
}

function getCartItem(inputs) {
  var cartItem = [];
  var number;

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].length > 10)
      number = inputs[i].substring(11);
    else
      number = 1;
    cartItem.push({infor: getItemInfor(inputs[i].substring(0, 10)), subcount: number});
  }

  return cartItem;
}

function getItemCount(cartItem) {
  var itemCount = [];


  for (var i = 0; i < cartItem.length; i++) {
    var flag = isExit(cartItem[i].infor.barcode, itemCount);
    if (flag == -1) {
      itemCount.push({item: {infor: cartItem[i].infor, subcount: cartItem[i].subcount}, count: cartItem[i].subcount});

    }
    else {
      itemCount[flag].count += cartItem[i].subcount;
    }
  }
  return itemCount;
}
*/



function findInfor(barcode) {
  var menu = loadAllItems();
  var flag;

  for (var i = 0; i < menu.length; i++) {
    if (barcode == menu[i].barcode) {
      flag = menu[i];
      break;
    }
  }
  return flag;
}

function getInfor(inputs) {

  var item = [];

  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].length > 10) {
      item.push({item: findInfor(inputs[i].substring(0, 10)), count: inputs[i].substring(11)});
    }
    else{
      item.push({item: findInfor(inputs[i]), count: 1});
    }
  }
  return item;
}

function getCount(cartItem,barcode) {
  var flag = -1;
  for(var i=0;i<cartItem.length;i++){
    if(cartItem[i].item.barcode == barcode){
      flag=i;
    }
  }
  return flag;
}
function buildItems(inputs) {
  var cartItem = [];

  var item = getInfor(inputs);
  for (var i = 0; i < item.length; i++) {
    var flag =getCount(cartItem,item[i].item.barcode);
    if( flag== -1){
      cartItem.push({item:item[i].item,count:parseInt(item[i].count)});
    }
    else {
      cartItem[flag].count += item[i].count;
    }
  }
  
  return cartItem;
}


function isDiscount(barcode) {
  var discountItem = loadPromotions();
  var flag = 0;

  for (var i = 0; i < discountItem[0].barcodes.length; i++) {
    if (barcode == discountItem[0].barcodes[i]) {
      flag = 1;
      break;
    }
  }
  return flag;
}

function getDiscount(itemCount) {
  var discount = [];

  for (var i = 0; i < itemCount.length; i++) {
    if (isDiscount(itemCount[i].item.barcode) == 1) {
      var num = Math.floor(itemCount[i].count / 3);
      discount.push({original: itemCount[i], subsave: parseFloat(num * itemCount[i].item.price)})
    }
    else {
      discount.push({original: itemCount[i], subsave: 0});

    }
  }
  return discount;
}

function getItemSubtotal(discount) {
  var subtotal = [];
  var tip;

  for (var i = 0; i < discount.length; i++) {

    tip = parseInt(discount[i].original.item.price * discount[i].original.count - discount[i].subsave);
    subtotal.push({original: discount[i].original, subSave: discount[i].subsave, subtotal: tip});
  }
  return subtotal;
}

function getItemTotal(subtotal) {
  var total = {};
  var save = 0;

  total.list = subtotal;
  total.total = 0;
  total.saveTotal = 0;
  for (var i = 0; i < subtotal.length; i++) {
    total.total += subtotal[i].subtotal;
    total.saveTotal += subtotal[i].subSave;
  }

  return total;
}



function printReceipt(inputs) {
  var cartItem = buildItems(inputs);
  var discount = getDiscount(cartItem);
  var subtotal = getItemSubtotal(discount);
  var total = getItemTotal(subtotal);
  var receipt = "***" + "<" + "没钱赚商店>收据***\n";

  for (var i = 0; i < total.list.length; i++) {
    receipt = receipt + "名称：" + total.list[i].original.item.name + "，数量：" + total.list[i].original.count + total.list[i].original.item.unit +
      "，单价：" + total.list[i].original.item.price.toFixed(2) + "(元)，小计：" + total.list[i].subtotal.toFixed(2) + "(元)\n";
  }
  receipt = receipt + "----------------------\n总计：" + total.total.toFixed(2) + "(元)\n节省：" + total.saveTotal.toFixed(2) + "(元)\n**********************"

  console.log(receipt);
}
var inputs = [
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000003-2',
  'ITEM000005',
  'ITEM000005',
  'ITEM000005'
];


function loadAllItems() {
  return [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];
}

function loadPromotions() {
  return [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ]
    }
  ];
}


printReceipt(inputs);

