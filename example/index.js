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
 * Ship
 */

 ups.ship({
    Request: {      
      TransactionReference: {
          CustomerContext: ""
      },      
      RequestAction: "ShipConfirm",
      RequestOption: "nonvalidate",
    },    
    Shipment: {        
        Description: "My Shipment",
        Shipper: {
            Name: "",
            AttentionName: "",
            ShipperNumber: ups.options.ShipperNumber,
            PhoneNumber: "",            
            
            Address: {
                AddressLine: "",                
                City: "",                
                PostalCode: "",
                CountryCode: ""
            }
        },
        ShipTo: {
            Name: "",
            AttentionName: "",
            PhoneNumber: "",
            Address: {
                AddressLine: "",
                City: "",
                StateProvinceCode: "",
                PostalCode: "",
                CountryCode: ""
            }
        },
        PaymentInformation: {
            ShipmentCharge: {
                Type: "01",
                BillShipper: {
                    AccountNumber: ups.options.ShipperNumber
                }                
            }            
        },        
        Service: {
            Code: "11",            
        },
        RateInformation: {
            NegotiatedRatesIndicator: ""
        },
        ReferenceNumber: {
            Code: "02",
            Value: "my reference id"
        },        
        Package: {
            Description: "Rate",
            Packaging: {
                Code: "02",//02=piece, 01=envelope            
            },            
            Dimensions: {
                UnitOfMeasurement: {
                    Code: "CM",
                    Description: "centimeter"
                },
                Length: "10",
                Width: "10",
                Height: "1"
            },
            PackageWeight: {
                UnitOfMeasurement: {
                    Code: "KGS",
                    Description: "KILLOGRAMM"
                },
                Weight: "1"
            },
            PackageServiceOptions: {
                InsuredValue: {
                    CurrencyCode: "EUR",
                    MonetaryValue: 1
                }
            }            
        }       
    },
    LabelSpecification: {
        LabelPrintMethod: {
            Code: "GIF",
            Description: "gif file"
        },
        HTTPUserAgent: "Mozilla/4.5",
        LabelStockSize: {
            Height: 4,
            Width: 8
        },
        LabelImageFormat: {
            Code: "GIF",
            Description: "gif file"
        },
    },
    
    
    
  }, function(err, resShipment) {
    if(err) {
      return console.log("err:", err.detail.Errors);
    }
  
    console.log(resShipment);

    let {ShipmentDigest} = resShipment.ShipmentResults;

    ups.accept({
        Request: {      
            RequestAction: "ShipAccept",
            TransactionReference: {
                CustomerContext: "Context"
            }            
        },
        ShipmentDigest: ShipmentDigest
      }, function(err, res) {
        if(err) {
            return console.log("err:", err.detail.Errors);
        }        
    })
});

/**
 * Pickup
 * 
 */

/**
 * Pickup Piece Type
 * 
 * ServiceCode:
 * 001 - UPS Next Day Air
 * 002 - UPS Next Day Air
 * 003 - UPS Ground
 * 004 - UPS Ground, UPS Standard
 * 007 - UPS Worldwide Express
 * 008 - UPS Worldwide Expedited
 * 011 - UPS Standard
 * 012 - UPS Three Day Select
 * 013 - UPS Next Day Air Saver
 * 014 - UPS Next Day Air Early A.M.
 * 021 - UPS Economy
 * 031 - UPS Basic
 * 054 - UPS Worldwide Express Plus
 * 059 - UPS Second Day Air A.M.
 * 064 - UPS Express NA1
 * 065 - UPS Saver
 * 082 - UPS Today Standard
 * 083 - UPS Today Dedicated Courier
 * 084 - UPS Today Intercity
 * 085 - UPS Today Express
 * 086 - UPS Today Express Saver
 * 
 * ContainerCode:
 * 01 = PACKAGE
 * 02 = UPS LETTER
 */

/**
 * Pickup Method Type
 * 
 * 00 = No payment needed
 * 01 = Pay by shipper account
 * 02 = Pay by return service
 * 03 = Pay by charge card
 * 04 = Pay by tracking number
 */

/**
 * Pickup Charge Card
 * 
 * CardType:
 * 01 = American Express
 * 03 = Discover	
 * 04 = Mastercard
 * 06 = VISA
 * 
 * ExpirationDate: yyyyMM
 * SecurityCode: 3 or 4 digit
 */

 ups.pickup({
    Request: {
      RequestOption: "",
      TransactionReference: {
          CustomerContext: ""
      }      
    },
    RatePickupIndicator: "Y",
    TaxInformationIndicator: "Y",
    Shipper: {
        Account: {
            AccountNumber: ups.options.ShipperNumber,
            AccountCountryCode: ""
        }
    },
    PickupDateInfo: {
        CloseTime: "",
        ReadyTime: "",
        PickupDate: ""//YYYYMMDD
    },
    PickupAddress: {
        CompanyName: "",
        ContactName: "",
        AddressLine: "",
        City: "",
        StateProvince: "",
        PostalCode: "",
        CountryCode: "",
        Phone: {
            Number: "",            
        },
        ResidentialIndicator: "Y"
    },
    AlternateAddressIndicator: "Y",
    PickupPiece: {
        ServiceCode: "001",
        Quantity: 1,
        DestinationCountryCode: "",
        ContainerCode: "01"
    },
    TotalWeight: {
        Weight: "1.0",
        UnitOfMeasurement: "KGS"
    },
    OverweightIndicator: "N",
    PaymentMethod: "01"
    
  }, function(err, res) {
    if(err) {
      return console.log("err:", err);
    }
  
    console.log(res);
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