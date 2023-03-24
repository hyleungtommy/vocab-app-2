# Vocab Notebook App 2.0
### Project Description
A 2.0 version of my original Vocab Notebook App project, rewritten using Typescript and integatred into a monorepo. This app allow user to jot down new vocabs they learn when learning a foreign language. User can provide a sample sentence as well as translation when they create a new vocab entry. When user have more then 20 vocab entries in their vocab bank, a quiz feature is unlocked that user can take anytime. The quiz will draw from user's vocab bank and generate multiple-choice question based on it.
***
### Tech stack
* Typescript
* React with NextJS
* Redux
* Express
* Yarn workplace
* Jest
* Docker
* AWS (s3bucket, dynamoDB)
***
### Installation
1. clone the project
2. install yarn `npm i -g yarn`
3. install typescript `npm i -g typescript`
4. run `yarn`
5. run `yarn run:web` to start nextJS frontend and `yarn run:server` to run server locally
***
### Deployment
run `docker-compose up` to build the containers
