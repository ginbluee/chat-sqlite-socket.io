import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { loginSuccess } from '../actions/Authenticate';
import styles from '../styles/LoginStyles';

var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({ name: 'test.db', createFromLocation: '~chatapp.db' });

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }
    login() {
        if (!this.state.username || !this.state.password) {
            Alert.alert(
                "THÔNG BÁO ĐĂNG NHẬP",
                "Bạn phải nhập đầy đủ thông tin !"
            )
        }
        else {
            db.transaction((tx) => {
                tx.executeSql("SELECT * FROM USER WHERE username = ?", [this.state.username], (tx, results) => {
                    const len = results.rows.length;
                    console.log(len)
                    if (len == 0) {
                        Alert.alert(
                            "THÔNG BÁO ĐĂNG NHẬP",
                            "Tài khoản không tồn tại!"
                        )
                    }
                    else {
                        const row = results.rows.item(0);
                        if (this.state.password != row.password) {
                            Alert.alert(
                                "THÔNG BÁO ĐĂNG NHẬP",
                                "Bạn đã nhập sai mật khẩu !"
                            )
                        }
                        else {
                            Alert.alert(
                                "THÔNG BÁO ĐĂNG NHẬP",
                                "Đăng nhập thành công !"
                            )
                            const user = {
                                username: this.state.username,
                                password: this.state.password
                            }
                            this.props.loginSuccess(user)
                        }
                    }
                })
            })
        }
    }
    register() {
        this.props.navigation.navigate("Screen_Register")
    } 
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Username: </Text>
                <TextInput
                    style = {styles.textInput}
                    placeholder="Nhập vào tên đăng nhập"
                    onChangeText={(username) => this.setState({ username })}
                    autoFocus = {true}
                    underlineColorAndroid = "transparent"
                />
                <Text style={styles.title}>Password: </Text>
                <TextInput
                    style = {styles.textInput}
                    placeholder="Nhập vào mật khẩu"
                    secureTextEntry = {true}
                    onChangeText={(password) => this.setState({ password })}
                    underlineColorAndroid = "transparent"
                />
                <TouchableOpacity
                    style = {styles.button}
                    onPress={this.login.bind(this)}
                >
                    <Text style={styles.textButton}>Đăng Nhập</Text>
                </TouchableOpacity>
                <View style={styles.textSub}>
                    <Text style={{fontSize: 15, fontStyle:"italic"}}>Bạn chưa có tài khoản ? </Text>
                    <TouchableOpacity
                        onPress={this.register.bind(this)}
                    >
                        <Text style={{fontSize: 15, fontStyle:"italic", color: "white"}}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        User: state.User
    }
}

export default connect(null, { loginSuccess })(Login);