import { View, Modal, Text, Dimensions, StyleSheet, Animated, BackHandler, Image, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TabParamList,RootStackParamList } from '../../types/navigation';
import { MessageStackParamList } from '../../types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { images } from '../../constants/images';

type CombinedNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList>,
  CompositeNavigationProp<
    NativeStackNavigationProp<TabParamList>,
    NativeStackNavigationProp<MessageStackParamList>
  >
>;

const InfoScreen = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation<CombinedNavigationProp>();

  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  const slideAnim = useState(new Animated.Value(dimensions.height))[0];

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height,
      });
    });

    return () => {
      subscription?.remove?.();
    };
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Base dimensions (mobile: w-430 h-932, tablet: w-834 h-1194)
  const BASE_WIDTH = 430;
  const BASE_HEIGHT = 932;
  const TABLET_WIDTH = 834;
  const TABLET_HEIGHT = 1194;

  // Detect device type
  const isTablet = dimensions.width >= 600 || dimensions.height >= 1000; // Rough threshold for tablet

  // Use tablet base if detected
  const currentBaseWidth = isTablet ? TABLET_WIDTH : BASE_WIDTH;
  const currentBaseHeight = isTablet ? TABLET_HEIGHT : BASE_HEIGHT;

  // Detect orientation
  const isLandscape = dimensions.width > dimensions.height;

  // Scale functions
  const scaleWidth = (size: number) => (dimensions.width / currentBaseWidth) * size;
  const scaleHeight = (size: number) => (dimensions.height / currentBaseHeight) * size;

  // Responsive scale factor (use the smaller scale to prevent overflow)
  const scale = Math.min(
    dimensions.width / currentBaseWidth,
    dimensions.height / currentBaseHeight
  );
  const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: 'flex-end',
      alignItems: "center",

    },
    modalBox: {
      width: scaleWidth(280),
      backgroundColor: "white",
      borderRadius: 12,
      padding: scaleWidth(20),
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: scaleHeight(15),
      textAlign: "center",
    },
    modalButtonContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      marginTop: scaleHeight(20),
    },
    modalButton: {
      paddingVertical: scaleHeight(10),
      paddingHorizontal: scaleWidth(20),
      borderRadius: 8,
      minWidth: scaleWidth(80),
      alignItems: "center",
    },
    callButton: {
      backgroundColor: "#037EE5",
    },
    cancelButton: {
      backgroundColor: "#FE3B30",
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "500",
    },
  });

  return (
    <View style={{
      backgroundColor: '#232323',
      flex: 1,
      height: '100%',
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scaleWidth(14),
        marginTop: scaleHeight(73)
      }}>
        <Pressable onPress={() => isTablet ? navigation.navigate('ChatScreen') : navigation.goBack()}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleWidth(9)
          }}>

            <Image source={images.backk}
              style={{
                width: scaleWidth(14),
                height: scaleHeight(14),
                tintColor: '#D9FD00',
                resizeMode: 'contain'
              }} />

            <Text style={{
              color: '#D9FD00',
              fontSize: 18
            }}>Back</Text>

          </View>
        </Pressable>
        <Text style={{
          color: '#D9FD00',
          fontSize: 18
        }}>Info</Text>
        <Pressable onPress={() => navigation.navigate('InfoEdit')}>
          <Text style={{
            color: '#D9FD00',
            fontSize: 18
          }}>Edit</Text>
        </Pressable>
      </View>

      <Animated.View style={{
        backgroundColor: '#FFFFFF',
        height: isTablet ? '90%' : scaleHeight(811),
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
        transform: [{ translateY: slideAnim }],
      }}>
        <ScrollView
          contentContainerStyle={{
            minHeight: isTablet ? scaleHeight(1092) : scaleHeight(1000),

          }}
        >
          <View style={{
            backgroundColor: '#AEAEB2',
            width: scaleWidth(63),
            height: scaleHeight(6),
            borderRadius: 6,
            position: 'absolute',
            left: (dimensions.width - scaleWidth(63)) / 2,
            top: scaleWidth(11)
          }} />

          {/* Title */}
          <View style={{
            marginTop: scaleHeight(40),
            height: scaleHeight(92),
            width: '100%',
            backgroundColor: '#F6F6F6',
            justifyContent: 'center',
            borderBottomColor: '#C6C6C8',
            borderBottomWidth: 1,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 30,
              justifyContent: 'space-between'
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: scaleWidth(30)
              }}>
                <Image source={images.martha}
                  style={{
                    width: scaleWidth(66),
                    height: scaleHeight(66),
                    resizeMode: 'contain'
                  }}
                />
                <View style={{
                  flexDirection: 'column'
                }}>
                  <Text style={{
                    fontSize: 19
                  }}>Martha Craig</Text>
                  <Text style={{
                    color: '#037EE5',
                    fontSize: 15
                  }}>Online</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setVisible(true)}>
                <Image source={images.telephone}
                  style={{
                    width: scaleWidth(22),
                    height: scaleHeight(22),
                    tintColor: '#037EE5',
                    resizeMode: 'contain'
                  }}
                /></TouchableOpacity>
            </View>
          </View>


          <View style={{
            backgroundColor: isTablet ? '#F6F6F6' : 'none',
            marginTop: isTablet ? scaleHeight(20) : scaleHeight(0)
          }}>
            <View style={{
              marginLeft: isTablet ? scaleWidth(34) : scaleWidth(18),
              marginTop: scaleHeight(10)
            }}>
              <View style={{
                flexDirection: 'column',
                paddingVertical: isTablet ? scaleHeight(20) : scaleHeight(12),
              }}>
                <Text>Wallet</Text>
                <Text style={{
                  color: '#00B12C'
                }}>0xb96cc255470............599</Text>
              </View>
            </View>
            <View style={{
              borderBottomColor: '#C6C6C8',
              borderBottomWidth: 1,
              width: isTablet ? scaleWidth(735) : scaleWidth(380),
              alignSelf: 'center'
            }} />
          </View>

          <View style={{
            backgroundColor: isTablet ? '#F6F6F6' : 'none',
          }}>
            <View style={{
              marginLeft: isTablet ? scaleWidth(34) : scaleWidth(18)
            }}>
              <View style={{
                flexDirection: 'column',
                paddingVertical: isTablet ? scaleHeight(20) : scaleHeight(12),
              }}>
                <Text>Wallet #</Text>
                <Text style={{
                  color: '#037EE5'
                }}>0xb96cc255470............599</Text>
              </View>
            </View>
            <View style={{
              borderBottomColor: '#C6C6C8',
              borderBottomWidth: 1,
              width: isTablet ? scaleWidth(735) : scaleWidth(380),
              alignSelf: 'center'
            }} />
          </View>

          <View style={{
            backgroundColor: isTablet ? '#F6F6F6' : 'none',
          }}>
            <View style={{
              marginLeft: isTablet ? scaleWidth(34) : scaleWidth(18),
            }}>
              <View style={{
                flexDirection: 'column',
                paddingVertical: isTablet ? scaleHeight(20) : scaleHeight(12),
              }}>
                <Text>Bio</Text>
                <Text>Lorem ipsum dolor sit amet consectetur.</Text>
              </View>
            </View>
            <View style={{
              borderBottomColor: '#C6C6C8',
              borderBottomWidth: 1,
              width: isTablet ? scaleWidth(735) : scaleWidth(380),
              alignSelf: 'center'
            }} />
          </View>

          <View>
            <View style={{
              marginLeft: isTablet ? scaleWidth(22) : scaleWidth(18),
              marginTop: isTablet ? scaleHeight(30) : scaleHeight(20)
            }}>
              <View style={{
                flexDirection: 'column',
                paddingVertical: isTablet ? scaleHeight(20) : scaleHeight(12),
              }}>
                <Text>username</Text>
                <Text style={{
                  color: '#037EE5'
                }}>@marthacraig</Text>
              </View>
            </View>
            <View style={{
              borderBottomColor: '#C6C6C8',
              borderBottomWidth: 1,
              width: isTablet ? scaleWidth(735) : scaleWidth(380),
              alignSelf: 'center'
            }} />
          </View>

          <View>
            <View style={{
              marginLeft: isTablet ? scaleWidth(34) : scaleWidth(18),
              marginTop: isTablet ? scaleHeight(27) : scaleHeight(20)
            }}>
              <View style={{
                flexDirection: 'column',
                paddingVertical: scaleHeight(12),
              }}>
                <Text style={{
                  color: '#037EE5'
                }}>Send Message</Text>
              </View>
            </View>
            <View style={{
              borderBottomColor: '#C6C6C8',
              borderBottomWidth: 1,
              width: isTablet ? scaleWidth(735) : scaleWidth(380),
              alignSelf: 'center'
            }} />
          </View>

          <View>
            <View style={{
              marginLeft: isTablet ? scaleWidth(34) : scaleWidth(18),

            }}>
              <View style={{
                flexDirection: 'column',
                paddingVertical: isTablet ? scaleHeight(20) : scaleHeight(12),
              }}>
                <Text style={{
                  color: '#037EE5'
                }}>Share Wallet</Text>
              </View>
            </View>
            <View style={{
              borderBottomColor: '#C6C6C8',
              borderBottomWidth: 1,
              width: isTablet ? scaleWidth(735) : scaleWidth(380),
              alignSelf: 'center'
            }} />
          </View>

          <View>
            <View style={{
              marginLeft: isTablet ? scaleWidth(34) : scaleWidth(18),

            }}>
              <View style={{
                flexDirection: 'column',
                paddingVertical: isTablet ? scaleHeight(20) : scaleHeight(12),
              }}>
                <Text style={{
                  color: '#037EE5'
                }}>Start Secret Chat</Text>
              </View>
            </View>
            <View style={{
              borderBottomColor: '#C6C6C8',
              borderBottomWidth: 1,
              width: isTablet ? scaleWidth(735) : scaleWidth(380),
              alignSelf: 'center'
            }} />
          </View>

          <View>
            <View style={{
              marginLeft: isTablet ? scaleWidth(34) : scaleWidth(18),
              marginTop: isTablet ? scaleHeight(27) : scaleHeight(20)
            }}>
              <View style={{
                flexDirection: 'row',
                paddingVertical: isTablet ? scaleHeight(20) : scaleHeight(12),
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: isTablet ? '5%' : scaleWidth(0)

              }}>
                <Text style={{
                  color: '#00000'
                }}>Shared Media</Text>
                <Image source={images.next}
                  style={{
                    marginRight: scaleWidth(20),
                    width: scaleWidth(12),
                    height: scaleHeight(12),
                    tintColor: '#C6C6C8'
                  }}
                />
              </View>
            </View>
            <View style={{
              borderBottomColor: '#C6C6C8',
              borderBottomWidth: 1,
              width: isTablet ? scaleWidth(735) : scaleWidth(380),
              alignSelf: 'center'
            }} />
          </View>

          <View>
            <View style={{
              marginLeft: isTablet ? scaleWidth(34) : scaleWidth(18),

            }}>
              <View style={{
                flexDirection: 'row',
                paddingVertical: isTablet ? scaleHeight(20) : scaleHeight(12),
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: isTablet ? '5%' : scaleWidth(0)
              }}>
                <Text style={{
                  color: '#00000'
                }}>Notifications</Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: scaleWidth(15)
                }}>
                  <Text style={{
                    color: '#C6C6C8'
                  }}>Enabled</Text>
                  <Image source={images.next}
                    style={{
                      marginRight: scaleWidth(20),
                      width: scaleWidth(12),
                      height: scaleHeight(12),
                      tintColor: '#C6C6C8'
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{
              borderBottomColor: '#C6C6C8',
              borderBottomWidth: 1,
              width: isTablet ? scaleWidth(735) : scaleWidth(380),
              alignSelf: 'center'
            }} />
          </View>

          <View>
            <View style={{
              marginLeft: isTablet ? scaleWidth(34) : scaleWidth(18),

            }}>
              <View style={{
                flexDirection: 'row',
                paddingVertical: isTablet ? scaleHeight(20) : scaleHeight(12),
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: isTablet ? '5%' : scaleWidth(0)

              }}>
                <Text style={{
                  color: '#00000'
                }}>Groups In Common</Text>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: scaleWidth(15)
                }}>
                  <Text style={{
                    color: '#C6C6C8'
                  }}>1</Text>
                  <Image source={images.next}
                    style={{
                      marginRight: scaleWidth(20),
                      width: scaleWidth(12),
                      height: scaleHeight(12),
                      tintColor: '#C6C6C8'
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{
              borderBottomColor: '#C6C6C8',
              borderBottomWidth: 1,
              width: isTablet ? scaleWidth(735) : scaleWidth(380),
              alignSelf: 'center'
            }} />
          </View>

          <View>


            <View style={{
              flexDirection: 'column',
              paddingVertical: isTablet ? scaleHeight(20) : scaleHeight(12),
              backgroundColor: '#F6F6F6',
              marginTop: scaleHeight(20)
            }}>
              <Text style={{
                color: '#FE3B30',
                marginLeft: isTablet ? scaleWidth(34) : scaleWidth(18),

              }}>Block User</Text>
            </View>
          </View>
        </ScrollView>
      </Animated.View>

      {/* Call Modal */}
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <TouchableOpacity onPress={()=>navigation.navigate('VideoRinging')}>
              <Text style={styles.modalTitle}>Video Call Ringing</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('AudioRinging')}>
              <Text style={styles.modalTitle}>Audio Call Ringing</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('IncomingVideoCall')}>
              <Text style={styles.modalTitle}>Incoming Video Call </Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('IncomingAudiooCall')}>
              <Text style={styles.modalTitle}>Incoming Audio Calling</Text></TouchableOpacity>
           <TouchableOpacity onPress={()=>navigation.navigate('VideoCallAnswer')}>
              <Text style={styles.modalTitle}>Video Call Answer</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('AudioCallAnswer')}>
              <Text style={styles.modalTitle}>Audio Call Answer</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default InfoScreen