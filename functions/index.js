const {
    onCall
} = require("firebase-functions/v2/https");
const {
    initializeApp
} = require("firebase-admin/app");
const {
    getFirestore
} = require("firebase-admin/firestore");

initializeApp();

const {
    setGlobalOptions
} = require("firebase-functions");
setGlobalOptions({
    maxInstances: 10
});

exports.verifyRecaptcha = onCall(async (request) => {
    const {
        token
    } = request.data;
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`, {
            method: "POST",
        }
    );
    const data = await response.json();
    return data;
});