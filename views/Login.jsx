import react ,{useState} from "react";
import auth from '@react-native-firebase/auth';
import { View,Text,StyleSheet,Image,KeyboardAvoidingView,TouchableOpacity,Alert } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import InputText from "../component/InputText";
import { ScrollView } from "react-native-gesture-handler";


export default function Login ({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailValidate = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setEmail(text);
      return false;
    } else {
      setEmail(text);
    }
  };

  const passwordValidate = text => {
    let pwReg =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (pwReg.test(text) === false) {
      setPassword(text);
      return false;
    } else {
      setPassword({password: text});
      setPassword({passwordError: false});
    }
  };


userLogin = () => {

  auth()
      .signInWithEmailAndPassword(email, password)
     
      .then(() => {
          console.log('User Loging Successful....');
          navigation.navigate('Home');
          
      })
      .catch(error => {
          Alert.alert(
              "WRONG",
              "Please Enter Valied Details0",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
              ]
            );
        
      })    
    }

    const textCheck =() =>{
      if(email&&password!==""){
        userLogin();
      }else{
        Alert.alert(
          "WRONG",
          "Please Fill the Text Fild",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
    }

return(
        <LinearGradient colors={['#001233', '#002244', ]} style={styles.linearGradient}>

        <View style={{alignItems:'center',justifyContent:'center',height:250,width:'100%'}}> 
         <View style={{alignItems:'center',justifyContent:'center',height:'20%',width:'80%',margin:'5%',}}>
        <Text style={{fontSize:25,fontWeight:'bold',marginTop:10,color:'#fff',}}>Login</Text>
       </View>
       </View>
     <ScrollView style={{flex:1,}}>
       <View style={{alignItems:'center',padding:20,height:'100%',width:'100%',borderWidth:1,borderColor:'#009EFF',borderRadius:25,}}>
      <InputText viewLabel=" Email"
            valuData={email}
            valueSet={text => emailValidate(text)}
           
            // txtEntry={true}
            />
      <InputText  viewLabel=" Password" valuData={password}  valueSet={text => passwordValidate(text)}
       txtEntry={true}/>

      <View style={{ width:220,height:100,justifyContent:'center',alignItems:'center',}}>
      <LinearGradient colors={['#009EFF', '#00E7FF', ]} style={{width:'100%',borderRadius:25}}>
  <TouchableOpacity   onPress={textCheck}
  style={styles.button}
  >
  <Text style={{color:'#000000'}}>Login</Text>
</TouchableOpacity>

</LinearGradient>

      </View>
      
      
    <View style={{flexDirection:'row'}}>
      <Text  style={{color:'#ffffff'}}>Create an account?</Text>
      <Text style={{color:'#ffffff'}} onPress={() => navigation.navigate("SignUp")}> SignUp</Text>
    </View>
        
       </View>
       </ScrollView>
     
       </LinearGradient>
    );
}
var styles = StyleSheet.create({
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      
      
    },
    container: {
        flex: 1,
        justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      
      },
      button: {
        alignItems: "center",
        justifyContent:'center',
        height:40,
        width:'100%',
        borderRadius:25,
       
        color:'#000000'
        
      },
});