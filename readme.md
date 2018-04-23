# ABOUT THIS PRACTICE

- A simple demonstration of how rest_API can be developed using Express, Node.js and a local instance of mySQL DB.
- We practice the use of key dependencies:
    - express
    - morgan
    - nodemon
    - mysql

- This practice excludes unit tests although it can be added for further understanding of TDD.

## HOW TO GET STARTED

```git clone git remote add origin https://github.com/rubyvictor/Express-mySQL.git```

`yarn init`

`yarn install`

### HOW TO SET UP MYSQL

If you are using mySQL for the first time, no worries. 
Here are a few simple steps to get started:

- In your command line:
`Brew install mysql`

- Next, before this please check that you don't already have a local instance of mysql currently running:
`mysql.server start`

- Then, you can download sequelPro at this link:

`https://www.sequelpro.com/`

- Upon a successful download and loading of sequelPro, add a new database and give it a name.  You can stick with 'Standard' db.
- Enter this in the field for `Host`:

`127.0.0.1`

- Enter this for Username:

`root`

- Then click `test connection`
- Click `connect` if the above returns ok.


