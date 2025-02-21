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
const axios = require('axios');



const store = require('data-store')({ path: process.cwd() + '/store.json' });

class Ups {

  constructor({clientId, clientSecret, environment, debug, shipperNumber, username, password, accessLicenseNumber}){
    const host = {
      test: "https://wwwcie.ups.com",
      production: "https://onlinetools.ups.com"
    };

    this.username = username;
    this.password = password;
    this.accessLicenseNumber = accessLicenseNumber;
    this.debug = debug;
    this.apiUrl = `${host[environment]}/api`;
    this.authUrl = `${host[environment]}/security/v1/oauth/token`;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.shipperNumber = shipperNumber;
  }

  async auth(){
    const body = {
      grant_type: 'client_credentials'
    };
  
    const credentials = Buffer.from(`${this.clientId}:${this.clientSecret}`, 'utf8').toString('base64');

    return new Promise((resolve, reject) => {
      axios.post(this.authUrl, body,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${credentials}`,
            "x-merchant-id": "string",
          }
        }
      ).then( (response) => {
        if(response.data && response.data.access_token){
          if(this.debug){
            console.log("response.data", response.data);
          }
          
          store.set("token", response.data.access_token);
          return resolve(response.data);
        }
      })
      .catch( (error) => {
        if(this.debug){
          console.log("error", error);
        }
        return reject(error);
      });
    });
  } 

  rate(params){

    const query = new URLSearchParams({
      additionalinfo: ''
    }).toString();
    
    const version = '1';
    const requestoption = 'Shop';
    const url = this.apiUrl + `/rating/${version}/${requestoption}?${query}`;

    return new Promise((resolve, reject) => {
      axios.post(url, {RateRequest: params},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.get("token")}`,          
          }
        }
      ).then((response) => {
        if(this.debug){
          console.log("response.data", response.data);
        }
        return resolve(response.data)
        
      }).catch((err) => {
        if( this.debug ){
          console.log("err", err);
        }
        if( err.response.status == 401 ){
          this.auth().then(() => {
            return this.rate(params);
          }).catch((err) => {
            return reject(err);
          })
        }
        else {
          return reject(err);
        }
      })
    });
    
  }

  timeInTransit(params){

    const version = 'v1';
    const url = this.apiUrl + `/shipments/${version}/transittimes`;

    return new Promise((resolve, reject) => {
      axios.post(url, params,
        {
          headers: {
            'Content-Type': 'application/json',
            'transId': 'string',
            'transactionSrc': 'testing',
            'Authorization': `Bearer ${store.get("token")}`,          
          }
        }
      ).then((response) => {
        if(this.debug){
          console.log("response.data", response.data);
        }
        return resolve(response.data)
        
      }).catch((err) => {
        if(this.debug){
          console.log("err", err);
        }
        if( err.response.status == 401 ){
          this.auth().then(() => {
            return this.timeInTransit(params);
          }).catch((err) => {
            return reject(err);
          })
        }
        else {
          return reject(err);
        }
      })
    });
  }

  ship(params){
    const query = new URLSearchParams({
      additionaladdressvalidation: ''
    }).toString();
  
    const version = 'v1';
    const url = this.apiUrl + `/shipments/${version}/ship?${query}`;

    return new Promise((resolve, reject) => {
      axios.post(url, {ShipmentRequest: params},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.get("token")}`,          
          }
        }
      ).then((response) => {
        if(this.debug){
          console.log("response.data", response.data);
        }
        return resolve(response.data)
        
      }).catch((err) => {
        if(this.debug){
          console.log("err", err);
        }
        if( err.response.status == 401 ){
          this.auth().then(() => {
            return this.ship(params);
          }).catch((err) => {
            return reject(err);
          })
        }
        else {
          return reject(err);
        }
      })
    }); 
  }

  uploadCommercialDocument(params){
      
    const version = 'v1';
    const url = this.apiUrl + `/rest/PaperlessDocumentAPI`;

    return new Promise((resolve, reject) => {
      const body = {
        UPSSecurity: {
          UsernameToken: {
            Username: this.username,
            Password: this.password
          },
          ServiceAccessToken: {
            AccessLicenseNumber: this.accessLicenseNumber
          }
        },
        UploadRequest: params
      };
      axios.post(url, body,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.get("token")}`,          
          }
        }
      ).then((response) => {
        if(this.debug){
          console.log("response.data", response.data);
        }
        return resolve(response.data)
        
      }).catch((err) => {
        if(this.debug){
          console.log("err", err);
        }
        if( err.response.status == 401 ){
          this.auth().then(() => {
            return this.uploadCommercialDocument(params);
          }).catch((err) => {
            return reject(err);
          })
        }
        else {
          return reject(err);
        }
      })
    }); 
  }

  pushToImageRepository(params){
      
    const version = 'v1';
    const url = this.apiUrl + `/rest/PaperlessDocumentAPI`;

    return new Promise((resolve, reject) => {
      const body = {
        UPSSecurity: {
          UsernameToken: {
            Username: this.username,
            Password: this.password
          },
          ServiceAccessToken: {
            AccessLicenseNumber: this.accessLicenseNumber
          }
        },
        PushToImageRepositoryRequest: params
      };
      axios.post(url, body,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.get("token")}`,          
          }
        }
      ).then((response) => {
        if(this.debug){
          console.log("response.data", response.data);
        }
        return resolve(response.data)
        
      }).catch((err) => {
        if(this.debug){
          console.log("err", err);
        }
        if( err.response.status == 401 ){
          this.auth().then(() => {
            return this.pushToImageRepository(params);
          }).catch((err) => {
            return reject(err);
          })
        }
        else {
          return reject(err);
        }
      })
    }); 
  }

  pickup(params){    
    const version = 'v1';
    const pickuptype = 'YOUR_pickuptype_PARAMETER';
    const url = this.apiUrl + `/shipments/${version}/pickup/${pickuptype}`;

    return new Promise((resolve, reject) => {
      axios.post(url, {PickupCreationRequest: params},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.get("token")}`,          
          }
        }
      ).then((response) => {
        if(this.debug){
          console.log("response.data", response.data);
        }
        return resolve(response.data)
        
      }).catch((err) => {
        if(this.debug){
          console.log("err", err);
        }
        if( err.response.status == 401 ){
          this.auth().then(() => {
            return this.pickup(params);
          }).catch((err) => {
            return reject(err);
          })
        }
        else {
          return reject(err);
        }
      })
    }); 
  }

  track(params){
    const version = 'v1';
    const query = new URLSearchParams({
      locale: 'de_DE',
      returnSignature: false
    }).toString();
    const url = this.apiUrl + `/track/${version}/reference/details/${params}?${query}`;

    return new Promise((resolve, reject) => {
      axios.get(url,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.get("token")}`,          
            'transId': 'testing121sadas2',
            'transactionSrc': 'testing',
          }
        }
      ).then((response) => {
        if(this.debug){
          console.log("response.data", response.data);
        }
        return resolve(response.data)
        
      }).catch((err) => {
        if(this.debug){
          console.log("err", err);
        }
        if( err.response.status == 401 ){
          this.auth().then(() => {
            return this.track(params);
          }).catch((err) => {
            return reject(err);
          })
        }
        else {
          return reject(err);
        }
      })
    }); 
  }

}


module.exports = Ups;