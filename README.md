# ups-client

library to track, rate or ship something via UPS

## Install

`npm i @kronsi/ups`

## Usage

```js
  var upsAPI = require('@kronsi/ups');

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

  /*** 
   * Rate
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
```

See `example/index.js` for working samples.

## Credits

Originally forked from [mojo5000,fportela-ns,MrBenJ,RyanYocum](https://github.com/thebouqs/fedex-node-client).

## License

(The MIT License)

Copyright 2015 uh-sem-blee, Co. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.