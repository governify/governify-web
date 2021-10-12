---
title: "iAgree Syntax 5.2"
order: 0
---
**Governify** uses iAgree specification lenguage to model SLAs.

# iAgree Specification

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](http://www.ietf.org/rfc/rfc2119.txt).


## Revision History
Versions tagged with R are inteded for research purpouses.
Other versions are operational versions used in real projects.

|Version  | Date         | Notes                          |
|:------- |:------------ |:---------------------------    |
| 1.0R    | 2013   | Initial WS-Agreement derived DSL.               |
| 2.0     | 2016   | Move to a new YAML independent syntax.         |
| 3.0     | 2016   | Changes for interoperabilty with Governify Registry.          |
| 4.0R    | 2017   | Extensions for SLA4OAI.         |
| 5.0     | 2017   | Improved computers section.         |
| 5.1     | 2019   | Collector and metrics improvements         |
| 5.2     | 2021   | Customizable Window period         |
| 6.0R    | 2020   | Changing focus from SLA-based to Customer-Agreement-based.         |

# Version 5.2

## Introduction
**iAgree** is an open source standard for describing Service Level Agreements (SLAs).

This SLA definition in a neutral vendor flavor will allow to foster innovation in the area. By this way, management tools can import and measure metrics and build SLAs for composed services in a standard approach.


## Specification
An **iAgree** description is a [JSON](http://www.json.org) or a [YAML](http://yaml.org/spec) document with following structure. Note that primitive data types in the iAgree specification are based on the types supported by the [JSON-Schema Draft 4](http://json-schema.org/latest/json-schema-core.html#anchor8). 

![Class diagram](https://i.imgur.com/3Zo50tH.png "iagree definition class diagram")


### SLA Object
Each iAgree document must contain the following sections:

| Field name 	| Field type                            	| Required/Optional 	| Description 	|
|------------	|---------------------------------------	|-------------------	|-------------	|
| id         	| `String`                              	| **Required**      	|  document unique identification           				|
| version    	| `String`                              	| **Required**      	|  document version           								|
| type       	| `String`                              	| **Required**      	| document type based on the SLA lifecycle            		|
| context    	| [`ContextObject`](#contextobject)        	| **Required**          | holds the main information of the SLA context            	|
| terms      	| [`TermsObject`](#termsobject)   	        | **Required**      	| holds the main information of the SLA terms            	|

##### Example

###### Synthetic

```
id: MyServiceAgreement
version: 1.0.0
type: agreement
context:  ContextObject
terms:  TermsObject
```

#### ContextObject
Holds the main information of the SLA context.

| Field name     	| Field type                                   	| Required/Optional 	| Description                                      	|
|----------------	|----------------------------------------------	|-------------------	|--------------------------------------------------	|
| iAgree       	    | `String`                                     	| **Required**      	| iAgree specification version
| provider       	| `String`                                     	| Optional      		| data about the owner/host of the service        													|
| consumer       	| `String`                                     	| Optional      		| data about the entity that consumes the service.												 	|
| validity       	| [`ValidityObject`](#validityobject)       	| Optional      		| holds the main information of the SLA validity                                               		|
| definitions    	| [`DefinitionsObject`](#definitionsobject)    	| **Required**      	| holds the main information of the SLA definitions                                             |
| infrastructure 	| `Object`										| **Required**      	| provides information about the tools used for SLA storage, calculation, governance, etc. 		|

##### Example

###### Synthetic

```
context:
  iAgree: 2.0
  provider: ISA Research Group
  consumer: Acme
  validity: ValidityObject
  infrastructure:
    designer: 'http://designer.governify.io'
    portal: 'http://portal.governify.io'
    registry: 'http://registry.governify.io'
  definitions: DefinitionsObject
```


#### ValidityObject
Holds the main information of the SLA validity.

| Field name 	| Field type 	| Required/Optional 	| Description 	|
|------------	|------------	|-------------------	|-------------	|
| initial    	| `String`   	| **Required**      	| start date of the SLA according to [ISO 8601](http://www.iso.org/iso/catalogue_detail?csnumber=40874) time format            		|
| timeZone   	| `String`   	| **Required**      	| time zone of the SLA according to [ISO 8601](http://www.iso.org/iso/catalogue_detail?csnumber=40874) time zone format            	|
| end        	| `String`   	| Optional          	| end date of the SLA according to [ISO 8601](http://www.iso.org/iso/catalogue_detail?csnumber=40874) time format            		|

##### Example

###### Synthetic

```
validity:
    initial: '2014-10-16'
    timeZone: Europe/Madrid
```


#### DefinitionsObject
Holds the main information of the SLA definitions.

| Field name 	| Field type            	| Required/Optional 	| Description 	|
|------------	|------------           	|-------------------	|-------------	|
| schemas    	| Array [`Object`]      	| **Required**          |  definition schemas         	|
| scopes     	| Array [`Object`]       	| **Required**      	|  definition scopes           	|

##### Example

###### Synthetic

```
definitions:
      schemas:
        myMetric:
            description: some gathered values
            type: double
            unit: '%'
      scopes:
          myGlobalScope:
            myScope:
              myPropertyName: myPropertyValue
```

###### SLA for API services

```
  definitions:
    schemas:
      animalTypes:
        type: integer
        format: int64
        description: Number of different animal types.
      resourceInstances:
        type: integer
        format: int64
        description: Number of pet resources
      requests:
        type: integer
        format: int64
        description: Number of requests
      responseTime:
        type: integer
        format: int64
        description: Time in ms spent by request
```

###### SLA for human services

```
  definitions:
    schemas:
      escalatedIncidentPercentage:
        description: Percentage of incidents escalated by first level support teams
        type: double
        unit: '%'
      resolutionTime:
        description: Immediate incident resolution by first level support teams
        type: string
        unit: hours
      schedule:
        description: service schedule
        type: string
```

#### TermsObject
Holds the main information of the SLA terms.

| Field name     	| Field type                                     	| Required/Optional 	| Description 	|
|----------------	|------------------------------------------------	|-------------------	|-------------	|
| pricing        	| [`PricingObject`](#pricingtobject)            	| **Required**      	| Holds the main information of the SLA pricing.            	|
| metrics        	| [`MetricsObject`](#metricstobject)            	| **Required**          | Holds the main information of the SLA metric.              	|
| guarantees     	| Array[[`GuaranteeObject`](#guaranteeobject)]  	| **Required**      	| Holds the main information of the SLA guarantees.            	|
| configurations 	| [`ConfigurationsObject`](#configurationsobject)  	| Optional              | Holds the main information of the SLA configurations.        	|
| quotas         	| Array[[`QuotaObject`](#quotaobject)]          	| Optional          	| Holds the main information of the SLA quotas.           	 	|
| rates          	| Array[[`RateObject`](rateobject)]             	| Optional          	| Holds the main information of the SLA rates.           	 	|

##### Example

###### Synthetic

```
terms:
  pricing: PricingObject
  metrics: MetricsObject
  guarantees: Array[GuaranteeObject]
  configurations: ConfigurationsObject
  quotas:  Array[QuotaObject]
  rates: Array[RateObject]
```


#### PricingObject
Holds the main information of the SLA pricing.

| Field name 	| Field type                            	| Required/Optional 	| Description 	|
|------------	|---------------------------------------	|-------------------	|-------------	|
| cost       	| `Double`                              	| Optional          	|  cost associated to this service. 																																			          	|
| currency   	| `String`                              	| Optional     	        |  currency used to express the cost according to  [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217). Samples: `USD`, `EUR`, or `BTC` for US dollar, euro, or bitcoin, respectively.     	|
| billing    	| [`BillingObject`](#billingobject) 		| **Required**         	|  holds the main information of the SLA billing.           																																|

##### Example

###### Synthetic

```
pricing:
    cost: 50.0
    currency: EUR
    billing: BillingObject
```


#### BillingObject
Holds the main information of the SLA billing.

| Field name 	| Field type                                        	| Required/Optional 		| Description 	|
|------------	|---------------------------------------------------	|-------------------		|-------------	|
| period     	| `String`: [`"onepay"`, `"daily"`, `"weekly"`, `"monthly"`, `"quarterly"`, `"yearly"`] 	| **Required**      	| period used for billing. Supported values are: `onepay`: unique payment before start using the service; `daily`: billing at the end of every day; `weekly`: billing at the end of every week; `monthly`: billing at the end of every month; `quarterly`: billing at the end of every quarter; `yearly`: billing at the end of every year           	|
| initial    	| `String`                                          	| Optional      			| start date of the billing cycle according to [ISO 8601](http://www.iso.org/iso/catalogue_detail?csnumber=40874) time format            	|
| penalties  	| Array[[`CompensationObject`](#compensationobject)]	| Optional      	   		| holds the main information of the SLA billing penalties           	|
| rewards    	| Array[[`CompensationObject`](#compensationobject)] 	| Optional      	    	|  holds the main information of the SLA billing rewards           	|

##### Example

###### Synthetic

```
billing:
      period: monthly
```

###### SLA for human services

```
billing:
  period: monthly
  initial: '2016-05-12T10:35:36.000'
  penalties:
    - over:
        escalatedIncidentPercentage:
          $ref: '#/context/definitions/schemas/escalatedIncidentPercentage'
      aggregatedBy: sum
      groupBy:
        serviceLine:
          $ref: '#/context/definitions/scopes/serviceDesk/serviceLine'
        activity:
          $ref: '#/context/definitions/scopes/serviceDesk/activity'
      upTo: -10
```


#### MetricsObject
Holds the main information of the SLA metrics.

| Field name    	| Field type                        | Required/Optional 	| Description 	|
|------------	    |--------------------------------	|-------------------	|-------------	|
| {{metridId}}     	| [`MetricObject`](#metricobject)   | **Required**      	| holds the main information of a SLA single metric            	|

##### Example

###### Synthetic

```
metrics:
    myMetric1: MetricObject
    myMetric2: MetricObject
    myMetric3: MetricObject
```
 
###### SLA for API services

```
metrics:
    requests: MetricObject
    resourceInstances: MetricObject
    animalTypes: MetricObject
```

###### SLA for human services

```
metrics:
    issue_start: MetricObject
    issue_end: MetricObject
    issue_duration: MetricObject
```


#### MetricObject
Holds the main information of a SLA single metric.

| Field name    	| Field type    | Required/Optional 	| Description 	|
|------------	    |-----------    |-------------------	|-------------	|
| schema     	    | `Object`      | **Required**      	| metric schema    |
| measure    	    | `Object`      | **Required**      	| metric measure   |
| type           	| `String`      | **Required**      	| metric type      |
| scope         	| `Object`      | **Required**      	| metric scope     |

##### Example

###### Synthetic

```
myMetric1:
  schema: 
        $ref: '#/context/definitions/schemas/myMetric'
  type: consumption
  scope:
    myScope:
        $ref: '#/context/definitions/scopes/myGlobalScope/myScope'
```
 
###### SLA for API services

```
requests:
  schema:
    $ref: '#/context/definitions/schemas/requests'
  type: consumption
  scope:
    resource:
      $ref: '#/context/definitions/scopes/api/resource'
    operation:
      $ref: '#/context/definitions/scopes/api/operation'
    level:
      $ref: '#/context/definitions/scopes/oai/level'
    account:
      $ref: '#/context/definitions/scopes/oai/account'
resourceInstances:
  schema:
    $ref: '#/context/definitions/schemas/resourceInstances'
  type: check
  scope:
    resource:
      $ref: '#/context/definitions/scopes/api/resource'
    operation:
      $ref: '#/context/definitions/scopes/api/operation'
    level:
      $ref: '#/context/definitions/scopes/oai/level'
    account:
      $ref: '#/context/definitions/scopes/oai/account'
animalTypes:
  schema:
    $ref: '#/context/definitions/schemas/animalTypes'
  type: check
  scope:
    resource:
      $ref: '#/context/definitions/scopes/api/resource'
    operation:
      $ref: '#/context/definitions/scopes/api/operation'
    level:
      $ref: '#/context/definitions/scopes/oai/level'
    account:
      $ref: '#/context/definitions/scopes/oai/account'
```
 
 
###### SLA for human services

```
issue_start:
  schema:
    description: incident start date
    type: string
  computer: 'http://ppinot.computer.papamoscas-company-devel.governify.io/api/v1/indicators/issue_start/'
issue_end:
  schema:
    description: incident end date
    type: string
  computer: 'http://ppinot.computer.papamoscas-company-devel.governify.io/api/v1/indicators/issue_end/'
issue_duration:
  schema:
    description: incident duration
    type: string
    unit: seconds
  computer: >-
    http://ppinot.computer.papamoscas-company-devel.governify.io/api/v1/indicators/issue_duration/
```
 
#### CompensationObject
Holds the main information of a SLA single compensation.

| Field name  	| Field type                                          	            | Required/Optional 	| Description 	|
|-------------	|------------------------------------------------------------ 	    |-------------------	|-------------	|
| over        	| `Object`                                            	            | **Required**      	|  metrics involved in the compensation calculation process           	|
| of          	| Array[[`ScopedCompensationObject`](#scopedcompensationobject)]   	| Optional      	|  holds the main information of the SLA scoped compensations          	|
| aggegatedBy 	| `String`                                                      	| Optional          	|  compensation aggregation function           							|
| groupBy     	| `Object`                                            	            | Optional          	|  compensation aggrupation function           							|
| upTo        	| `Double`                                            	            | Optional          	|  compensation limit        										   	|

##### Example

###### Synthetic

``` 
penalties:
    over:
      myMetric:
        $ref: '#/context/definitions/schemas/myMetric'
    of: ScopedCompensationObject
    aggregatedBy: sum
    groupBy:
      myScope:
        $ref: '#/context/definitions/scopes/myGlobalScope/myScope'
    upTo: -10
```

###### SLA for API services

``` 
penalties:
    - over:
        escalatedIncidentPercentage:
          $ref: '#/context/definitions/schemas/escalatedIncidentPercentage'
      of: ScopedCompensationObject

```

#### ScopedCompensationObject
Holds the main information of a SLA single scoped compensation.

| Field name 	| Field type 	| Required/Optional 	| Description 	|
|------------	|------------	|-------------------	|-------------	|
| value      	| `String`   	| **Required**      	|  scoped compensation value           		|
| condition  	| `String`   	| **Required**      	|  scoped compensation condition           	|

##### Example

###### Synthetic

``` 
- value: '-2'
  condition: myMetric >= 90.00
```

###### SLA for human services

``` 
- value: '-1.5'
  condition: serviceDesk_KPI_03A > 99.98 && serviceDesk_KPI_03A <= 100.00
``` 

#### GuaranteeObject
Holds the main information of a SLA single guarantee.

| Field name 	| Field type                                          	 | Required/Optional 	| Description 	|
|------------	|-----------------------------------------------------	 |-------------------	|-------------	|
| id         	| `String`                                            	 | **Required**      	| guarantee unique identification            							|
| description	| `String`                                            	 |    Optional      	| guarantee description            							|
| scope      	| `Object`                                               | **Required**      	| guarantee scope           											|
| of         	| Array[[`ScopedGuaranteObject`](#scopedguaranteobject)] | **Required**      	| holds the main information of the SLA scoped guarantees            	|

##### Example

###### Synthetic

``` 
guarantees:
    id: myGuarantee
    scope:
        myScope:
            $ref: '#/context/definitions/scopes/myGlobalScope/myScope'
    of:  Array[ScopedGuaranteObject]
```

###### SLA for API services

```
  guarantees:
    - id: guarantees_responseTime
      scope:
        plan:
          $ref: '#/context/definitions/scopes/offering/plan'
        resource:
          $ref: '#/context/definitions/scopes/api/resource'
        operation:
          $ref: '#/context/definitions/scopes/api/operation'
        level:
          $ref: '#/context/definitions/scopes/oai/level'
        account:
          $ref: '#/context/definitions/scopes/oai/account'
      of: Array[ScopedGuaranteObject]
```

###### SLA for human services

```
  guarantees:
    - id: serviceDesk_KPI_12A
          scope:
            priority:
              $ref: '#/context/definitions/scopes/serviceDesk/priority'
            node:
              $ref: '#/context/definitions/scopes/serviceDesk/node'
            serviceLine:
              $ref: '#/context/definitions/scopes/serviceDesk/serviceLine'
            activity:
              $ref: '#/context/definitions/scopes/serviceDesk/activity'
          of:
            Array[ScopedGuaranteObject]
```


#### ScopedGuaranteObject
Holds the main information of a SLA single scoped guarantee.

| Field name 	| Field type                                        	| Required/Optional 	| Description 	|
|------------	|---------------------------------------------------	|-------------------	|-------------	|
| scope      	| `Object`                                          	| **Required**      	|  scoped guarantee scope       									|
| objective  	| `String`                                          	| **Required**      	|  guarantee objective         										|
| with       	| `Object`                                          	| Optional      	|  definition of metrics referenced in `scope` attribute         											|
| window     	| [`WindowObject`](#windowobject)                   	| **Required**      	|  guarantee window      											|
| evidences  	| Array[`Object`]                                      	| Optional      	|  guarantee evidences       									 	|
| penalties  	| Array[[`CompensationObject`](#compensationobject)] 	| Optional      	|  holds the main information of the SLA guarantee penalties        |
| rewards    	| Array[[`CompensationObject`](#compensationobject)] 	| Optional     	|  holds the main information of the SLA guarantee rewards         	|

##### Example

###### Synthetic

``` 
of
    - scope:
    	myScope: P1
      objective: myMetric <= 1.00
      with:
    	myMetric: {}
      window: WindowObject
      evidences:
    	- myMetric_evidence:
    		$ref: '#/terms/metrics/myMetric1_evidence'
      penalties: Array[CompensationObject]
```

###### SLA for API services

``` 
of:
    - scope:
        plan: '*'
        resource: '*'
        operation: '*'
        level: account
        account: '*'
      objective: responseTime <= 800
      window: WindowObject
    - scope:
        plan: pro
        resource: '*'
        operation: '*'
        level: account
        account: '*'
      objective: responseTime <= 250
      window: WindowObject
```

###### SLA for human services

``` 
- scope:
    priority: P1
    node: '*'
  objective: serviceDesk_KPI_12A >= 95.00
  with:
    serviceDesk_KPI_12A:
      resolutionTime: <= 2
      schedule: 'L-DT00:00-23:59'
  window: WindowObject
  evidences:
    - issue_start:
        $ref: '#/terms/metrics/issue_start'
    - issue_end:
        $ref: '#/terms/metrics/issue_end'
    - issue_duration:
        $ref: '#/terms/metrics/issue_duration'
  penalties: Array[CompensationObject]
```


#### WindowObject
Holds the main information of the SLA guarantee window.

| Field name 	| Field type 	| Required/Optional 	| Description 	|
|------------	|------------	|-------------------	|-------------	|
| initial    	| `String`   																			| Optional      	| start date of the window according to [ISO 8601](http://www.iso.org/iso/catalogue_detail?csnumber=40874) time 																														   																			|
| end        	| `String`   																			| Optional      		| end date of the window according to [ISO 8601](http://www.iso.org/iso/catalogue_detail?csnumber=40874) time
| rules        	| `String`   																			| Optional      		| rules of the window according to [Rrule](https://www.github.com/jakubroztocil/rrule) library following the [iCalendar RFC](https://datatracker.ietf.org/doc/html/rfc5545) specification, with a few important [differences](https://github.com/jakubroztocil/rrule#differences-from-icalendar-rfc). Two rules must be defined, the first one for the start of the periods and the second one for the end, separated by "---"																													          																			|
| type       	| `String`   																			| **Required**      	| window type																																																																											|
| period     	| `String`: [`"hourly"`, `"daily"`, `"weekly"`, `"monthly"`, `"yearly"`, `"customRules"`]    	| **Required**      	|  used period. Supported values are:  `hourly`: at the end of every hour; `daily`: at the end of every day; `weekly`: at the end of every week; `monthly`: at the end of every month; `yearly`: at the end of every year; `customRules`: defined in 'rules' field   	|

##### Example

###### Monthly period with an initial date of '2009-10-16'

``` 
window:
    initial: '2009-10-16'
    type: static
    period: 'monthly'
``` 

###### Custom period. The first rule is defined for the periods start every day at 10 o'clock and the second one is defined for the periods end every day at 22 o'clock.

``` 
window:
    type: static
    period: 'customRules'
    rules: 'DTSTART:20200101T000000Z\nRRULE:FREQ=DAILY;INTERVAL=1;BYHOUR=10---DTSTART:20200101T000000Z\nRRULE:FREQ=DAILY;INTERVAL=1;BYHOUR=22'
``` 

You can find more documentation of the period definition [here](/reference-guides/periods).

#### ConfigurationsObject
Holds the main information of the SLA configurations.

| Field name    	            | Field type                                    | Required/Optional 	| Description 	|
|----------------------------   |------------------------------------------     |-------------------	|-------------	|
| {{configurationId}}  	    | [`ConfigurationObject`](#configurationobject) | **Required**      	| holds the main information of the SLA configurations            	|

##### Example

###### Synthetic

``` 
configurations:
    myConfiguration1: ConfigurationObject
    myConfiguration2: ConfigurationObject
    myConfiguration3: ConfigurationObject
```

###### SLA for API services

``` 
configurations:
    availability: ConfigurationObject
```


#### ConfigurationObject
Holds the main information of a SLA single configuration.

| Field name    | Field type                                    						| Required/Optional 	| Description 	|
|------------   |---------------------------------------------------------------------  |-------------------	|-------------	|
| scope  	    | `Object`																| **Required**      	|  configuration scope           								|
| of     	    | Array[[`ScopedConfigurationObject`](#scopedconfigurationobject)] 		| **Required**      	| holds the main information of the SLA scoped configuration 	|

##### Example

###### Synthetic

``` 
myConfiguration1:
  scope:
    myScope:
      $ref: '#/context/definitions/scopes/myGlobalScope/myScope'
  of: ScopedConfigurationObject
```

###### SLA for API services

```
availability: 
    scope:
        plan:
          $ref: '#/context/definitions/scopes/offering/plan'
      of: ScopedConfigurationObject
```


#### ScopedConfigurationObject
Holds the main information of a SLA singled scoped configuration.

| Field name 	| Field type                      	| Required/Optional 	| Description 	|
|------------	|---------------------------------	|-------------------	|-------------	|
| scope      	| `Object`	                        | **Required**      	| configuration scope            	|
| value      	| {`String`, `Number`, `Boolean`} 	| **Required**      	| configuration value            	|

##### Example

###### Synthetic

``` 
of:
    - scope:
        myScope: '*'
    value: 'true'
```

###### SLA for API services

```
of:
    - scope:
        plan: '*'
      value: 'R/00:00:00Z/15:00:00Z'
    - scope:
        plan: pro
      value: 'R/00:00:00Z/23:59:59Z'
```


#### QuotaObject
Holds the main information of a SLA single quota. 

| Field name 	| Field type                                       	| Required/Optional 	| Description 	|
|------------	|--------------------------------------------------	|-------------------	|-------------	|
| id         	| `String`                                         	| **Required**      	| quota unique identification             				|
| scope      	| `Object`                                         	| **Required**      	| quota scope            								|
| over       	| `Object`                                         	| **Required**      	| metrics involved in the quota calculation process    	|
| of         	| Array[[`ScopedQuotaObject`](#scopedquotaobject)] 	| **Required**      	| holds the main information of the SLA scoped quotas.  |

##### Example

###### Synthetic

``` 
-   id: myQuota
    scope:
        myScope:
         $ref: '#/context/definitions/scopes/myGlobalScope/myScope'
    over:
        myMetric:
            $ref: '#/terms/metrics/myMetric1'
    of:  Array[ScopedQuotaObject]
```

###### SLA for API services

``` 
- id: quotas_requests
      scope:
        plan:
          $ref: '#/context/definitions/scopes/offering/plan'
        resource:
          $ref: '#/context/definitions/scopes/api/resource'
        operation:
          $ref: '#/context/definitions/scopes/api/operation'
        level:
          $ref: '#/context/definitions/scopes/oai/level'
        account:
          $ref: '#/context/definitions/scopes/oai/account'
      over:
        requests:
          $ref: '#/terms/metrics/requests'
      of: Array[ScopedQuotaObject]
```


#### ScopedQuotaObject
Holds the main information of a SLA single scoped rate. 

| Field name 	| Field type                                 	| Required/Optional 	| Description 	|
|------------	|--------------------------------------------	|-------------------	|-------------	|
| scope      	| `Object`                                   	| **Required**      	| scoped quota scope            							|
| limits     	| Array[[`LimitObject`](#limitobject)] 	        | **Required**      	| holds the main information of a SLA scoped quota limit  	|

##### Example

###### Synthetic

``` 
-   scope:
        myScope:
            $ref: '#/context/definitions/scopes/myGlobalScope/myScope'
    limits: Array[LimitObject] 	
```

###### SLA for API services

``` 
- scope:
    plan: '*'
    resource: /pets
    operation: get
    level: tenant
    account:
      $ref: '#/context/consumer'
    limits:
    - max: 40
      period: hourly
- scope:
    plan: pro
    resource: /pets
    operation: post
    level: account
    account: '*'
  limits:
    - max: 100
      period: minutely
```


#### LimitObject
Holds the main information of a SLA scoped quota/rate limit.

| Field name 	| Field type 	| Required/Optional 	| Description 	|
|------------	|------------	|-------------------	|-------------	|
| max        	| `Number`   																			| **Required**   | quota/rate maximum value      																																																																									|
| period     	| `String`: [`"daily"`, `"weekly"`, `"monthly"`, `"quarterly"`, `"yearly"`]    	| Optional      	|  used period. Supported values are:  `daily`: at the end of every day; `weekly`: at the end of every week; `monthly`: at the end of every month; `quarterly`: at the end of every quarter; `yearly`: at the end of every year    	|

##### Example

###### Synthetic

``` 
limits:
    - max: 40
      period: hourly
```


#### RateObject
Holds the main information of a SLA single rate. 

| Field name 	| Field type                                       	| Required/Optional 	| Description 	|
|------------	|--------------------------------------------------	|-------------------	|-------------	|
| id         	| `String`                                         	| **Required**      	| rate unique identification             				|
| scope      	| `Object`                                         	| **Required**      	| rate scope           									|
| over       	| `Object`                                         	| **Required**      	| metrics involved in the rate calculation process     	|
| of         	| Array[[`ScopedRateObject`](#scopedrateobject)] 	| **Required**      	| holds the main information of the SLA scoped rates.  	|

##### Example

###### Synthetic

``` 
rates:
    - id: myRate
      scope:
        myScope:
            $ref: '#/context/definitions/scopes/myGlobalScope/myScope'
      over:
        myMetric:
          $ref: '#/terms/metrics/myMetric1'
      of: Array[ScopedRateObject]
```

###### SLA for API services

``` 
rates:
    - id: rates_requests
      scope:
        plan:
          $ref: '#/context/definitions/scopes/offering/plan'
        resource:
          $ref: '#/context/definitions/scopes/api/resource'
        operation:
          $ref: '#/context/definitions/scopes/api/operation'
        level:
          $ref: '#/context/definitions/scopes/oai/level'
        account:
          $ref: '#/context/definitions/scopes/oai/account'
      over:
        requests:
          $ref: '#/terms/metrics/requests'
      of: Array[ScopedRateObject]
```


#### ScopedRateObject
Holds the main information of a SLA single scoped rate. 

| Field name 	| Field type                                 	| Required/Optional 	| Description 	|
|------------	|--------------------------------------------	|-------------------	|-------------	|
| scope      	| `Object`                                   	| **Required**      	| scoped rate scope            								|
| limits     	| Array[[`LimitObject`](#limitobject)] 	        | **Required**      	| holds the main information of a SLA scoped rate limit    	|

##### Example

###### Synthetic

``` 
-   scope:
        myScope:
            $ref: '#/context/definitions/scopes/myGlobalScope/myScope'
    limits: Array[LimitObject] 	
```

###### SLA for API services

``` 
- scope:
    plan: '*'
    resource: /pets
    operation: get
    level: account
    account: '*'
  limits:
    - max: 3
      period: secondly
- scope:
    plan: free
    resource: /pets
    operation: get
    level: account
    account: '*'
  limits:
    - max: 1
      period: secondly
```


## Examples

- A basic and synthetic example, in [YAML](http://iagree.specs.governify.io/iAgree-example-synthetic.yaml) and [JSON](http://iagree.specs.governify.io/iAgree-example-synthetic.json) format, compliant with the current iAgree specification version.
- A SLA for an API service, in [YAML](http://iagree.specs.governify.io/iAgree-example-api.yaml) and [JSON](http://iagree.specs.governify.io/iAgree-example-api.json) format, which defines some pricing plans and quotas/rates over "pets" resources.
- A SLA for a human service, in [YAML](http://iagree.specs.governify.io/iAgree-example-process.yaml) and [JSON](http://iagree.specs.governify.io/iAgree-example-process.json) format, that tries to regulate some metrics and guantees in a "IT service desk" process.


## References

1. [Keywords to indicate requirement levels - RFC 2119](http://www.ietf.org/rfc/rfc2119.txt).
2. [JSON](http://www.json.org)
3. [YAML](http://yaml.org/spec)
2. [Date and time encoding - ISO 8601](http://www.iso.org/iso/catalogue_detail?csnumber=40874)
3. [Currency codes - ISO 4217](https://en.wikipedia.org/wiki/ISO_4217)

