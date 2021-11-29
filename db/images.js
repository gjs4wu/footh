import uuid from "react-native-uuid"
import { manipulateAsync } from 'expo-image-manipulator';
import * as fb from "firebase"
const firebase = fb.default

export async function getImage(imagePath) {
  var imageRef = firebase
    .storage()
    .refFromURL("gs://foodbooth-d0313.appspot.com/images/" + imagePath)
  var url = await imageRef.getDownloadURL()
  return url
}

export async function uploadImage(uri) {
  const resized = await manipulateAsync(
    uri,
    [{ resize: { width: 480} }],
    { format: 'png', compress: 0.3}
  );

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      resolve(xhr.response)
    }
    xhr.onerror = function (e) {
      console.log(e)
      reject(new TypeError("Network request failed"))
    }
    xhr.responseType = "blob"
    xhr.open("GET", resized.uri, true)
    xhr.send(null)
  })

  var uid = uuid.v4()

  const ref = firebase
    .storage()
    .refFromURL("gs://foodbooth-d0313.appspot.com/images/" + uid)
  const snapshot = await ref.put(blob)

  // We're done with the blob, close and release it
  blob.close()

  return uid
}