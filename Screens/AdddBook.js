import React, {useState} from "react";
import {View, Text, StyleSheet, Button, StatusBar, SafeAreaView, TextInput ,} from "react-native";


const AdddBook= ({navigation}) => {
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    return(
        /*<View style={styles.container} >
            <Text>new fileaaqsdqaa</Text>

            <Button title={'Click here'}
                    onPress={() => navigation.navigate('add') }/>
        </View>*/
        <SafeAreaView style={styles.container} >


                    <View style={styles.formContainer}>
                        <Text style={styles.textinput} >Réference de livre :</Text>
                        <TextInput  placeholder={"Réference de livre"} style={styles.input}/>
                        <Text style={styles.textinput} >Date de création :</Text>

                        <Text style={styles.textinput} >Label :</Text>
                        <TextInput  placeholder={"label votre livre"} style={styles.input}/>
                        <Text style={styles.textinput} >Date d’expiration  :</Text>
                        <TextInput  placeholder={"Sélectionner votre date d’expiration"} style={styles.input}/>
                        <Text style={styles.textinput} > Description  :</Text>
                        <TextInput  placeholder={"Description"} style={styles.input}/>
                        <Text style={styles.textinput} >Category :</Text>
                        <TextInput  placeholder={"Réference de livre"} style={styles.input}/>
                        <Text style={styles.textinput} >Réference de livre :</Text>
                        <TextInput  placeholder={"Réference de livre"} style={styles.input}/>
                    </View>

        </SafeAreaView>
    )
};
export default AdddBook ;

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#E6E6FA',
        paddingTop:StatusBar.currentHeight

    },
    formContainer:{
      alignItems:"stretch",
    },
    input:{
        borderRadius: 10,
        backgroundColor:'#bebebe',
        opacity : 0.3 ,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 100,
        elevation: 1,
        padding: 10,
        marginVertical: 8,

    },
    textinput:{
        marginTop:4,
        alignItems:"stretch"
    }

});
