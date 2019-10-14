import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableHighlight } from 'react-native';
import firebase from 'react-native-firebase';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }
    componentDidMount() {
        currentUser = firebase.auth().currentUser;
        console.log('Current User ===> ', currentUser._user.email);
        var usersRef = firebase.database().ref("users");
        console.log(usersRef)
        usersRef.on('value', (snapshot) => {
            console.log(snapshot)
            snapshot.forEach((snap) => {
                3
                console.log("snaps")
                var item = snap.val();
                // let image = item.dp ? item.dp : 'https://bootdey.com/img/Content/avatar/avatar6.png'
                let name = item.name ? item.name : item.email
                if (currentUser._user.email == item.email) {
                    console.log("User list");
                } else {

                    this.state.list.push({ email: item.email, userID: item.userID, name: name })
                }
            });
        });
    }

    render() {
        return (
            <View style={design.headView}>
                <Text onPress={() => this.onBackPress()}>BACK</Text>
                <View style={design.mainView}>
                    <FlatList
                        extraData={this.state}
                        data={this.state.list}
                        renderItem={this.renderItem}
                    />
                </View>
            </View>
        );
    }
    renderItem = ({ item }) => {
        return (
            <TouchableHighlight onPress={this.moveToScreen.bind(this, item)}>
                <View style={design.row}>
                    <View>
                        <View style={design.nameContainer}>
                            <Text style={design.nameTxt} numberOfLines={1}
                                ellipsizeMode="tail">{item.name}</Text>
                            <Text style={design.mblTxt}>Mobile</Text>
                        </View>
                        <View style={design.msgContainer}>
                            <Text style={design.msgTxt}>{item.status}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
    moveToScreen = (object) => {
        console.log(object)
        this.props.navigation.navigate("Chat", {
            email: object.email,
            userID: object.userID
        })
    }
    onBackPress() {
        firebase.auth().signOut().then(() => {
            console.log('Logout Succesfully')
            this.props.navigation.replace("Login")
        }).catch(function (error) {
            console.log(error)
            Alert.alert("Logout error", error);
        });
    }

} export default HomeScreen;

const design = StyleSheet.create({
    headView: {
        flex: 1,
    },
   
    mainView: {
        flex: 1,
        marginTop: 10,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 13,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
    },
    nameTxt: {
        marginLeft: 15,

        color: '#222',
        fontSize: 14,
        width: 170,
    },
    msgTxt: {
        fontWeight: '400',
        color: '#008B8B',
        fontSize: 12,
        marginLeft: 15,
    },
});