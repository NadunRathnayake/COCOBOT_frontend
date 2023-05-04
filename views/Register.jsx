import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from 'react-native-linear-gradient';
import InputText from "../component/InputText";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


export default function SignUp({navigation}) {
    const usersRef = firestore().collection('customers');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fistName, setFistName] = useState('not set');
    const [lastName, setLastName] = useState('not set');
    const [contact, setContact] = useState('');
    const [userName, setUserName] = useState('');
    const [address, setAddress] = useState('not set');

    UserRegister = () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {

                console.log('User account created & signed in!');
                usersRef
                    .add({

                        email: email,
                        password: password,
                        fistName: fistName,
                        lastName: lastName,
                        address: address,
                        contact: contact 
                   })
            })
            .then(() => {
                console.log("customer Added");
                navigation.navigate('Login');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Alert.alert(
                        "used!!",
                        "That email address is already in use!",
                        [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            { text: "OK", onPress: () => console.log("OK Pressed") }
                        ]
                    );
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    Alert.alert(
                        "Invalid!",
                        "That email address is invalid!",
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

                console.error(error);
            });
    };

    const textCheck = () => {
        if (email && password && contact && userName !== "") {
            UserRegister();
        } else {
            Alert.alert(
                "WRONG",
                "Please Fill All ",
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
    return (

        <LinearGradient colors={['#001233', '#002244',]} style={styles.linearGradient}>

            <View style={{ alignItems: 'center', justifyContent: 'center', height: 250, width: '100%' }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', height: '20%', width: '80%', }}>
                    {/* <Image style={{ width: 100, height: 100, marginLeft: 20 }} source={require('../assent/signup.png')} /> */}
                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 10, color: '#fff' }}>Sign Up</Text>
                </View>
            </View>
            <ScrollView>
                <View style={{ alignItems: 'center', padding: 20, }}>
                    <InputText viewLabel=" Fist Name"
                        valueSet={text => setFistName(text)}
                    />
                    <InputText viewLabel=" Last Name"
                        valueSet={text => setLastName(text)}
                    />
                    <InputText viewLabel=" Address"
                        valueSet={text => setAddress(text)}
                    />
                    <InputText viewLabel=" Email*"
                       
                        valueSet={text => setEmail(text)}

                    />
                    <InputText viewLabel=" Contact*"
                        valueSet={text => setContact(text)}
                    />
                    
                    <InputText viewLabel=" Password*"
                       
                        valueSet={text => setPassword(text)}
                        txtEntry={true}
                    />
                </View>
                <View style={{ width: 270, height: 100, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <LinearGradient colors={['#009EFF', '#00E7FF',]} style={{ width: '100%', borderRadius: 25 }}>
                        <TouchableOpacity onPress={UserRegister}
                            style={styles.button}
                        >
                            <Text style={{ color: '#000000' }}>Sign Up</Text>
                        </TouchableOpacity>
                    </LinearGradient>

                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Text style={{ color: '#fff' }}>Already have an account??  </Text>
                        <Text style={{ color: '#fff' }} onPress={() => navigation.navigate("Login")} >SignIn</Text>
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
    scroll: {

        height: '100%',
        width: '100%',

    },
    button: {
        alignItems: "center",
        justifyContent: 'center',
        height: 40,
        width: '100%',
        borderRadius: 25,

        color: '#fff'

    },
})