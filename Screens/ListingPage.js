import React from "react";
import {View, Text, StyleSheet, Button,TouchableOpacity ,} from "react-native";
import { useNavigation } from '@react-navigation/native';


const ListingPage= ({navigation}) => {
    return(
        <View style={[styles.container, { flex: 1, alignItems: 'center', justifyContent: 'center' }]} >
            <Text>new fileaaaaa</Text>
            <TouchableOpacity onPress={()=> {navigation.navigate("add")}}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>Card Title</Text>
                    <Text style={styles.cardSubtitle}>Card Subtitle</Text>
                </View>

                <View style={styles.cardContent}>
                    <Text>Here's a small text description for the card content. Nothing more, nothing less.</Text>
                </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('add')}>
                <Text style={styles.linkText}>aaa</Text>
            </TouchableOpacity>
        </View>
    )
};
export default ListingPage ;

const styles = StyleSheet.create({
    container : {
        flex : 1 ,
        alignItems :'center' ,
        justifyContent : 'center',

    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    cardHeader: {
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#888',
    },
    cardContent: {
        marginTop: 8,
    },

});
