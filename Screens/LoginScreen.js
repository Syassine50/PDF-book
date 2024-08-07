import React  from "react";
import { View , Text , Button , StyleSheet} from "react-native";

import { useNavigation } from '@react-navigation/native';



const LoginScreen = ({navigation}) => {
    return (
        <View style={styles.Container} >
            <Text> Login Screen </Text>
            <Button title={'Click here'}
                    onPress={() => navigation.navigate('Onboarding') }/>
            <Button title={'Click here'}
                    onPress={() => navigation.navigate('Onboarding') }/>
            <Button title={'Click here'}
                    onPress={() => navigation.navigate('Onboarding') }/>
            <Button title={'Click here'}
                    onPress={() => navigation.navigate('Onboarding') }/>
            <Button title={'Click here'}
                    onPress={() => navigation.navigate('Onboarding') }/>

        </View>
    );
};
export default LoginScreen ;

const styles = StyleSheet.create({
    Container : {
        alignItems :'center' ,
        verticalAlign:'middle',
        justifyContent : ' center',

    },
});
