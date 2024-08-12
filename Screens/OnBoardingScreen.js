import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Animated } from "react-native";
import slides from '../slides';
import OnboardingItem from '../Screens/OnBoardingItem';
import Paginator from "./Paginator";
import NextButton from "./NextButton";

const OnBoardingScreen = ({ navigation }) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const scrollTo = () => {
        if (currentIndex < slides.length - 1) {
            slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
        } else {
            navigation.replace("Listing");
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 6 }}>
                <FlatList
                    data={slides}
                    renderItem={({ item }) => <OnboardingItem item={item} />}
                    horizontal
                    pagingEnabled
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                        useNativeDriver: false,
                    })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slidesRef}
                />
            </View>
            <View style={styles.containerButton}>
                <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)}  />
                <TouchableOpacity onPress={() => navigation.replace("Listing")} style={styles.skipButton}>
                    <Text style={styles.skipButtonText}>skip</Text>
                </TouchableOpacity>
            </View>
            <Paginator data={slides} scrollX={scrollX} />
        </View>
    );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: '80%', // Ajuste cette valeur pour contrôler l'espace total
        marginBottom: 20,
    },
    skipButton: {
        backgroundColor: "transparent",
        marginRight: 0,
    },
    skipButtonText: {
        color: "#82CAFA",
        fontSize: 16,
        textTransform: "uppercase",
        textDecorationLine: "underline",
        fontWeight: "bold",
    },
    image: {
        width: 200,
        height: 500,
        margin: -90,
    },
});
