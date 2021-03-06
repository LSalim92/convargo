'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
const deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

function calculPrice_ex1(){
    for(var i = 0; i<deliveries.length; i++){
        var truck = findTruck(deliveries[i]['truckerId'])
        deliveries[i]['price'] = deliveries[i]['distance'] + ( deliveries[i]['volume'] * truck['pricePerVolume'])
    }
}

function calculPrice_ex2(){
    for(var i = 0; i<deliveries.length; i++){
        var truck = findTruck(deliveries[i]['truckerId'])
        deliveries[i]['price'] = deliveries[i]['distance'] + calculDecreasing(deliveries[i]['volume'], truck['pricePerVolume'])
    }
}

function findTruck(deliveriesTruckID)
{
    for(var i = 0; i<truckers.length; i++){
        if(truckers[i]['id'] == deliveriesTruckID){
            return truckers[i]
        }
    }
}

function calculDecreasing(deliverieVolume, pricePerVolTruck)
{
    if(deliverieVolume < 5)
    {
        return deliverieVolume * pricePerVolTruck
    }
    if(deliverieVolume >= 5){
        return deliverieVolume * (pricePerVolTruck - (pricePerVolTruck * 5/100))
    }
    if(deliverieVolume >= 10){
        return deliverieVolume * (pricePerVolTruck - (pricePerVolTruck * 10/100))
    }
    if(deliverieVolume >= 50){
        return deliverieVolume * (pricePerVolTruck - (pricePerVolTruck * 25/100))
    }
}

function calculCommission_ex3()
{
    for(var i = 0; i<deliveries.length; i++){
        deliveries[i]['commission']['insurance'] = (deliveries[i]['price']*30/100)/2
        deliveries[i]['commission']['treasury'] = Math.ceil(deliveries[i]['distance']/500)
        deliveries[i]['commission']['convargo'] = (deliveries[i]['price']*30/100) - deliveries[i]['commission']['insurance'] - deliveries[i]['commission']['treasury']
    }
}

function Deductible_ex4()
{
    for(var i = 0; i<deliveries.length; i++){
        if(deliveries[i]['options']['deductibleReduction'] == true)
        {
            deliveries[i]['price'] = deliveries[i]['price'] + deliveries[i]['volume']
            deliveries[i]['commission']['convargo'] = deliveries[i]['commission']['convargo'] + deliveries[i]['volume']
        }
    }
}

function Payment_ex5()
{
    for(var i = 0; i<deliveries.length; i++){
      var actor = findActor(deliveries[i]['id']) //actors[i]
      console.log(actor['deliveryId']);
      console.log(actor['payment'][0]['who']);
      for(var j = 0; j<actor['payment'].length; j++){
      switch (actor['payment'][j]['who']) {
          case 'shipper':
            actor['payment'][j]['amount'] = deliveries[i]['price']
            break;
          case 'owner':
            actor['payment'][j]['amount'] = deliveries[i]['price'] - deliveries[i]['commission']['insurance'] - deliveries[i]['commission']['treasury'] - deliveries[i]['commission']['convargo']
            break;
          case 'insurance':
            actor['payment'][j]['amount'] = deliveries[i]['commission']['insurance']
            break;
          case 'treasury':
            actor['payment'][j]['amount'] = deliveries[i]['commission']['treasury']
            break;
          case 'convargo':
            actor['payment'][j]['amount'] = deliveries[i]['commission']['convargo']
            break;
          default:
        }
      }
    }
}

function findActor(deliveriesID)
{
    for(var i = 0; i<actors.length; i++){
        if(actors[i]['deliveryId'] == deliveriesID){ //'deliveryId'
            console.log("here");
            return actors[i]
        }
    }
}

calculPrice_ex2()
calculCommission_ex3()
Deductible_ex4()
Payment_ex5()

console.log(truckers);
console.log(deliveries);
console.log(actors);
