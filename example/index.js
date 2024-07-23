var upsAPI = require('../lib/index');
var util = require('util');
var fs = require('fs');


const ups = new upsAPI({
    environment: 'test', // production or test
    debug: false,
    clientId: "your client id",
    clientSecret: "your client secret",
    AccessLicenseNumber: '',
    shipperNumber: "",  
    imperial: false // set to false for metric
});

ups.track("trackingId").then((response) => {
    console.log("response", response.trackResponse);
})

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
                AccountNumber: ups.shipperNumber,
                AccountCountryCode: "DE"
            }
        },
        PickupDateInfo: {
            CloseTime: "1400",
            ReadyTime: "0500",
            PickupDate: "20240725"//YYYYMMDD
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
        ServiceDateOption: "02",
        PickupPiece: {
            ServiceCode: "001",
            Quantity: 1,
            DestinationCountryCode: "US",
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
}).then((response) => {
    console.log("response", response.PickupRateResponse);
})


ups.rate({
    Request: {
        TransactionReference: {
            CustomerContext: ""
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
            ShipperNumber: ups.shipperNumber,
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
                Length: "12",
                Width: "12",
                Height: "12"
            },
            PackageWeight: {
                UnitOfMeasurement: {
                    Code: "KGS",
                    Description: "KILLOGRAMM"
                },
                Weight: "1"
            }
        }
    }
}).then((data) => {
    console.log("data", data);
})


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
                      AccountNumber: ups.shipperNumber
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
                  Length: "12",
                  Width: "12",
                  Height: "12"
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
                      MonetaryValue: 5
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
    }
}).then((response) => {
    console.log("response", response);
})

ups.timeInTransit({
    originCountryCode: 'DE',
    originPostalCode: 'Zip',
    originCityName: 'City',
    destinationCountryCode: 'DE',
    destinationStateProvince: '',
    destinationCityName: 'City',
    destinationPostalCode: 'Zip',
    weight: 1,
    weightUnitOfMeasure: 'KGS',
    shipmentContentsValue: 1,
    shipmentContentsCurrencyCode: 'EUR',
    billType: '03',
    shipDate: '2024-07-24',
    shipTime: '10:00',
    avvFlag: true,
    numberOfPackages: 1
}).then((response) => {
    console.log("response", response.emsResponse);
}); 