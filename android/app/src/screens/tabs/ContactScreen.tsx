import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
} from 'react-native';
import { scaleWidth, scaleHeight } from '../../constants/size';
import BlackBackground from '../../components/main/black';
import WhiteBackground from '../../components/main/white';
import { images } from '../../constants/images';
import PullBar from '../../components/pullbar';

const ContactScreen = () => {
    const contacts = [
        { name: 'Joshua Lawrence', status: 'online', avatar: images.martha, isFriend: true },
        { name: 'Andrew Parker', status: '', avatar: images.blackti, isFriend: false },
        { name: 'Martin Randolph', status: 'online', avatar: images.greenti, isFriend: true },
        { name: 'Kieron Dotson', status: 'last seen 10 minutes ago', avatar: images.martha, isFriend: true },
        { name: 'Zack John', status: '', avatar: images.greenti, isFriend: false },
        { name: 'Karen Castillo', status: 'last seen 1 hour ago', avatar: images.blackti, isFriend: true },
        { name: 'Jamie Franco', status: 'last seen 2 hour ago', avatar: images.greenti, isFriend: true },
        { name: 'Maximilian Jacobson', status: 'last seen 5 hour ago', avatar: images.martha, isFriend: true },
        { name: 'Martha Craig', status: 'last seen yesterday at 21:22', avatar: images.greenti, isFriend: true },
        { name: 'Tabitha Potter', status: '', avatar: images.blackti, isFriend: false },
        { name: 'Maisy Humphrey', status: '', avatar: images.martha, isFriend: false },
        { name: 'Maisy y', status: '', avatar: images.martha, isFriend:true },
    ];
    const [searchText, setSearchText] = useState('');
    const filteredItems = contacts.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    
    const hasEmptyStatus = filteredItems.filter(item => item.status === '').length;



    const ContactItem = ({ name, status, avatar, contact,isLast }: { name: string; status: string; avatar: any; contact?: any;isLast?:boolean }) => {
        const isOnline = status === 'online';
        const isNullStatus = status === '';
        return (
            <View>
            <TouchableOpacity style={styles.contactItem}>

                <View style={styles.avatarContainer}>
                    <Image source={avatar} style={styles.avatar} />
                </View>
                <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{name}</Text>

                    {!isNullStatus &&
                        <Text style={[styles.contactStatus, isOnline && styles.onlineStatus]}>
                            {status}
                        </Text>
                    }

                </View>

                {!contact.isFriend && (
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                )}     
            </TouchableOpacity>
             {!isLast && <View style={styles.borderbottom}/>}
             </View>
        );
    };

    return (
        <BlackBackground>
            <View style={[styles.row2, { justifyContent: 'space-between', marginTop: scaleHeight(73), marginHorizontal: 14 }]}>
                <Text style={styles.text}>Contacts</Text>
                <View style={[styles.row2, { gap: 10 }]}>
                    <Image source={images.telephone}
                        style={[styles.image2]} />
                    <Image source={images.plu}
                        style={[styles.image2]} />
                </View>
            </View>

            <WhiteBackground height={scaleHeight(811)}>
                <View style={{ height: scaleHeight(11) }} />
                <PullBar width={scaleWidth(62.5)} height={scaleHeight(6)} />

                <View>
                <View style={styles.searchContainer}>
                    <Image source={images.search} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        placeholderTextColor="#007AFF"
                        onChangeText={setSearchText}
                        
                    />
                </View>
                <View style={styles.borderbottom}/>
                </View>

                {searchText ? (
                    <View>
                        {hasEmptyStatus == 1 &&
                            <Text style={styles.notInContactsText}>Not in your contacts</Text>
                        }
                    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                        {filteredItems.map((contact, index) => (
                            <ContactItem
                                key={index}
                                name={contact.name}
                                status={contact.status}
                                avatar={contact.avatar}
                                contact={contact}
                                isLast={index === contacts.length - 1}
                            />
                        ))}

                        <TouchableOpacity style={styles.inviteContainer}>
                            <Image source={images.AddUser} style={styles.inviteIcon} />
                            <Text style={styles.inviteText}>Invite Metas</Text>
                        </TouchableOpacity>
                         <View style={styles.borderbottom}/>

                        <TouchableOpacity style={styles.inviteContainer}>
                            <Image source={images.share} style={styles.inviteIcon} />
                            <Text style={styles.inviteText}>Share invite link</Text>
                        </TouchableOpacity>
                         <View style={styles.borderbottom}/>
                    </ScrollView>
                    </View>
                ) : (
                    <>
                        <TouchableOpacity style={styles.inviteContainer}>
                            <Image source={images.AddUser} style={styles.inviteIcon} />
                            <Text style={styles.inviteText}>Invite Metas</Text>
                        </TouchableOpacity>
                         <View style={styles.borderbottom}/>

                        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                            {contacts.filter(contact => contact.isFriend).map((contact, index) => (
                                <ContactItem
                                    key={index}
                                    name={contact.name}
                                    status={contact.status}
                                    avatar={contact.avatar}
                                    contact={contact}
                                    isLast={index === contacts.length - 1}
                                />
                            ))}
                        </ScrollView>
                    </>
                )}
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
        paddingHorizontal: scaleWidth(12),
        paddingVertical: scaleHeight(8),
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    searchIcon: {
        width: scaleWidth(18),
        height: scaleHeight(18),
        tintColor: '#007AFF',
        marginRight: scaleWidth(18),
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#007AFF',
    },
    inviteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scaleWidth(12),
        paddingVertical: scaleHeight(16),
        marginHorizontal: scaleWidth(16),
    },
    inviteIcon: {
        width: scaleWidth(18),
        height: scaleHeight(18),
        tintColor: '#007AFF',
        marginRight: scaleWidth(21),
        resizeMode: 'contain',
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
        resizeMode: 'contain'
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
    searchResultContainer: {
        marginBottom: scaleHeight(20),
    },
    notInContactsText: {
        fontSize: 14,
        color: 'black',
        marginLeft: scaleWidth(25),
        marginBottom: scaleHeight(8),
    },
    searchResultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scaleWidth(16),
        paddingVertical: scaleHeight(12),
    },
    addButton: {
        backgroundColor: '#D9FD00',
        paddingHorizontal: scaleWidth(20),
        paddingVertical: scaleHeight(6),
        borderRadius: 4,
    },
    addButtonText: {
        color: '#000',
        fontSize: 14,
        fontWeight: '500',
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 19
    },
    text: {
        color: '#D9FD00',
        fontSize: 18
    },
    image2: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
        tintColor: '#D9FD00'
    },
    borderbottom: {
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
        marginHorizontal: scaleWidth(25),
    },
});

export default ContactScreen;
