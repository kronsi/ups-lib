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
 * Tracking
 */
 ups.tracking({
    Request: {
      TransactionReference: {
        CustomerContext: ""
      },
      RequestAction: "Track",      
      RequestOption: "activity",
      
    },    
    InquiryNumber: "YOUR SHIPMENT ID here"
  }, function(err, res) {
    if(err) {
      return console.log("err:", err.detail.Errors);
    }
  
    console.log(res);
}); 



/**
 * TimeInTransit
 */
 ups.timeintransit({
    Request: {
      RequestOption: "TNT",
      TransactionReference: {
          CustomerContext: ""
      },
      RequestAction: "TimeInTransit",  
    },
    ShipFrom: {
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
    Pickup: {
        Date: "20220222"//YYYYMMDD
    },    
    ShipmentWeight: {
        Weight: "",
        UnitOfMeasurement: {
            Code: "KGS",
            Description: "Killogramm",        
        }
    },
    TotalPackagesInShipment: "",
    InvoiceLineTotal: {
        CurrencyCode: "EUR",
        MonetaryValue: ""
    },
    MaximumListSize: 1
    
  }, function(err, res) {
    if(err) {
      return console.log("err:", err);
    }
  
    console.log(res);
});


/**
 * TimeInTransit
 */
 ups.timeintransit({
    Request: {
      RequestOption: "TNT",
      TransactionReference: {
          CustomerContext: ""
      },
      RequestAction: "TimeInTransit",  
    },
    ShipFrom: {
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
    Pickup: {
        Date: "20220222"//YYYYMMDD
    },    
    ShipmentWeight: {
        Weight: "",
        UnitOfMeasurement: {
            Code: "KGS",
            Description: "Killogramm",        
        }
    },
    TotalPackagesInShipment: "",
    InvoiceLineTotal: {
        CurrencyCode: "EUR",
        MonetaryValue: ""
    },
    MaximumListSize: 1
    
  }, function(err, res) {
    if(err) {
      return console.log("err:", err);
    }
  
    console.log(res);
});

/**
 *  Rates
 */
 ups.rates({
  Request: {
    RequestOption: "Shop",
    TransactionReference: {
        CustomerContext: "Time2ship"
    },  
  },
  PickupType: {
    Code: "01"//01=package, 19=envelope
  },
  CustomerClassification: {
    Code: "00"
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
                Description: "Killogramm"
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