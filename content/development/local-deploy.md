---
title: 'Setting up the system locally'
order: 2
---
## Locally deploying Bluejay

### Introduction
In order to develop any feature or adding a new component to Bluejay's ecosystem, the best way to do it is by deploying all the components locally.

The easiest aproach is to deploy using docker the entire infrastructure and, in case a microservice is needed to be modified, stop the container and start it with node locally so the container has not to be builded and deployed with each change.
___
### Infrastructure
The infrastructure and microservices are already configured to work straight away and be connected. All the infrastructure will be exposed so no docker network is needed. All the components will be deployed locally using the following ports:

<center>

| Component          | Port        |
|--------------------|-------------|
| Render             | 5100        |
| Assets             | 5200        |
| Reporter           | 5300        |
| Registry           | 5400        |
| Collector-events   | 5500        |
| Dashboard          | 5600        |
| Scopes             | 5700        |
| Director           | 5800        |
| DB-Mongo-Registry  | 5001        |
| DB-Influx-Reporter | 5002        |
| DB-Collector-Redis | 5003        |

</center>

### Deploying the system

The prerequisites for deploying the system are:
 - **Git** for cloning the repository
 - **Docker** (v20.0.0 or greater) and **docker-compose** (v1.25.0 or greater) installed 
 - Having the **ports** showed up in the last section available.

#### Steps

1. Clone the repository and checkout to the assets branch:
```
git clone https://github.com/governify/bluejay-infrastructure
cd bluejay-infrastructure
git checkout origin/assets
```

2. Deploy the system
```
docker-compose -f ./docker-compose-local.yaml --env-file ./.env-local up -d
```

Bear in mind that any key or <a href="#configuration">configuration</a> can be setted up in the .env-local file instead of .env. On any docker-compose-local.yaml or .env-local change, run the step 2 again it order for it to take place. Also any service deployed with node won't use the .env-local variables so make sure they are properly configured.

#### Quick tour
The main interaface is accesible from the UI on **localhost:5100**.

The default credentials for this interface are: 
 * User: governify-admin 
 * Password: governify-project

<Info>This credentials can be changed in the .env-local file.</Info>

In this interface you should be able to see a list of all the teams you have in your configuration. By default, it comes with a predefined example project.

![Projects list interface of Governify](../images/auditing_agile/ui-interface.PNG)

To start auditing the example project simply click on the "Create TPA" button right next to the team's name (project01). This will create a simple predefined agreement for that team to start auditting it.

![Create TPA Button](../images/auditing_agile/create_tpa.png)

A new tab will open and, once the agreement is created, the TPA view of the project should appear. It contains information about it along the guarantees and metrics in use.

![TPA view](../images/auditing_agile/tpa_view.PNG)

To calculate data for this project, the top-right blue button `Calculate Metrics` has to be clicked and a form will apear.

![Calculate Metrics form](../images/auditing_agile/compute_metrics.PNG)

The dates should be the same as the image in order to appear the correct information and the checkbox has to be accepted. By clicking the `Compute` button the system will start computing and, if everything goes well, after 5-20 seconds, the `TPA data is being generated for the period.` alert message will change to `Points creation ended.`

Clicking the `Dashboard` green button at the top-right corner, a new tab will open. The default username and password are governify-admin and governify-project.

<Info>This credentials can be changed, once logged, going to the icon in the bottom left part of the Dashboard, clicking on preferences, and accessing the section Change password at the top of the page.</Info>

Once logged, the dashboard for the project will be opened where all the audit data can be viewed.

![Dashboard of the example project](../images/auditing_agile/dashboard.png)

Now is time to configure your own projects in order to audit them.

___
#### Configuration
Bluejay should be able to access team data. To achieve this, the API Keys for each team that will be tracked should be provided.

There are 2 different files inside the cloned folder for configuring the system in order to start using it:
 * /.env-local
   * This file contains the environment variables to configure the system, including the different API tokens. You can also change here the password to access the UI and the assets manager Theia UI.
 * /assets/private/scope-manager/scopes.json
   * The scope manager is the component serving the information about the projects. This file contains the different tools a team is using as well as information from the members and tokens to access that data.

##### .env-local
Here are contained all configuaration variables. Enter here your tokens for the different APIs for the Event Collector to use it by default if it is not given for the project in the scope.json file.

##### scope.json
This file contains all the information from the different courses, teams and members to be identified along the different tools. It is organized with a hierarchy as the following:
 * First it has a first array called development which contains the different classes. 
 * Each class has a projects array containing all the projects (teams) inside that course. 
 * Each project has a members array containing all the members inside that project.
 * Each of these objects (course, project, member) follows the same structure:
``` json
{
    "parentId": "parent01",
    "identities": [],
    "credentials": [],
    "childs": []
}
```
Inside each object there is two different arrays:
 * Identities is used to store the information that identifies that object in the different tools. 
 * Credentials have all the tokens needed to obtain information from those tools. 

For example if the object is a project, identities will have information from the different tools and credentials concerning those tools. Their childs are the members so it will have 0 or more member objects inside the members array. 

This is an example scopes.json template file:

``` json
/configurations/scope-manager/scopes.json
{
    "development": [
        {
            "classId": "class01",
            "identities": [],
            "credentials": [],
            "projects": [
                {
                    "projectId": "project01",
                    "identities": [
                        {
                            "source": "github",
                            "repository": "repo01",
                            "repoOwner": "owner01"
                        },
                        {
                            "source": "pivotal",
                            "projectId": 1
                        },
                        {
                            "source": "heroku",
                            "projectId": "id1"
                        },
                        {
                            "source": "travis"
                        },
                        {
                            "source": "codeclimate"
                        }
                    ],
                    "credentials": [
                        {
                          "source": "github",
                          "apiKey": "githubToken"
                        },
                        {
                          "source": "pivotal",
                          "apiKey": "pivotalToken"
                        },
                        {
                          "source": "heroku",
                          "apiKey": "herokuToken"
                        },
                        {
                          "source": "travis",
                          "apiKey": "travisToken"
                        },
                        {
                          "source": "codeclimate",
                          "apiKey": "codeclimateToken"
                        }
                    ],
                    "members": [
                        {
                            "memberId": 1,
                            "identities": [
                                {
                                    "source": "github",
                                    "username": "githubName1"
                                },
                                {
                                    "source": "pivotal",
                                    "username": "pivotalName1"
                                }
                            ],
                            "credentials": []
                        },
                        {
                            "memberId": 2,
                            "identities": [
                                {
                                    "source": "github",
                                    "username": "githubName2"
                                },
                                {
                                    "source": "pivotal",
                                    "username": "pivotalName2"
                                }
                            ],
                            "credentials": []
                        }
                    ]
                }
            ]
        }
    ]
}
```
This file needs to be filled up with the different teams and members for the system to start auditing them. Also any needed credential for each tool has to be inserted. If the tools are public, no token might be needed. In that case, mind the API rate limits. Heroku cannot work without a token. For default keys for not having to fill them in the scopes.json for each project, keep reading.

After modifiying this file, the Scope Manager needs to be restarted for it to serve the new scopes:
```
docker restart bluejay-scope-manager
```


#### Develop a feature in an existing microservice

To develop a feature is as simple as shutting the container down and then starting the microservice cloned from GitHub. F.e.: If the collector-events wants to be modified:

1. Stop the container:
```
docker stop bluejay-collector-events
```

2. Clone and start the microservice:
```
git clone https://github.com/governify/collector-events
cd collector-events
npm i
node index
```

It will start in the same port as the container was and will be properly connected to the entire infrastructure.
___

___
#### Customization
Bluejay is customizable in every aspect. You can create new agreements and dashboards. Check the following sections:
- [Agreement Modeling customization](/customization/agreement_modeling)
<!-- - [User Interfaces customization](/customization/user_interfaces) -->
- [Dashboards customization](/customization/dashboards)
