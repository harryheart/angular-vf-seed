# Angular VF template project.
*Develop angular app in local environment and then deploy it as static resource.*

# Prerequests:
1. SF migration tool https://developer.salesforce.com/docs/atlas.en-us.daas.meta/daas/forcemigrationtool_container_install.htm
2. npm

# Commands:
1. Local development:
  * set SF crendential in build.properties file.
  * npm install
  * gulp serve, local server is running at http://localhost:9000 
2. Deploy to SF:
  * gulp build
  * ant deploy
