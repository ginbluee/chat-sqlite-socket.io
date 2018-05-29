import {StyleSheet} from "react-native";

var styles = StyleSheet.create({
    container:{
      flex: 1, 
      backgroundColor: "#e9ebee"
    },
    input:{
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'white',
      paddingVertical: 5,
    },
    textInput:{
      flex: 7,
      marginHorizontal: 15,
    },
    emoji:{
      flex:1
    },
    button:{
      flex: 2,
      backgroundColor: 'tomato',
      marginHorizontal: 5,
      borderRadius: 15,
      alignSelf: 'center',
      paddingVertical: 5,
    },
    text:{
      flex: 1,
      backgroundColor: 'white',
    },
    chatbox:{
      flex: 7   
    },
    textChat1:{ 
      backgroundColor: 'white',
      borderRadius: 15,
      marginVertical: 5,
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginLeft:100,
    },
    textChat2:{
      flex: 1, 
      backgroundColor: '#4267b2',
      borderRadius: 15,
      marginVertical: 5,
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginRight: 70,
    },
    header: {
      marginBottom: 10,
    },
})

export default styles;