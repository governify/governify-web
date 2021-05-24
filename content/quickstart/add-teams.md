---
title: 'Adding teams to the system'
order: 2
---
## Adding teams to the system

As it was explained <a href="/quickstart/auditing-agile-2.0#scope.json">here</a>, the scope.json contains all the information about courses, teams and members available as an API (Scope Manager) for the other components to have access to it.



### Join

For making the process of adding teams to be audited in the system more intuitive, "Join" is another microservice serving a simple frontend which is enough for this purpose. It gives the teams the ability to register by themselves into the system without the need of an administrator to do it.

By default, it can be accessed through https://join[BLUEJAY_SERVICES_PREFIX][BLUEJAY_DNS_SUFFIX] (f.e. https://join.bluejay.mydomain.org) in case Bluejay is deployed in the cloud or by accessing to http://localhost:6001 if it is deployed locally.

**Bear in mind** that when registering a team to a course, the system will look for:
- A **TPA template** called the same as the course in the assets in the folder /public/renders/tpa and use it to generate the TPA for the team. In case there this template does not exist, it will use template.yaml as TPA template.
- A **director script** called the same as the course in the assets in the folder /public/director and a **json** containing the information about the interval and start and end of task execution and will add it to the director for it to function. In case there isn't, the director won't do anything. This has to be configured for the system to automatically generate data about the team.

#### Full register
It offers an interface that works in three steps:
1. First the GitHub Repository URL is entered and "Check" button is pressed. It will check for any mistakes on the info.yml file and, if everything is ok a second section will appear. In case you still don't have the info.yml file in the root of your repo (main or master branch) you can check this [template](https://github.com/governify/audited-project-template/blob/main/info.yml) or this [example](https://github.com/governifyauditor/goldenflow-showcase-project/blob/main/info.yml) and add it before continuing.
2. A new input will appear asking for the Course name will appear. By pressing "Join" the system will check that this course exists in the scopes.json. If it doesn't please check out this <a href="/quickstart/auditing-agile-2.0#scope.json">link</a> and add an object for storing a new course with a name for the course of your desire. Remember to restart the Scope Manager before continuing if you modified the scopes.json.
3. If the course exists and the project was not registered previously, there will appear a success message and the system will be already registered! A badge with it's markdown will appear for teams to copy it into their README.md file for ease of access and they can click on it to access the dashboard. If the team had already registered before the badge will appear but it won't register the team again.

#### Simplified register
If the administrator wants to give users the ability to register to the system but don't needs the teams to select a course, it can be passed as a parametter in the URL simplifiying the process:
1. By accessing to the URL followed by ?course=coursename (f.e. https://join.bluejay.mydomain.org?course=computerscience) a simplified view will appear. It will ask for the repository URL and, by clicking register, it will check the info.yml and, if succedes, add the team to the project. Remember the course has to be already created in the scopes.json file or it won't let the team to register. A badge will appear for users to access to their dashboard 

#### TODO - Hide dashboard and badge