import {StatusBar} from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {URL} from '../config.js';
import LinearGradient from 'react-native-linear-gradient';





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

    setImage(result.assets[0]);
  };

  // Use to handle the react-native-image-picker
  const handleGallery = async () => {
    const result = await launchImageLibrary();

    setImage(result.assets[0]);
  };

  useEffect(() => {
    healthCheck();
  }, []);


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


  return (
    <LinearGradient
    colors={['#001233', '#002244']}
      style={styles.linearGradient}>

<View style={{marginTop:30,width:'100%',marginBottom:-200}}>
      <Image style={{width:'100%'}} source={require('../Images/images.jpg')}/>
    </View>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={handleCamera}style={styles.button}>
        <Text style={{color: '#000000',fontWeight:'bold',fontSize:18}}>CAMERA</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleGallery}style={styles.button}>
        <Text style={{color: '#000000',fontWeight:'bold',fontSize:18}} >GALLERY</Text>
      </TouchableOpacity>
      {image && (
        <Image source={{uri: image?.uri}} style={{width: 200, height: 200}} />
      )}
      {image && (
        <TouchableOpacity onPress={uploadImage} style={styles.button}>
          <Text style={{color: '#000000',fontWeight:'bold',fontSize:18}}>PREDICT</Text>
        </TouchableOpacity>
      )}
      {res && (
        <View>
          <Text style={{color: '#ffffff',fontWeight:'bold',fontSize:18}}>Disease Name: {res?.class}</Text>
          <Text style={{color: '#ffffff',fontWeight:'bold',fontSize:18}}>Acuracy: {Math.floor(res?.confidence * 100)}%</Text>
        </View>
      )}
    </View> 
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    marginTop:20
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 100,
    borderRadius: 25,
    marginTop:10,
    color: '#fff',
    backgroundColor:'#B0DAFF'
  

  },
});
