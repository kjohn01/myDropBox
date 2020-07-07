/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { storage, firestore, firebase } from './firebaseConfig';
// firestore === db
const storageRef = storage.ref();

export const uploadFile = async (uid, file) => {
  const uploadTask = storageRef.child(`${uid}/${file.name}`).put(file);
  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  await uploadTask.on('state_changed', (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(`Upload is ${progress}% done`);
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
      default: return false;
    }
    return true;
  }, (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        console.error('Permission denied');
        break;
      case 'storage/canceled':
        console.error('User canceled the upload');
        break;
      default:
        console.error('Unknown error occurred, inspect error.serverResponse');
        break;
    }
  }, () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  });
};

export const deleteFile = async (uid, fileName) => firestore.collection('users').doc(uid).collection('files').doc(fileName)
  .delete()
  .then(() => console.log('File deleted successfully'))
  .catch((err) => console.error(err));

export const listenForFiles = (uid, dispatch) => {
  console.log('listening for files on firebase!');
  firestore.collection('users').doc(uid).collection('files').onSnapshot((docSnapshot) => {
    dispatch({ type: 'ADD_FILE_TO_LIST', files: docSnapshot.docs });
  }, (err) => {
    console.log(`Encountered error: ${err}`);
  });
};

export const detachListener = (uid) => {
  console.log('detached from firebase!');
  firestore.collection('users').doc(uid).onSnapshot(() => {
  });
};
