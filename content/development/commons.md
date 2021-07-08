---
title: 'Governify commons'
order: 2
---

# Introduction
This module is intended for use in all microservices of Governify infrastructure.
It allows for abstract the functions that are mostly used in the code, to have a better control and parametrize the functions call.

Currently Governify-Commons implements the following:
- Governify infrastructure urls management
- A httpClient that should be used for all the calls (This httpClient is a Axios wrapper)
- A configuration manager compatible with local or external files
- Utils function commonly used in all the microservices

# Implementations

The module should be initiated at the entrypoint of the service as soon as possible in the code with:
```javascript
const governify = require('governify-commons')
```

After that, you must call the module init function that will load the infrastructure and all the configurations:
```javascript
governify.init().then(function() {
    //All the code for initializing the microservice
    }
);
```

(This example is for running without any configuration in it)

Once you have called the init function, you can require governify in other classes of your microservice without having to initialize it again.

**If you require governify-commons before the init function being completed, the infrastructure urls or the configuration can have null values.**

## infrastructure

   In order to call another service in the infrastructure you must implement the code as following:
```javascript
const governify = require('governify-commons');
governify.infrastructure.getService('internal.registry').get('/echo/');
governify.infrastructure.getService('internal.registry').post('/echo/', {body}, {config});
```

You can also get only the service url with:
```javascript
const governify = require('governify-commons');
governify.infrastructure.getServiceURL('external.registry')
//This returns the service url that is stored in the loaded infrastructure file as (external.registry)
```
      

## httpClient

If you want to call a service that is not specified in the infrastructure file, you should use the httpClient as follows:

```javascript
const governify = require('governify-commons');
governify.httpClient.get('http://api-echo.herokuapp.com/echo/');
```

 The syntax is the same as axios, the code above is the equivalent of:

```javascript
const axios = require('axios');
axios.get('http://api-echo.herokuapp.com/echo/');
```
    
You can read axios documentation to see all the posible functions:
[Axios NPM documentation](https://www.npmjs.com/package/axios)

## configurator

In order to load a configuration to the module, you have to specify it in the init function:

```javascript
governify.init({
    configurations: [
        {
            name: 'configName',
            location: './configurations/configName.' + (process.env.NODE_ENV || 'development') + '.yaml',
            default: true
        }
    ]
}).then(function () {
    //All the code for initializing the microservice
}
);
```

After that you can load the configuration as follows:

```javascript
let config = governify.configurator.getConfig('configName');
 ``` 

 All the values of the configurations can be replace with Environment variables. 
 For example:
 With a config named 'exampleConfig' and the following value:


```yaml
test:
    childrenTest: originalValue
serverPort: 8080
```   

In order to replace a value of this config, you can specify the following env vars:


```
GOV_CONFIG_exampleConfig_test_childrenTest=replacedValue
GOV_CONFIG_exampleConfig_serverPort=9000
```

The result config when you execute the code will be:
```javascript
governify.configurator.getConfig('configName');
```    
Result:

```yaml
test:
    childrenTest: replacedValue
serverPort: 9000
```
    

## utils

The most used functions of the utils are:
```javascript
const governify = require('governify-commons');
//This function read the content of a file in a local storage path or from a external url
let object = governify.utils.loadObjectFromFileOrURL(url or fileLocation);
```
    
You can check utils.js file to see all posible functions.
