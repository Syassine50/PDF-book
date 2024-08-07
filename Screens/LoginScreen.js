import React  from "react";
import { View , Text , Button , StyleSheet} from "react-native";

import { useNavigation } from '@react-navigation/native';



const LoginScreen = ({navigation}) => {
    return (
        <View style={styles.Container} >
            <Text style={styles.text}> Login Screen </Text>
            <Button title={'Click here'}
                    onPress={() => navigation.navigate('Onboarding') }/>


        </View>
    );
};
export default LoginScreen ;

const styles = StyleSheet.create(
    {
        text :{
        color:"red",
        },

        Container : {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
});
