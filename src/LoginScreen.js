import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Button,Platform } from 'react-native';
import firebase from 'react-native-firebase';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        var currentUser = firebase.auth().currentUser;
        if (currentUser) {
            console.log("You are login ")
            console.log(currentUser.toJSON())
            this.props.navigation.replace("Home")
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(this.onUserChanged);
    }

    onUserChanged = (user) => {
        if (user) {
            console.log("Login ");
            console.log(user.toJSON());
            var usersRef = firebase.database().ref("users/" + user.uid);
            var nameRef = usersRef.child("email");
            var idRef = usersRef.child("userID");
            idRef.set(user.uid);
            nameRef.set(user.email);
            this.props.navigation.navigate("Home");
        }
    }
    render() {
        return (
            <View style={design.mainView}>
                <Text style={design.headView}>
                    Enter name and number to login
                </Text>
                <View style={design.subViewOne}>
                    <TextInput style={design.textInputView}
                        placeholder='Enter email'
                        onChangeText={(email) => this.setState({ email })}
                        keyboardType='name-phone-pad'>
                    </TextInput>
                    <TextInput style={design.textInputView}
                        placeholder='Enter password'
                        onChangeText={(password) => this.setState({ password })}
                        {...(Platform.OS == 'ios' ? keyboardType='default':keyboardType='visible-password')}
                        >
                    </TextInput>
                </View>
                <View style={design.subViewOne}>
                    <Button style={design.buttonStyle}
                        styleDisabled={{ color: 'grey' }}
                        title="Login"
                        onPress={() => this.onLogin()}>
                    </Button>
                </View>

            </View>
        );
    }
    onLogin =() => {
        if (this.state.email != '' && this.state.password != '') {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, 
                this.state.password)
            .then(this.onLoginSuccess.bind(this))
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("Error message",error.code);
                alert("Error", errorCode + errorMessage);
                // ...
            });
        } else {
            alert("Please enter credential");
        }
    }
    onLoginSuccess() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, 
            this.state.password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            Alert.alert("Error", errorCode + errorMessage);
            // ...
        alert('Login Successfully')
      
    });
    }
} export default LoginScreen;

const design = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    headView: {
        marginTop: 15,
        fontSize: 15,
        fontWeight: "bold",
        color: 'black',
        alignSelf: 'center'
    },
    subViewOne: {
        flex: 1,
        margin: 15,
        marginTop: 20,
    },
    textInputView: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonStyle: {
        width: 80,
    },
});