---
title: "Period rules definition"
order: 999
hide: true
---

## Introduction 

In addition to the WindowObject represented in the [iAgree-5.2](/reference-guides/iAgree-5_2), here is going to be explained in detail how are window periods defined and processed. 

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

If it is needed to define a more specific period, you can establish the period field like `"customRules"` and define the period in the rules field following the [iCalendar RFC](https://datatracker.ietf.org/doc/html/rfc5545) specification, with a few important [differences](https://github.com/jakubroztocil/rrule#differences-from-icalendar-rfc). You can have a look into [Rrule test tool](https://jakubroztocil.github.io/rrule/) and test your own rules. Remember that if you define a custom rule, you will need to define two rules. The first one will define the start of every period and the second one will define the end of every period. It is important to separate them with '---', so make sure your 'rules' field looks like 'startRule---endRule'.

In order to have a well-defined rrule, an 'UNTIL' property is added to the rrules, which will establish when the periods end. This 'UNTIL' property is the end field of the window or the current date otherwise.

##### Example

###### Custom period where the first rule is defined for the periods start every day at 10 o'clock from 2020-01-01T00:00:00Z and the second one is defined for the periods end every day at 22 o'clock from 2020-01-01T00:00:00Z.

``` 
rules: 'DTSTART:20200101T000000Z\nRRULE:FREQ=DAILY;INTERVAL=1;BYHOUR=10---DTSTART:20200101T000000Z\nRRULE:FREQ=DAILY;INTERVAL=1;BYHOUR=22;BYSECOND=-1'
```

###### Custom period after UNTIL property added. The first rule is defined for the periods start every day at 10 o'clock from 2020-01-01T00:00:00Z until 2021-09-10T00:00:00Z and the second one is defined for the periods end every day at 22 o'clock from 2020-01-01T00:00:00Z until 2021-09-10T00:00:00Z

``` 
let rruleInit = 'DTSTART:20200101T000000Z\nRRULE:FREQ=DAILY;INTERVAL=1;BYHOUR=10;UNTIL=20210910T000000Z'
let rruleEnd = 'DTSTART:20200101T000000Z\nRRULE:FREQ=DAILY;INTERVAL=1;BYHOUR=22;BYSECOND=-1;UNTIL=20210910T000000Z'
``` 

#### Last period

Unless the window end date is exactly the rrule last end date, it is necessary to add one more period, which includes from the last generated start date to the window end date or the current date otherwise. This period is automatically generated when the agreement is being calculated.

##### Example

###### If we define a basic "monthly" period from "2020-01-01T00:00:00Z" until "2021-01-10T00:00:00Z", every single period would be generated, being the last one: `[Start: 2020-12-01T00:00:00Z, End: 2020-12-31T23:59:59Z]`. However, there is one more period to be calculated: `[Start: 2021-01-01T00:00:00Z, End: 2020-01-10T00:00:00Z]`. This last period is automatically generated when the agreement is being calculated.

![Diagram](../../assets/lastPeriod.svg)
