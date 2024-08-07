import React , {useState, useRef}  from "react";
import {View, Text, Button, StyleSheet, Image, TouchableOpacity ,FlatList , Animated} from "react-native";
import Onboarding from 'react-native-onboarding-swiper';
import  slides from '../slides'
import  OnboardingItem  from '../Screens/OnBoardingItem'
import Paginator from "./Paginator";
import NextButton from "./NextButton";


const OnBoardingScreen = ({navigation}) => {
    /*const Dots = ({selected}) =>{
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
                    title: 'Sauvegarder livres',
                    subtitle: "L'idéale outil pour sauvegarder tes livres PDF.",
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/2onbo.png')}  style={styles.image}/>,
                    title: 'Gérer livres',
                    subtitle: "L'idéale outil consulter , ajouter et supprimer tes livres PDF.",
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/3onbo.png')} style={styles.image}/>,
                    title: 'Se défier ',
                    subtitle: "L'idéale outil pour faire des défis pour soi afin de finir la lecture de ses livres en déterminant des deadlines.",
                },
            ]}
        />
    );*/
    const scrollX= useRef(new Animated.Value(0)).current ;
    const slidebar = useRef(null);
    const  [currentIndex , setCurrentIndex ] = useState(0);
    const viewableItemsChanged = useRef(({viewableItems})=>{
        setCurrentIndex(viewableItems[0].index);
    }).current;
    const slidesRef = useRef(null);
    const viewConfig = useRef({viewAreaCoveragePercentThreshold:50}).current;
    const scrollTo = () => {
        if (currentIndex < slides.length-1){
            slidesRef.current.scrollToIndex({index: currentIndex+1});
        }
        else {
            console.log('Last item .')
        }
    };
    return(
        <View style={styles.container} >
            <View style={{flex:3}}>
                <FlatList data={slides} renderItem={({item}) =><OnboardingItem item={item}/>}
                          horizontal
                          pagingEnabled
                          bounces={false}
                          keyExtractor={(item) => item.id}
                          onScroll={Animated.event([{nativeEvent: {contentOffset : {x: scrollX}}}], {
                              useNativeDriver:false ,
                          })}

                          scrollEventThrottle={32}
                          onViewableItemsChanged={viewableItemsChanged}
                          viewabilityConfig={viewConfig}
                          ref={slidesRef}


                />
            </View>

            <NextButton scrollTo={scrollTo} percentage={(currentIndex +1 ) * (100/slides.length)} />
            <Paginator data={slides}
                       scrollX={scrollX}/>
        </View>
    )
};
export default OnBoardingScreen ;

const styles = StyleSheet.create({
    container : {
        flex : 1 ,
        alignItems :'center' ,
        justifyContent : 'center',

    },
    image : {
        width : 200,
        height : 500,
        margin : -90 ,
    }

});
