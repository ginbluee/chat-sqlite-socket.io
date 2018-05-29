import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text } from 'react-native';
import styles from '../styles/RegisterStyles';
import io from 'socket.io-client/dist/socket.io.js';

var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({ name: 'test.db', createFromLocation: '~chatapp.db' });

export default class Register extends Component {
    constructor(props) {
        super(props)
        this.socket = io("http://192.168.1.70:3000", { json: false });
        this.state = {
            username: "null",
            password: "null",
            retypepass: '',
        }
        this.socket.on("server-send-user", function (user, data) {
            db.transaction((tx) => {
                tx.executeSql("INSERT INTO USER (username, password) VALUES (?,?)", [user, data])
                //console.log(user + ": " + data)
            });
        })
    }
    register() {
        if (!this.state.username || !this.state.password || !this.state.retypepass) {
            Alert.alert(
                "THÔNG BÁO ĐĂNG KÝ",
                "Bạn phải nhập đầy đủ thông tin !"
            )
        }
        else {
            db.transaction((tx) => {
                tx.executeSql("SELECT * FROM USER WHERE username = ?", [this.state.username], (tx, results) => {
                    const len = results.rows.length;
                    if (len != 0) {
                        Alert.alert(
                            "THÔNG BÁO ĐĂNG KÝ",
                            "Tài khoản đã tồn tại !"
                        )
                    }
                    else {
                        if (this.state.password !== this.state.retypepass) {
                            Alert.alert(
                                "THÔNG BÁO ĐĂNG KÝ",
                                "Mật khẩu bạn nhập không trùng khớp !"
                            )
                        }

                        /************************** ADD USER *************************/
                        else {
                            db.transaction((tx) => {
                                tx.executeSql("INSERT INTO USER (username, password) VALUES (?,?)", [this.state.username, this.state.password])
                            })
                            this.socket.emit("client-send-user", this.state.username, this.state.password)
                            Alert.alert(
                                "THÔNG BÁO ĐĂNG KÝ",
                                "Đăng ký thành công với username: " + this.state.username + " và password: " + this.state.password
                            )
                            this.props.navigation.navigate('Screen_Login')
                            this.socket.emit("client-want-disconnect");
                        }
                    }
                })
            })
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Username: </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Nhập vào tên đăng nhập"
                    underlineColorAndroid="transparent"
                    onChangeText={(username) => this.setState({ username })}
                />
                <Text style={styles.title}>Password: </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Nhập vào mật khẩu"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                <Text style={styles.title}>Retype: </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Nhập lại mật khẩu"
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    onChangeText={(retypepass) => this.setState({ retypepass })}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.register.bind(this)}
                >
                    <Text style={styles.textButton}>Đăng Ký</Text>
                </TouchableOpacity>
            </View>
        );
    }
}