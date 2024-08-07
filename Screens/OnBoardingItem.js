import React  from "react";
import {View, Text, Button, StyleSheet, Image, TouchableOpacity ,FlatList , useWindowDimensions} from "react-native";
import Onboarding from 'react-native-onboarding-swiper';
import  slides from '../slides'


const OnBoardingItem = ({item}) => {
    const { width }= useWindowDimensions();

    return(
        <View style={[styles.container , { width} ]}>
            <Image source={item.image} style={[styles.image, {width, resizeMode : 'contain'}]}/>
            <View style={{flex : 0.2}}>
                <Text style ={styles.title}>{item.title}</Text>
                <Text style ={styles.description}>{item.description}</Text>
            </View>
        </View>
    )
};
export default OnBoardingItem ;

const styles = StyleSheet.create({
    container : {
        flex : 1 ,
        alignItems :'center' ,
        justifyContent : 'center',

    },
    image : {
        flex:0.8,
        justifyContent:'center',

    },
    title:{
        fontWeight:'800',
        fontSize:28,
        marginBottom:10,
        color:'#356bcb',
        textAlign:'center',
    },
    description:{
        fontWeight:'300',
        color:'#82CAFA',
        textAlign:'center',
        paddingHorizontal:30,

    },

});
