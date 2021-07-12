---
title: 'Dynamic Collector'
order: 2
hide: true
---

# Overview
This is a template for creating a new collector for the Governify echosystem.

# Installation of the template
1. Create your repository on GitHub with a README.md file and clone it into your system. 
2. Download this repository as a ZIP and paste all the files into your repository overwritting the readme file.
3. Modify this README.md and the badges urls to referenciate the new repository.
4. Activate project on coveralls for the badge to start working (Must be a public) and add this to the `/.github/workflows/nodejs.yml` file at the end.
  ```yml
  - name: Coveralls
        uses: coverallsapp/github-action@master
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
  ```

David-dm badges will not work unless the repository is public.

# Usage
## Explanation
The POST controller will do the following when requested:
  1. Validate the input.
  2. Divide the dsl.metric.window into a set of periods.
  3. Create the identifier of the computation and return it to the client.
  4. Ask for the metric for each period generated on step 2 to the computationCalculator (This is what you should implement).
  5. When all the metrics are returned to it, it generates an array and sets it to the identifier generated on step 3 for the client to ask for it.
 
The POST controller, when requested, will ask the POST controller for the computation and will respond depending:
  - If the computation is **null**, it means it still working. This returns a **202** code.
  - If the computation is an **array**, it means it is everything calculated. This returns a **200** with the computation.
  - If the computation is a **string**, it means there was a validation error. This returns a **400** code with the error message.
  - If the computation is **undefined**, it means the identifier does not exist. This returns a **404** code.
  - If the computation is **anything else**, what should not happen, it returns a **500** code.
  
## Implementation
- **Code**: All you have to do is to go to the file `/controllers/computationCalculator/index.js` and implement your code resolving the metric in the structure defined there. You have the entire DSL from the POST and a period to calculate the metric. Do not use the window of the DSL because the controller already divided the periods.

- **Test**: There is a test implemented which starts the server and makes a POST request, and with the computationId received, makes a GET request to obtain the computation. To fit it with your code just create a DSL petition which response should never change and copy the DSL and the computations of the GET response into the initializeDataAndServer function on the test.js file (lines 79-144)

- **Validation**: The system is validating the dates to fit ISO 8601 standard. If you need to change it or to validate any other field you can do it on the function validateInput in the apiv2computationsControllerService.js file (lines 60-82). All you have to do is to reject the promise with an error if a field is invalid.

- **Swagger spec**: If you need to change the POST data, the DSL or the responses you can do it by going to /api/oas-doc.yaml and doing it there. We encourage you to use the given one but it may be necessary in some cases. Modifying the DSL should cause no problems at all.

# About
This project leverages the mega-awesome [oas-tools](https://github.com/isa-group/oas-tools) middleware which does most all the work.
