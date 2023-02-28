import firebaseConfig from './hidden/firebaseConfig';
import 'firebase/messaging';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

async function component() {
  const element = document.createElement('div');

  element.innerHTML = JSON.stringify(messaging);

  return element;
}

const getFirebaseToken = async () => {
  try {
    const currentToken = await messaging.getToken({
      vapidKey: 'FIREBASE_VAPID_KEY',
    });
    if (!currentToken) {
      console.log(
        "This shouldn't happen - No registration token available. Request permission to generate one."
      );
    } else {
      // we have a token, save it
      console.log('firebase', currentToken);
      bring('post', '/home/register_push', {
        token: currentToken,
        type: 'fireweb',
      });
    }
  } catch (e) {
    console.log('An error occurred while retrieving token. ', e);
  }
};

document.body.appendChild(component());
document.body.appendChild(getFirebaseToken());

/**
jackdwyer@jackdwyer-macbookpro2 ~/Developer/vite/messaging-bundle-7063-v8 -  (main) $ yarn build
yarn run v1.22.19
$ vite build
vite v4.1.4 building for production...
✓ 13 modules transformed.
dist/index.html                    0.40 kB
dist/assets/favicon-17e50649.svg   1.52 kB
dist/assets/index-67bf2f8c.js     94.69 kB │ gzip: 19.02 kB
✨  Done in 0.86s.
 */
