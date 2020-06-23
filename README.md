# qubee

A C&I Studios cloud storage solution build with MongoDB, ExpresJS, ReactJS, and NodeJS (MERN).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [NodeJS v12.4.0 (npm v6.9.0)](https://nodejs.org/download/release/v12.4.0/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)

If you already have node installed on your machine but not currently on v12.4.0, you may encounter errors when running the app in your terminal. Use the node version manager (NVM) to install and switch to node v12.4.0.

MonogoDB is our databse of choice. Make sure to hve the latest version of MongoDB Compass installed on your machine.

Run this command in your terminal to install and switch to node v12.4.0:

```zsh
nvm install 12.4.0
```

If you already have that version installed, then just switch to it by running this command:

```zsh
nvm use 12.4.0
```

Then check the version to make sure your machine is using the correct node:

```zsh
$ node -v
v12.4.0
```

### Installing

To get started, use the node package manager (NPM) to install all the packages from the directory where you cloned the qubee project, and on the banckend directory wihin the qubee directory.

Run this command in your qubee (root) directory:

```zsh
npm install
```

Browse to the backend directory and run the command again:

```zsh
cd backend
npm install
```

When all the packages are installed, browse back to the root directory run this commeand:

```zsh
cd ..
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env.development
```

This will create a development .env file with REACT_APP_API_URL variable. This api URL is used to make calls to the nodejs backend.

Finally make sure you have MongoDB compass is running on the default local URL: mongodb://localhost:27017

## Usage

To start using the app:

```zsh
npm run dev
```

This command will concurrently run `react-scripts start` for the frontend of our app and `nodemon server.js` for the backend of our app.

We also have a [debugger npm package](https://www.npmjs.com/package/debug) in our app that we use to replace `console.log()` in the backend. To start the app with the debugger enabled:

Mac OS:

```zsh
DEBUG=app:* npm run dev
```

Windows CMD:

```shell
set DEBUG=app:* & npm run dev
```

PowerShell:

```shell
$env:DEBUG='app:*';npm run dev
```

The app will automatically create two directories in the qubee (root) public directory:

- shared
- uploads

Then it'll create the qubee database in MongoDB with two collections and five documents to get things ready:

- folders
  - all
  - shared
  - documents
  - pictures
  - videos
- settings

Those documents are virutal folders for the app to keep the files organized. However, all files uploaded will be added to the uploads directory.

## Built With

- [MongoDB](https://www.mongodb.com/) - The database we use
- [Express JS](https://expressjs.com/) - A node js framework
- [React JS](https://reactjs.org/) - The JavaScript library we use to build the user interface
- [Node JS](https://nodejs.org/en/) - Used to build the app backend

## Contributing

TBD

## License

This project is licensed by C&I Studios, Inc. and can only be used by C&I Studios, Inc.
