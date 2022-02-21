/*

 Built by
 Kronsi
 */


var https = require('https');
var extend = require('extend');
var parser = require('xml2js');
var soap = require('soap');
var path = require('path');
var util = require('util');
var fs = require('fs');

function UPS(args){
    var $scope = this;
    $scope.hosts = {
        production: 'https://onlinetools.ups.com/webservices',
        test: 'https://wwwcie.ups.com/webservices'
    };
    var defaults = {
        imperial: true, // for inches/lbs, false for metric cm/kgs
        currency: 'USD',
        language: 'en-US',
        environment: 'sandbox',
        key: '',
        password: '',
        account_number: '',
        meter_number: '',
        debug: false,
        debugOutput: "json",
        pretty: false,
        user_agent: 'uh-sem-blee, Co | typefoo'
    };

    $scope.config = function(args) {
        $scope.options = extend(defaults, args);
        return $scope;
    };

    function handleResponseError(err, callback) {
        try {
            return callback(err.root.Envelope.Body.Fault, null);
        } catch(e) {
            if($scope.options.debug) {
                console.log(util.inspect(err, {depth: null}));
            }
            return callback(err, null);
        }
    }

    function generateAuthentication(client, data, resource, options) {
        /*
        <upss:Security>
			<upss:UsernameToken>
				<upss:Username>Your User Id</upss:Username>
				<upss:Password>Your Password</upss:Password>
			</upss:UsernameToken>
			<upss:UPSServiceAccessToken>
				<upss:AccessLicenseNumber>Your Access License Key</upss:AccessLicenseNumber>
			</upss:UPSServiceAccessToken>
		</upss:Security>
        */
       
        var params = {
           
            
        };
        

        var soapHeader = {
            ["upss:UPSSecurity"]: {
                ["upss:UsernameToken"]: {
                    ["upss:Username"]: $scope.options.UserId,
                    ["upss:Password"]: $scope.options.Password
                },
                ["upss:ServiceAccessToken"]: {
                    ["upss:AccessLicenseNumber"]: $scope.options.AccessLicenseNumber,
                }
            }
        };
        client.addSoapHeader(soapHeader);
        
        return extend(params, data);
    }

    function buildRatesRequest(data, options, resource, callback) {        
        soap.createClient(path.join(__dirname,  'wsdl', resource.wsdl), {endpoint: $scope.hosts[$scope.options.environment] + resource.path}, function(err, client) {
          if (err) {
            return callback(err, null);
          }
    
          var params = generateAuthentication(client, data, resource, options);

          client.ProcessRate(params, function(err, result, originalReply) {        
            if($scope.options.debug) {          
              switch( $scope.options.debugOutput ){
                case "json":
                  parser.parseString(client.lastRequest, {explicitArray: false}, function(err, debug) {
                    console.log(util.inspect(debug, {depth: null}));
                  });
                  break;
                case "xml":
                  fs.writeFileSync("./request.xml", client.lastRequest);
                  console.log("REQUEST:", client.lastRequest);
                  console.log("");
                  console.log("RESPONSE:", originalReply);
                  break;
              }          
            }
            if(err) {
              return handleResponseError(err, callback);
            }
    
            return callback(err, result);
          });
        });
      }
    
    function handleRatesResponse(res, callback) {
        return callback(null, res);
    }

    function buildTimeInTransitRequest(data, options, resource, callback) {
        soap.createClient(path.join(__dirname,  'wsdl', resource.wsdl), {endpoint: $scope.hosts[$scope.options.environment] + resource.path}, function(err, client) {
          if (err) {
            return callback(err, null);
          }
    
          var params = generateAuthentication(client, data, resource, options);

          client.ProcessTimeInTransit(params, function(err, result, originalReply) {        
            if($scope.options.debug) {          
              switch( $scope.options.debugOutput ){
                case "json":
                  parser.parseString(client.lastRequest, {explicitArray: false}, function(err, debug) {
                    console.log(util.inspect(debug, {depth: null}));
                  });
                  break;
                case "xml":
                  fs.writeFileSync("./request.xml", client.lastRequest);
                  console.log("REQUEST:", client.lastRequest);
                  console.log("");
                  console.log("RESPONSE:", originalReply);
                  break;
              }          
            }
            if(err) {
              return handleResponseError(err, callback);
            }
    
            return callback(err, result);
          });
        });
      }
    
    function handleTimeInTransitResponse(res, callback) {
        return callback(null, res);
    }

    function buildTrackRequest(data, options, resource, callback) {
        soap.createClient(path.join(__dirname,  'wsdl', resource.wsdl), {endpoint: $scope.hosts[$scope.options.environment] + resource.path}, function(err, client) {
          if (err) {
            return callback(err, null);
          }
    
          var params = generateAuthentication(client, data, resource, options);

          client.ProcessTrack(params, function(err, result, originalReply) {        
            if($scope.options.debug) {          
              switch( $scope.options.debugOutput ){
                case "json":
                  parser.parseString(client.lastRequest, {explicitArray: false}, function(err, debug) {
                    console.log(util.inspect(debug, {depth: null}));
                  });
                  break;
                case "xml":
                  fs.writeFileSync("./request.xml", client.lastRequest);
                  console.log("REQUEST:", client.lastRequest);
                  console.log("");
                  console.log("RESPONSE:", originalReply);
                  break;
              }          
            }
            if(err) {
              return handleResponseError(err, callback);
            }
    
            return callback(err, result);
          });
        });
      }
    
    function handleTrackResponse(res, callback) {
        return callback(null, res);
    }

    function buildPickupRequest(data, options, resource, callback) {
        soap.createClient(path.join(__dirname,  'wsdl', resource.wsdl), {endpoint: $scope.hosts[$scope.options.environment] + resource.path}, function(err, client) {
          if (err) {
            return callback(err, null);
          }
    
          var params = generateAuthentication(client, data, resource, options);

          client.ProcessPickupCreation(params, function(err, result, originalReply) {        
            if($scope.options.debug) {          
              switch( $scope.options.debugOutput ){
                case "json":
                  parser.parseString(client.lastRequest, {explicitArray: false}, function(err, debug) {
                    console.log(util.inspect(debug, {depth: null}));
                  });
                  break;
                case "xml":
                  fs.writeFileSync("./request.xml", client.lastRequest);
                  console.log("REQUEST:", client.lastRequest);
                  console.log("");
                  console.log("RESPONSE:", originalReply);
                  break;
              }          
            }
            if(err) {
              return handleResponseError(err, callback);
            }
    
            return callback(err, result);
          });
        });
      }
    
    function handlePickupResponse(res, callback) {
        return callback(null, res);
    }

    var resources = {
        rates: {f: buildRatesRequest, r: handleRatesResponse, wsdl: 'rate/RateWS.wsdl', path: '/Rate', version: {ServiceId: 'crs', Major: "v1.1", Intermediate: 0, Minor: 0}},
        timeintransit: {f: buildTimeInTransitRequest, r: handleTimeInTransitResponse, wsdl: 'timeintransit/TNTWS.wsdl', path: '/TimeInTransit', version: {ServiceId: 'crs', Major: "v1.1", Intermediate: 0, Minor: 0}},
        tracking: {f: buildTrackRequest, r: handleTrackResponse, wsdl: 'tracking/Track.wsdl', path: '/Track', version: {ServiceId: 'crs', Major: "v1.1", Intermediate: 0, Minor: 0}},
        pickup: {f: buildPickupRequest, r: handlePickupResponse, wsdl: 'pickup/Pickup.wsdl', path: '/Pickup', version: {ServiceId: 'crs', Major: "v1.1", Intermediate: 0, Minor: 0}},
    };


    
    function buildResourceFunction(i, resources) {
        return function(data, options, callback) {
            if(!callback) {
                callback = options;
                options = undefined;
            }

            resources[i].f(data, options, resources[i], function(err, res) {
            if(err) {
                return callback(err, null);
            }
            resources[i].r(res, callback);
            });
        }
    }

    for(var i in resources) {
        $scope[i] = buildResourceFunction(i, resources);
    }

    return $scope.config(args);
}

module.exports = UPS;