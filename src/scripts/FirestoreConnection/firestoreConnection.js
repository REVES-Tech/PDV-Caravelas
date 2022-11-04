const admin = require("firebase-admin");
var path = require("path");


admin.initializeApp({
    credential: admin.credential.cert('./serviceAccountKey.json'),
    databaseURL: 'https://pdv-eep-7469a-default-rtdb.firebaseio.com'
});

const db = admin.firestore();

export {db as database}; 