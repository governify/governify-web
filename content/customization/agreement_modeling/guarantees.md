---
title: "Guarantees"
order: 2
---

After a Agreement is designed using natural language, it needs to be transformed in order for the system to work with it. iAgree is the syntax used for this transformation, defining what it's called guarantee. The following block belongs to a real guarantee of a an auditing tool used in education for measuring teams behavior:

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
* **scope**: The potential scopes which can be used to obtain the actual computation. These are usually referenced from the definitions at the beggining of the TPA. Used also to take default values defined in the scopes in case it is not given in the of.scope value.
* **of**: This field is composed of 4 objects:
    * **scope**: This scope defines the actual target of the metrics, that is, if they should be computed for a whole team or each member separately. In the example, as the member is not declared, it will use the information from the whole team.
    * **with**: This object should contain one or more metrics. These metrics are the ones the guarantee is going to use inside the objective.
    * **objective**: Conformed by one or more metrics and a set of operators. The system will first use the numerical operations to calculate a value, and then, it will compare the values using the logical operator. This will define the values that are considered appropriate for the practice and set up a threshold(Line X). In the example, the result values of the metric "PERCENTAGE_STARTEDSTORIES_NEWBRANCH" have to be equal or greater than 75. 
    * **window**: This contains 3 fields: type is used to define a static or dynamic window(static is usually used), period indicates how frequently the practice adherence will be calculated and initial defines the initial date to start spliting using the period field.

Here is a table comparing the different guarantees:
In order to exemplify this, in [this link](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector/README.md#guarantees) there are a list of guarantees examples. In particular, these guarantees DSLs are contained:

| Description                                                                                                                             | DSL definition                                                                                                                                                    |
|-----------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Percentage of started stories in Pivotal Tracker correlated with the creation of a branch in GitHub within a day every day by a team    | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#75_percent_newbranch_started_stories_within_a_day)          |
| Percentage of started stories in Pivotal Tracker correlated with the creation of a branch in GitHub using a binding every day by a team | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#75_percent_newbranch_started_stories_within_a_day_bind)     |
| Percentage of finished stories in Pivotal Tracker correlated with the opening of a PR in GitHub within a day every day by a team        | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#75_percent_master_pr_open_finsh_stories_within_a_day)       |
| Percentage of finished stories in Pivotal Tracker correlated with the opening of a PR in GitHub using a binding every day by a team     | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#75_percent_master_pr_open_finsh_stories_within_a_day_bind)  |
| Percentage of delivered stories in Pivotal Tracker correlated with the merge of a branch in GitHub within a day every day by a team     | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#75_percent_master_pr_merge_delvr_stories_within_a_day)      |
| Percentage of delivered stories in Pivotal Tracker correlated with the merge of a branch in GitHub using a binding every day by a team  | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#75_percent_master_pr_merge_delvr_stories_within_a_day_bind) |
| Percentage of merged PR in GitHub correlated with a release in heroku within one hour every day by a team                               | [Show definition](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#75_percent_master_pr_merge_deploy_within_a_day)             |

There is another [example](https://github.com/isa-group/governify-examples/blob/master/metrics/event-collector#coverage_delta_variation_higher_equal_zero) using CodeClimate's coverage of the Delta Variation between the last day and the penultimate day, every day by a team.