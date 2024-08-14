import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Button, TouchableOpacity, FlatList,} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { database } from '../firebaseConfig';
import  {firebase} from '../firebaseConfig';
import { ref, push, serverTimestamp, get , set ,onValue} from 'firebase/database';



const ListingPage= ({navigation}) => {
    const [toDoData , setToDoData]= useState([])
    useEffect(() => {
        const starCountRef = ref(database, 'books/');
        const unsubscribe = onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const newBooks = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            console.log(newBooks);
            setToDoData(newBooks);
        });

        // Cleanup function
        return () => unsubscribe();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text>{item.label}</Text>
            <Text>{item.description}</Text>
            <Text>{item.dateExpiration}</Text>
        </View>

    );
    return(
        <View style={[styles.container, { flex: 1, alignItems: 'center', justifyContent: '' }]} >

            <TouchableOpacity style={styles.appButtonContainer} onPress={()=> {navigation.navigate("add")}}>
                <Text style={styles.appButtonText}>Add Book</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.appButtonContainer} onPress={()=> {navigation.replace("OnBording")}}>
                <Text style={styles.appButtonText}>onboarding</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.appButtonContainer} onPress={()=> {navigation.navigate("BookList")}}>
                <Text style={styles.appButtonText}>onboarding</Text>
            </TouchableOpacity>
                {
                    toDoData.map((item, index) => {
                        return(
                            <TouchableOpacity onPress={ () => navigation.navigate("add")}>

                                <View style={styles.card} key={index}>
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.cardTitle}>{item.label}</Text>
                                        <Text style={styles.cardcategorie}>Catégorie : {item.category}</Text>
                                        <Text style={styles.cardSubtitle}>Date Éxpiration : {item.dateExpiration}</Text>
                                    </View>

                                    <View style={styles.cardContent}>
                                        <Text>{item.category}{'\n'}{item.description}  {'\n'} {item.Book}   </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>go
                        )
                    })
                }
        </View>
    )
};
export default ListingPage ;

const styles = StyleSheet.create({
    container : {
        flex : 1 ,
        alignItems :'center' ,
        justifyContent : 'center',
        backgroundColor:'rgba(79,79,79,0.02)'

    },
    cardcategorie:{
            fontSize: 14,
            color: '#63caff',

    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        width:370,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 1,
    },
    cardHeader: {
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'#356bcb'
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#888',
    },
    cardContent: {
        marginTop: 8,
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#356bcb",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop:8 ,
        marginLeft :245,
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        textTransform: "uppercase"
    }
});
