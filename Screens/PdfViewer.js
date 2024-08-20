import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Animated } from 'react-native';
import { WebView } from 'react-native-webview';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';

const PdfViewer= ({ route, navigation}) => {
    const { pdfUri } = route.params;
    const [buttonVisible, setButtonVisible] = useState(true);
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {

        let hideButtonTimeout;
        if (buttonVisible) {
            hideButtonTimeout = setTimeout(() => {
                setButtonVisible(false);
            }, 3000);
        }

        return () => {
            clearTimeout(hideButtonTimeout);
        };
    }, [buttonVisible]);
    const onGestureEvent = (event) => {
        const { numberOfPointers } = event.nativeEvent;
        if (numberOfPointers === 2) {
            setButtonVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: pdfUri }}
                style={styles.webview}
                onScroll={onGestureEvent}
                pagingEnabled={true}
            />
            {buttonVisible && (
                <Animated.View style={styles.buttonContainer}>
                    <Button title="Back" onPress={() => navigation.goBack()} />
                </Animated.View>
            )}
        </View>
    );
};
export default PdfViewer ;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
    },

});
