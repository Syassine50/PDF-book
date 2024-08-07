import React  from "react";
import {View, Text, Button, StyleSheet, Image, TouchableOpacity} from "react-native";
import Onboarding from 'react-native-onboarding-swiper';



const OnBoardingScreen = ({navigation}) => {
    const Dots = ({selected}) =>{
        let backgroundcolor;
        backgroundcolor = selected ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.3)' ;
        return (
            <View style={{
                width:5 ,
                height:5,
                marginHorizontal : 3 ,
                backgroundColor : backgroundcolor ,


            }}/>
        );
    };
    const Skip = ({...props}) => (
        <Button title={'Skip'}
                color={"#7FA1C3"}
            {...props}
        />

    );
    const Next = ({...props}) => (
        <Button title={'Next'}
                color="#7FA1C3"

                {...props}
        />

    );
    const Done = ({...props}) => (
        <TouchableOpacity style={{marginHorizontal : 8 }}   {...props}>
            <Text style={{fontSize:16   }} >Done</Text>
        </TouchableOpacity>


    );
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DotComponent={Dots}
            DoneButtonComponent={Done}
            onSkip={() => navigation.replace("login")}
            onDone={() => navigation.navigate("login")}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/1onbo.png')} style={styles.image} />,
                    title: 'Onboarding',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/2onbo.png')}  style={styles.image}/>,
                    title: 'Onboarding',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/3onbo.png')} style={styles.image}/>,
                    title: 'Onboarding',
                    subtitle: 'Done with React Native Onboarding Swiper',
                },
            ]}
        />
    );
};
export default OnBoardingScreen ;

const styles = StyleSheet.create({
    container : {
        flex : 1 ,
        alignItems :'center' ,
        justifyContent : ' center',

    },
    image : {
        width : 200,
        height : 500,

        margin : -90 ,
    }

});
