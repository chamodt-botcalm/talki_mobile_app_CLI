import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { images } from '../constants/images';
import { scaleHeight, scaleWidth } from '../constants/size';

const AudioCallController = () => {

    const callOptions = [
        { icon: images.volume, title: 'Speaker', stylee: { backgroundColor: "#958F8FCC", padding: 16, borderRadius: 50, tintColor: 'white' } },
        { icon: images.videocamera, title: 'Video', stylee: { backgroundColor: "#958F8FCC", padding: 16, borderRadius: 50, tintColor: 'white' } },
        { icon: images.mutespeaker, title: 'mute', stylee: { backgroundColor: "#958F8FCC", padding: 16, borderRadius: 50, tintColor: 'white' } },
        { icon: images.close, title: 'end', stylee: { backgroundColor: "#F83D39", padding: 20, borderRadius: 50, tintColor: 'white' }, styless: { width: scaleWidth(20), height: scaleHeight(20) } },
    ];

    const CallOption = ({ icon, title, stylee, styless }: { icon: any; title: string; stylee: any; styless?: any }) => (
        <View style={styles.column}>
            <View style={stylee}>
                <Image source={icon} style={[styles.image, { tintColor: stylee.tintColor }, styless]} />
            </View>
            <Text style={{ color: 'white' }}>{title}</Text>
        </View>
    );

    return (
        <View style={styles.row}>
            {callOptions.map((item, index) => (
                <CallOption key={index} icon={item.icon} title={item.title} stylee={item.stylee} styless={item.styless} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: scaleWidth(20),
        gap: scaleWidth(40)
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: scaleHeight(8)
    },
    image: {
        width: scaleWidth(30),
        height: scaleHeight(30),
    }
})

export default AudioCallController