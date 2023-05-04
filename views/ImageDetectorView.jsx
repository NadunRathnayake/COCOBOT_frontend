import {StatusBar} from 'react-native';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {URL} from '../config.js';

const formdata = new FormData();

export default function ImageDetectorView() {
  const [image, setImage] = useState(null);
  const [pic, setPic] = useState('');
  const [res, setRes] = useState();

  // Use for check the servcer activness
  const healthCheck = async () => {
    await axios
      .get(`${URL}/ping`)
      .then(res => {
        console.log(res?.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  // Use to handle the react-native-image-picker
  const handleCamera = async () => {
    const result = await launchCamera();

    // if (!result.canceled) {
    //   setImage(result.assets[0]);
    // }
    setImage(result.assets[0]);
  };

  // Use to handle the react-native-image-picker
  const handleGallery = async () => {
    const result = await launchImageLibrary();

    // if (!result.canceled) {
    //   setImage(result.assets[0]);
    // }
    setImage(result.assets[0]);
  };

  useEffect(() => {
    healthCheck();
  }, []);

  //   const imageUpload = async () => {
  //     let options = {
  //       mediaType: 'photo',
  //       quality: 1,
  //       includeBase64: true,
  //     };

  //     launchImageLibrary(options, response => {
  //       if (response.didCancel === true) {
  //       } else if (response.errorCode && parseInt(response.errorCode)) {
  //         alert('error image upload');
  //       } else if (response.assets[0].fileSize > 1000000) {
  //         // eslint-disable-next-line no-alert
  //         alert('Maximum image size exceeded Please Choose image under 2 MB');
  //       } else {
  //         setPic(response.assets[0].base64);
  //         const file = {
  //           uri: response.assets[0].uri,
  //           name: response.assets[0].fileName,
  //           type: response.assets[0].type,
  //         };
  //         formdata.append('image', file);
  //         console.log(pic);
  //         console.log(formdata);
  //         uploadImage();
  //       }
  //     });
  //   };

  const uploadImage = async () => {
    const data = new FormData();
    data.append('file', {
      name: image.fileName,
      type: image.type,
      uri: image.uri,
    });

    await axios
      .post(`${URL}/predict`, data, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        setRes(res?.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  // const uploadAssets = async () => {
  //   // const data = new FormData();
  //   data.append('photo', {
  //     name: image.fileName,
  //     type: image.type,
  //     uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
  //   });

  //   // console.log("formData");
  //   // console.log(data);

  //   await axios
  //     .post(
  // `${URL}/predict`,

  //       {
  //         headers: {
  //           accept: "application/json",
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res?.data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={handleCamera}>
        <Text>CAMERA</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGallery}>
        <Text>GALLERY</Text>
      </TouchableOpacity>
      {image && (
        <Image source={{uri: image?.uri}} style={{width: 200, height: 200}} />
      )}
      {image && (
        <TouchableOpacity onPress={uploadImage}>
          <Text>UPLOAD ME</Text>
        </TouchableOpacity>
      )}
      {res && (
        <View>
          <Text>{res?.class}</Text>
          <Text>{Math.floor(res?.confidence * 100)}%</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
