import React from "react";
import {View, Text, StyleSheet, } from "react-native";

const PdfViewer= () => {
    return(
        <View style={styles.container} >
            <Text>new file</Text>
        </View>
    )
};
export default PdfViewer ;

const styles = StyleSheet.create({
    container : {
        flex : 1 ,
        alignItems :'center' ,
        justifyContent : 'center',

    }

});
