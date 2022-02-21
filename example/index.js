var upsAPI = require('../lib/index');
var util = require('util');
var fs = require('fs');


var ups = new upsAPI({
  environment: 'test', // production or test
  debug: true,
  debugOutput: "xml",
  AccessLicenseNumber: 'Add License Key Here',
  UserId: 'Add User Id Here',
  Password: 'Add Password Here',
  ShipperNumber: "Add your Shipper Nr here",  
  imperial: false // set to false for metric
});

/**
 *  Rates
 */
 ups.rates({
  Request: {
    RequestOption: "Rate",
    TransactionReference: {
        CustomerContext: "Time2ship"
    },  
  },
  
  
  Shipment: {
    Shipper: {
        ShipperNumber: ups.options.ShipperNumber,
        Address: {
            City: "From City here",
            PostalCode: "From ZipCode here",
            CountryCode: "From Country here",
        }
    },
    ShipTo: {
        Address: {
            City: "To City here",
            PostalCode: "To ZipCode here",
            CountryCode: "From Country here",
            StateProvinceCode: "",
        }
    }, 
    Service: {
        Code: "03",
        Description: "Service Code"
    },  
    Package: {
        PackagingType: {
            Code: "02",//02=piece, 01=envelope
            Description: "Rate"
        },
        Dimensions: {
            UnitOfMeasurement: {
                Code: "CM",
                Description: "centimeter"
            },
            Length: "",
            Width: "",
            Height: ""
        },
        PackageWeight: {
            UnitOfMeasurement: {
                Code: "KGS",
                Description: "KILLOGRAMM"
            },
            Weight: ""
        }
    }
  }
}, function(err, res) {
  if(err) {
    return console.log("err:", err);
  }

  console.log(res);
});