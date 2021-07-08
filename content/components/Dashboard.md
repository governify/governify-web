---
title: "Dashboard"
order: 6
hide: true
---

Repository with the docker files to build the custom grafana image for Governify Project.
Default user and password:
> - User: governify-admin
 > - Password: governify-project

Customizations:
- Custom scripted dashboard to load JSON from external URL:

https://host.com/dashboard/script/dashboardLoader.js?dashboardURL={ExternalURL}
- Disabled HTML sanitization
- Custom default admin and password
