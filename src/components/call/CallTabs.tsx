import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'


const CallTabs = () => {

 

    const [dimensions, setDimensions] = useState({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window }: { window: { width: number; height: number } }) => {
            setDimensions({
                width: window.width,
                height: window.height,
            });
        });

        return () => {
            subscription?.remove?.();
        };
    }, []);

    const BASE_WIDTH = 430;
    const BASE_HEIGHT = 932;

    const TABLET_WIDTH = 834;
    const TABLET_HEIGHT = 1194;

    const isTablet = dimensions.width >= 600 || dimensions.height >= 1000;

    const currentBaseWidth = isTablet ? TABLET_WIDTH : BASE_WIDTH;
    const currentBaseHeight = isTablet ? TABLET_HEIGHT : BASE_HEIGHT;

    const isLandscape = dimensions.width > dimensions.height;

    const scaleWidth = (size: number) => (dimensions.width / currentBaseWidth) * size;
    const scaleHeight = (size: number) => (dimensions.height / currentBaseHeight) * size;

    const scale = Math.min(
        dimensions.width / currentBaseWidth,
        dimensions.height / currentBaseHeight
    );



    const [activeTab, setActiveTab] = useState("All");
    const tabs = ["All", "Missed"];

    const styles = StyleSheet.create({
        row1: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            backgroundColor: '#E8FF5D42',
            width:scaleWidth(160),
            height:scaleHeight(32),
            borderRadius: 8,
        }
    })

    const getTabStyle = (tab: string) => ({
        width:scaleWidth(76),
        height:scaleHeight(28),
        borderRadius: 8,
        backgroundColor: activeTab === tab ? "#E9FF00" : "transparent",
        alignItems: "center" as const,
        justifyContent: "center" as const,
        alignSelf: "center" as const,
    })
    return (
        <View style={styles.row1}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab}
                    onPress={() => setActiveTab(tab)}
                    style={getTabStyle(tab)}>
                    <Text style={{ color: activeTab === tab ? "#000" : "#aaa" }}>
                        {tab}
                    </Text>
                </TouchableOpacity>
            ))}</View>
    )
}

export default CallTabs