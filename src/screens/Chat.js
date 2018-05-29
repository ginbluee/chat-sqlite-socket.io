import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import io from 'socket.io-client/dist/socket.io.js';
import styles from '../styles/ChatStyles';
import { connect } from 'react-redux';
import { logoutSuccess } from '../actions/Authenticate';

var SQLite = require('react-native-sqlite-storage');
var db = SQLite.openDatabase({ name: 'test.db', createFromLocation: '~chatapp.db' });

var e;

class Chat extends Component {
    constructor(props) {
        super(props)
        e = this
        this.socket = io("http://192.168.1.70:3000", { json: false });
        this.state = {
            textInput: '',
            isLoading: null,
            delete: '',
            array: [
                { id: '', username: 'admin', textChat: 'Welcome to AppChat' },
            ],
            // arrayShow: [
            //     { id: '', username: 'admin', textChat: 'Welcome to AppChat' },
            // ]
        }
        this.socket.on("server-send-mess", function (user, data) {
            db.transaction((tx) => {
                tx.executeSql("INSERT INTO MESSAGE (user, textChat) VALUES (?,?)", [user, data])
            });

        })
        this.socket.on("server-send-type", function (data) {
            e.setState({
                isLoading: data
            })
        })
        this.socket.on("server-send-notype", function (data) {
            e.setState({
                isLoading: null,
            })
        })
    }
    del() {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM MESSAGE", [], (tx, results) => {
                const len = results.rows.length;
                if (len > 3) {
                    for (let i = 0; i < len - 3; i++) {
                        const row = results.rows.item(i)
                        console.log(row.id)
                        db.transaction((tx) => {
                            tx.executeSql("DELETE FROM MESSAGE WHERE id = ?", [row.id])
                        })
                    }
                }
            })
        })
    }
    show() {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM MESSAGE", [], (tx, results) => {
                const len = results.rows.length;
                console.log(len)
                for (let i = 0; i < len; i++) {
                    const row = results.rows.item(i)
                    let newarray = [{ id: row.id, username: row.user, textChat: row.textChat }]
                    let list = newarray.concat(this.state.array)
                    this.setState({
                        array: list
                    })
                }
                console.log(this.state.array);
            })
        })
    }
    componentDidMount() {
        this.del();
        this.show();
    }
    insert() {
        if (this.state.textInput) {
            db.transaction((tx) => {
                const username = this.props.User.user.username;
                tx.executeSql("INSERT INTO MESSAGE (user, textChat) VALUES (?,?)", [username, this.state.textInput])
            });
            this.socket.emit("client-send-mess", this.props.User.user.username, this.state.textInput);
        }
    }
    async send() {
        await this.insert();
        await this.socket.emit("client-send-notype", "tao nhap xong roi ne");
        await this.setState({
            textInput: null,
        })
    }
    typing() {
        this.socket.emit("client-send-type", "đang soạn tin nhắn ...");
    }
    logout() {
        this.socket.emit("client-want-disconnect");
        this.props.logoutSuccess()
    }
    render() {
        const username = this.props.User.user.username;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text>Xin chào {username}</Text>
                    <TouchableOpacity
                        onPress={this.logout.bind(this)}
                    >
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Đăng Xuất</Text>
                    </TouchableOpacity>
                </View>

                {/* ************************* ChatBox ************************ */}
                <View style={styles.chatbox}>
                    <FlatList
                        data={this.state.array}
                        renderItem={({ item }) =>
                            <View
                                style={(item.username === username) ? styles.textChat1 : styles.textChat2}
                            >
                                <Text>{item.textChat}</Text>
                            </View>
                        }
                        inverted={-1}
                    />
                    <View>
                        <Text>
                            {this.state.isLoading}
                        </Text>
                    </View>
                </View>


                {/* ************************* Chat ************************ */}
                <View style={styles.input}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Nhập vào tin nhắn"
                        onChangeText={(textInput) => {
                            this.setState({ textInput })
                            this.typing()
                        }}
                        autoFocus={true} //run app
                        value={this.state.textInput}
                        underlineColorAndroid='transparent'
                        multiline={true}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.send.bind(this)}
                    >
                        <Text style={{ color: 'white', alignSelf: 'center', fontSize: 15 }}>Gửi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log('mapStateToProps', state);
    return {
        User: state.User
    }
}

export default connect(mapStateToProps, { logoutSuccess })(Chat);