import firebase from 'firebase';

export const initializeFirebase = () => {
    firebase.initializeApp({
        apiKey: "AIzaSyBt5xCXINLzU4B2r9C9KdISVlqNeLnbMH8",
        authDomain: "menuadvisor-f06d2.firebaseapp.com",
        databaseURL: "https://menuadvisor-f06d2.firebaseio.com",
        projectId: "menuadvisor-f06d2",
        storageBucket: "menuadvisor-f06d2.appspot.com",
        messagingSenderId: "886054910744",
        appId: "1:886054910744:web:78aa961c8e157fec3e7c6d",
        measurementId: "G-FB5SQB4ZFY",
    });
    const messaging = firebase.messaging();
    messaging.onMessage(payload => { //For showing firebase notification in app (not background)
        navigator.serviceWorker.getRegistration().then((reg) => {
                reg.showNotification('Firebase Notification', payload.notification);
            })
            .catch(console.error)
    })
}

export const askForPermissioToReceiveNotifications = async(callback) => {


    const publicKey =
        "BJmO7UXc0phrIYym8zDuP2Hs3hhigy9J_r_Yq6Vn7BW6UQbBq-QnAH-SpbAuKOBQsQieIsk-aigPrI6lmsUOR9g";

    try {
        const messaging = firebase.messaging();
        const token = await messaging.getToken({ vapidKey: publicKey });
        localStorage.setItem('tokenDevice', token)

        callback()
    } catch (error) {
        console.error(error);
    }

}