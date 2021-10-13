import * as firebase from "firebase";
import "@firebase/storage";

export default async function getImage(imagePath) {
  var storage = firebase.storage();
  var url = await storage.ref().child(imagePath).getDownloadURL();
  return url;

}
