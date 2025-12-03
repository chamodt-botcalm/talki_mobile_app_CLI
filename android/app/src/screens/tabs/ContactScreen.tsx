import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
} from 'react-native';
import BlackBackground from '../../components/main/black';
import WhiteBackground from '../../components/main/white';
import { scaleHeight, scaleWidth } from '../../constants/size';
import { images } from '../../constants/images';
import PullBar from '../../components/pullbar';

const ContactScreen = () => {
    const contacts = [
        { name: 'Joshua Lawrence', status: 'online', avatar: images.greenti },
        { name: 'Andrew Parker', status: 'online', avatar: images.blackti },
        { name: 'Martin Randolph', status: 'online', avatar: images.greenti },
        { name: 'Kieron Dotson', status: 'last seen 10 minutes ago', avatar: images.blackti },
        { name: 'Zack John', status: 'last seen 25 minutes ago', avatar: images.greenti },
        { name: 'Karen Castillo', status: 'last seen 1 hour ago', avatar: images.blackti },
        { name: 'Jamie Franco', status: 'last seen 2 hour ago', avatar: images.greenti },
        { name: 'Maximilian Jacobson', status: 'last seen 5 hour ago', avatar: images.blackti },
        { name: 'Martha Craig', status: 'last seen yesterday at 21:22', avatar: images.greenti },
        { name: 'Tabitha Potter', status: 'last seen recently', avatar: images.blackti },
        { name: 'Maisy Humphrey', status: 'last seen recently', avatar: images.greenti },
    ];

    const ContactItem = ({ name, status, avatar }: { name: string; status: string; avatar: any }) => {
        const isOnline = status === 'online';
        return (
            <TouchableOpacity style={styles.contactItem}>
                <View style={styles.avatarContainer}>
                    <Image source={avatar} style={styles.avatar} />
                </View>
                <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{name}</Text>
                    <Text style={[styles.contactStatus, isOnline && styles.onlineStatus]}>
                        {status}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <BlackBackground>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Contacts</Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Image source={images.telephone} style={styles.actionIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Text style={styles.addIcon}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <WhiteBackground height={scaleHeight(811)}>
                <View style={{ height: scaleHeight(11) }} />
                <PullBar width={scaleWidth(62.5)} height={scaleHeight(6)} />
                
                <View style={styles.searchContainer}>
                    <Image source={images.user} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#007AFF"
                    />
                </View>

                <TouchableOpacity style={styles.inviteContainer}>
                    <Image source={images.plus} style={styles.inviteIcon} />
                    <Text style={styles.inviteText}>Invite Metas</Text>
                </TouchableOpacity>

                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    {contacts.map((contact, index) => (
                        <ContactItem
                            key={index}
                            name={contact.name}
                            status={contact.status}
                            avatar={contact.avatar}
                        />
                    ))}
                </ScrollView>
            </WhiteBackground>
        </BlackBackground>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: scaleWidth(14),
        marginTop: scaleHeight(73),
    },
    headerTitle: {
        color: '#D9FD00',
        fontSize: 18,
        fontWeight: '600',
    },
    headerActions: {
        flexDirection: 'row',
        gap: scaleWidth(15),
    },
    actionButton: {
        padding: 5,
    },
    actionIcon: {
        width: scaleWidth(20),
        height: scaleHeight(20),
        tintColor: '#D9FD00',
    },
    addIcon: {
        color: '#D9FD00',
        fontSize: 24,
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: scaleWidth(16),
        marginTop: scaleHeight(20),
        marginBottom: scaleHeight(10),
        paddingHorizontal: scaleWidth(12),
        paddingVertical: scaleHeight(8),
        backgroundColor: '#F2F2F7',
        borderRadius: 10,
    },
    searchIcon: {
        width: scaleWidth(16),
        height: scaleHeight(16),
        tintColor: '#007AFF',
        marginRight: scaleWidth(8),
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#007AFF',
    },
    inviteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scaleWidth(16),
        paddingVertical: scaleHeight(12),
        marginBottom: scaleHeight(10),
    },
    inviteIcon: {
        width: scaleWidth(20),
        height: scaleHeight(20),
        tintColor: '#007AFF',
        marginRight: scaleWidth(12),
    },
    inviteText: {
        fontSize: 16,
        color: '#007AFF',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scaleWidth(16),
        paddingVertical: scaleHeight(12),
    },
    avatarContainer: {
        marginRight: scaleWidth(12),
    },
    avatar: {
        width: scaleWidth(40),
        height: scaleHeight(40),
        borderRadius: 20,
        resizeMode:'contain'
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        marginBottom: 2,
    },
    contactStatus: {
        fontSize: 14,
        color: '#8E8E93',
    },
    onlineStatus: {
        color: '#007AFF',
    },
});

export default ContactScreen;
