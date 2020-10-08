---
title: "Guarantees"
order: 2
---
Work in progress.

After a TP is designed using natural language, it needs to be transformed in order for the system to work with it. iAgree is the syntax used for this transformation, defining what it's called guarantee. The following block belongs to a real guarantee:

```json  class:"lineNo"
{
    id: "OVER_75_PERCENT_STARTEDSTORIES_NEWBRANCH_WITHIN_AN_HOUR",
    notes: "At least 75% of started stories in Pivotal Tracker are correlated with the creation of a branch in GitHub within an hour.",
    scope: {
        project:{
            name: "Project",
            description: "Project"
        }
    },
    of: {
        scope: {
            project: 2317518
        },
        with: {
            "PERCENTAGE_STARTEDSTORIES_NEWBRANCH": {}
        },
        objective: "PERCENTAGE_STARTEDSTORIES_NEWBRANCH >= 75",        
        window:{
            type: "static" ,
            period: "daily" ,
            initial: "2019-03-07"
        }
    }    
}
```

A guarantee is composed of:
* **id**: Field for declaring a identification name for it
* **notes**: It can be filled with descriptive information 
explaining it but it is not used for the compute of the TP.
* **?scope**
* **with**: This field is composed of 4 objects:
    * **scope**: It defines the target of the metrics, that is, if they should be computed for a whole team or each member separately. In the example, as the member is not declared, it will use the information from the whole team.
    * **?metric**: This object should contain one or more metrics. These metrics are the ones the guarantee is going to use inside the objective.
    * **objective**: Conformed by one or more metrics and a set of operators. The system will first use the numerical operations to calculate a value, and then, it will compare the values using the logical operator. This will define the values that are considered appropriate for the practice and set up a threshold(Line X). In the example, the result values of the metric "PERCENTAGE_STARTEDSTORIES_NEWBRANCH" have to be equal or greater than 75. 
    * **?window**: This contains 3 fields: type is used to ..., period indicates how frequently the practice adherence will be calculated and initial defines the initial date to start spliting using the period field.
    

