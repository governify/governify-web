---
title: "Period definition"
order: 999
hide: true
---

## Introduction 

In addition to the WindowObject represented in the [iAgree-5.2](/reference-guides/iAgree-5_2), here is going to be explained in detail how are window's periods defined and processed.

#### Basic periods

There are 5 base periods: [`"hourly"`, `"daily"`, `"weekly"`, `"monthly"`, `"yearly"`]. Each one is converted into two rrules when the guarantee is going to be calculated. The first rrule is defined for the period's start and the second one for the end. In this way the periods are obtained by linking each start with its end.

##### Example

###### Monthly period

``` 
let rruleInit = new RRule({
            freq: Rrule.MONTHLY,
            dtstart: 2021-01-01,
            until: 2021-09-10
        });

let rruleEnd = new RRule({
            freq: Rrule.MONTHLY,
            dtstart: 2021-01-01,
            until: 2021-09-10,
            bysecond: -1
        });
``` 

#### Customed periods

If it is needed to define a more specific period, you can establish the period field like `"customRules"` and define the period in the rules field. You can have a look into [Rrule test tool](https://jakubroztocil.github.io/rrule/) and test your own rules. Remember that if you define a custom rule, you will need to define two rules. The first one will define the start of every period and the second one will define the end of every period. It is important to separate them with '---', so make sure your 'rules' field looks like 'startRule---endRule'.

In order to have a well-defined rrule, an 'UNTIL' property is added to the rrules, which will establish when the periods end. This 'UNTIL' property is the end field of the window or the current date otherwise.

##### Example

###### Custom period

``` 
rules: 'DTSTART:20200101T000000Z\nRRULE:FREQ=DAILY;INTERVAL=1;BYHOUR=10---DTSTART:20200101T000000Z\nRRULE:FREQ=DAILY;INTERVAL=1;BYHOUR=22;BYSECOND=-1'
```

###### Custom period after UNTIL property added

``` 
let rruleInit = 'DTSTART:20200101T000000Z\nRRULE:FREQ=DAILY;INTERVAL=1;BYHOUR=10;UNTIL=20210910T113623Z'
let rruleEnd = 'DTSTART:20200101T000000Z\nRRULE:FREQ=DAILY;INTERVAL=1;BYHOUR=22;BYSECOND=-1;UNTIL=20210910T113623Z'
``` 

#### Last period

Unless the window's end date is exactly the rrule's last end date, it is necessary to add one more period, which includes from the last generated start date to the window's end date or the current date otherwise. This period is generated automatically when the agreement is calculated.