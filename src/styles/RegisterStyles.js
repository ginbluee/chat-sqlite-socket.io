import {StyleSheet} from "react-native";
import {Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window') //lay full man hinh


var styles = StyleSheet.create({
    container:{
        backgroundColor: "#00796B",
        flex: 1,
    },
    textInput: {
        borderColor: 'white',
        borderWidth: 1,
        marginHorizontal: 20,
        paddingHorizontal: 15,
    },
    title:{
        fontSize: 20,
        color: "white",
        paddingVertical: 10,
        marginHorizontal: 20,
    },
    button:{
        marginTop: 50,
        backgroundColor: "tomato",
        paddingVertical: 10,
        borderRadius: 15,
        marginHorizontal: width/5,
        alignSelf: 'center',
    },
    textButton:{
        fontSize: 17,
        color: "white"
    },
})

export default styles;