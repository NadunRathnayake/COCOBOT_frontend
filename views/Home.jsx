import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';


export default function Home({navigation}) {


  const img = <Image source={require('../Images/images.jpg')} />;

  signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    navigation.navigate('Login');
  };

  const signin = () => {
    auth()
      .signIn()
      .then(() => console.log('User signed out!'));
    navigation.navigate('Login');
  };

  return (
    <LinearGradient
      colors={['#001233', '#002244']}
      style={styles.linearGradient}>
       <View>
       <Text style={{color: '#fff', fontSize: 20,marginTop:50}}>COCOBOT</Text>
        </View> 
     
    <View style={{marginTop:30,width:'100%'}}>
      <Image style={{width:'100%'}} source={require('../Images/images.jpg')}/>
    </View>
     
    <View style={{width:'100%',height:200}}>


    </View>

       <View style={{alignItems:'center',justifyContent:'center',marginTop:20}}>

          <TouchableOpacity   onPress={() => navigation.navigate('image-detect')} style={styles.button}>
            <Text style={{color: '#000000',fontWeight:'bold',fontSize:18}}>Predictor</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={signOut}
            style={{ alignItems: 'center',
            justifyContent: 'center',
            height: 40,
            width:100,
            borderRadius: 25,
            marginTop:100,
            borderWidth:1,
            borderColor:'#B0DAFF'
            }}>
            <Text style={{color: '#fff',fontWeight:'bold',fontSize:18}}>SignOut</Text>
          </TouchableOpacity>
          </View>
   
    </LinearGradient>
  );
}
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
   
    alignItems: 'center',
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
