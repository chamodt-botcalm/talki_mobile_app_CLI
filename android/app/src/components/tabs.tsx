import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const Tabs = () => {
    const [activeTab, setActiveTab] = useState('Tokens');
    
    return (
        <View style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            paddingHorizontal: 20
        }}>
            <TouchableOpacity
                onPress={() => setActiveTab('Tokens')}
                style={{
                    flex: 1,
                    alignItems: 'center',
                }}
            >
                <Text style={{
                    fontSize: 14,
                    color: activeTab === 'Tokens' ? '#007AFF' : 'black',
                }}>Tokens</Text>
                {activeTab === 'Tokens' && (
                    <View style={{
                        marginTop: 4,
                        height: 2,
                        backgroundColor: '#007AFF',
                        width: '60%',
                        borderRadius: 2,
                    }} />
                )}
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => setActiveTab('NFTs')}
                style={{
                    flex: 1,
                    alignItems: 'center',
                }}
            >
                <Text style={{
                    fontSize: 14,
                    color: activeTab === 'NFTs' ? '#007AFF' : 'black',
                }}>NFTs</Text>
                {activeTab === 'NFTs' && (
                    <View style={{
                        marginTop: 4,
                        height: 2,
                        backgroundColor: '#007AFF',
                        width: '60%',
                        borderRadius: 2,
                    }} />
                )}
            </TouchableOpacity>
        </View>
    )
}

export default Tabs