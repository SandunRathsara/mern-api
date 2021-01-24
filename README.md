#Mongoose Migrations
####create migrations
`npm run migration:create <uniuqe name>`

####to run created pending migrations
`npm run migration:run`


#ENV Vars
###Example Env vars & values
SERVER_PORT=7080
MONGO_URL=mongodb://localhost:27017/db-name
JWT_SECRET=sample_secret
API_ENV=development
LOGGER_LEVEL=debug | info | error
AWS_S3_BUCKET=digiex.attachments
AWS_REGION=ap-southeast-1

###use these values. no need to change those.
PETTY_CASH_CODE=petty_cash
STAFF_ADVANCE_CODE=staff_advance
STAFF_ADVANCE_SETTLEMENT_CODE=staff_advance_settlement
OTHER_CODE=other
FINANCE_DEPARTMENT_CODE=finance
FINANCE_USER_ROLE_CODE=finance_user
FINANCE_APPROVER_ROLE_CODE=finance_approver
###firebase admin credentials json file location
GOOGLE_APPLICATION_CREDENTIALS={file-path}./digiex-ba81a-firebase-adminsdk-8296l-42beb6d233.json

#AWS Credentials setup
create a file called `credentials` in `$HOME/.aws` directory & add access key & secret access key like this
```
[default]
aws_access_key_id=
aws_secret_access_key=
```

# Deploy Application
- first set above mentioned environment variables & pass to shell environment
- run deployDe.sh file in ./api directory to bring up PM2

# Branch Management
DigiEx is deployed in several environments with several changes. Even though the base functionality is same.

- Base features are in a branch named "base".
- Changes specific to an environment should be done into the branch that is relevant to the environment.
- Feature  updates should be done in a branch checked out from the base branch. then the change should be merged into base branch.
- A feature update to any deployed branch should only be taken from base branch.
##### IMPORTANT: environment specific branches should never be merged into "base" branch.
Ex: master branch should never be merged into base branch because paydd doesn't have digimed in it. if the master is merged into base branch, when a feature update is merged to paydd from base branch the digimed changes will go to paydd branch.

#### Environment specific changes
##### Digital Services Deployment
- DigiMed


##### Dialog Deployment (paydd)
- azure login endpoint to mobile app

