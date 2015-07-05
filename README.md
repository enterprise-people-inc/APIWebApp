# Enterprise People Inc - GSA 18f RFQ response. - APIWebApp
##Deliverables
[Pool Two Prototype Location] (http://gsa-search.herokuapp.com)

[Pool Two Repository on GitHub] (https://github.com/enterprise-people-inc/APIWebApp)

Summary of Approach: README.md (this file)

Product Backlog: On Ralley, final snapshot in /documents/

RFQ Attachment E: /documents/rfq/

###Vision

For people who want to find about the Drug events for themselves or their family. Enterprise People Inc built APIWebApp, which is a simple and responsive web app that allows people to quickly search for the drugs and see the impacts it did in the past.

###Approach

We approached this as standalong web application consuming RESTful web services. RESTful web services are published thru OpenFDA AP. We used open-source technologies to consume and display the retrieved result on our web application.

##Team Roles
- [x] Technical Architect
- [x] Front End Web Developer
- [x] Backend Web Developer
- [x] DevOps Engineer

###Technology Stack 

####open source technologies
- [x] AngularJS
- [x] Boostrap
- [x] jQuery
- [x] Yeoman
- [x] npm
- [x] bower
- [x] grunt
- [x] GitHub

####PaaS (Platform as a Service)
- [x] Heroku

####Continous Integration
- [x] Heroku & Git automatic deployment
- [x] CodeShip to build & deploy to different environments. (GitHub commit triggers the build and deploy for DEVELOPMENT & TESTING)

###Development Process
Our architect, expored multiple technologies and frameworks, and finalized on AngularJS MVC framework for this project. Architect established the best practies and industry standards to minimize the custom code and also to make it extendable and re-usable.

Development team followed the design to define the layouts. Utilizing responsive UI framework to make sure the web application works on multiple devices. After the basic integration of OpenFDA.gov RESTful web services, development team decided to go single search functionality related to drug events from OepnFDA.gov. Development team went with mutiple prototypes exploring various AngularJS framework utilizing angular-fullstack & angular generators using yeoman.

All the source code is stored in .git, Scrum master and Product owner worked together to come up with a plan and define a scrum for this development using Ralley.

###Testing & Deployments
Our deployment process includes ```grunt build``` runs all the tests and generates the necessary files for deployments under dist folder, which gets deployed to Heroku automatically once the changed code is commited to Git.

###Deployment
We have used Heroku as our deployment platform to continously deploy the application directly form GitHub.

###Installing and Running it locally
####Prerequisites
- [x] Install npm
- [x] Install bower

####Running it locally
- [x] npm install
- [x] bower install
- [x] grunt build
- [x] grunt serve (http://localhost:9000)

##License

APIWebApp is licensed under the MIT license. For details, see the LICENSE file in our GitHub repository.



