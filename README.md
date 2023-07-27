# Points Of Sale Software

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/)

### `npm run deploy`

Deploy with netlify

## Deploy with Netlify

- Create a Netlify account
- Install netlify cli
- Run the build
- Move to the build folder
- Run the deploy command

## Firebase Database

### Firebase

Create a firebase project and create a firestore database and activate the authentication module

Get these keys from the firebase project

apiKey: `"AIzaSyBhAxcrKR2huqJTfEjdvRs8zDyP9ruHdyo",`\
authDomain: `"pointofsale-ferretariaglorieta.firebaseapp.com",`\
projectId: `"pointofsale-ferretariaglorieta",`\
storageBucket: `"pointofsale-ferretariaglorieta.appspot.com",`\
messagingSenderId: `"336457336116",`\
appId: `"1:336457336116:web:d84076632b2d8c678f5161",`

### React App

1: Create a firebase.js file inside the `/src` folder\
2: Copy paste this format

```
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyBhAxcrKR2huqJTfEjdvRs8zDyP9ruHdyo",
authDomain: "pointofsale-ferretariaglorieta.firebaseapp.com",
projectId: "pointofsale-ferretariaglorieta",
storageBucket: "pointofsale-ferretariaglorieta.appspot.com",
messagingSenderId: "336457336116",
appId: "1:336457336116:web:d84076632b2d8c678f5161",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebaseApp.auth();

export { db, auth, firebaseApp };
```

## Contributors

- Jared Esaú Ortega Ramírez
