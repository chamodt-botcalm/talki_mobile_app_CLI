import { View, Text, Image,Dimensions } from 'react-native'
import React,{useState,useEffect} from 'react'
import { images } from '../constants/images';

const Messages = () => {

    const [dimensions, setDimensions] = useState({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      });
  
    useEffect(() => {
      const subscription = Dimensions.addEventListener('change', ({ window }) => {
        setDimensions({
          width: window.width,
          height: window.height,
        });
      });
  
      return () => subscription?.remove();
    }, []);
  
  // Base dimensions (mobile: w-430 h-932, tablet: w-834 h-1194)
    const BASE_WIDTH = 430;
    const BASE_HEIGHT = 932;
    const TABLET_WIDTH = 834;
    const TABLET_HEIGHT = 1194;
  
    // Detect device type
    const isTablet = dimensions.width >= 600 || dimensions.height >= 1000;
  
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

  const messagess = [
    {
      id: '1',
      sender: 'person1',
      text: 'Do you know what time it is?',
      time: '09:12 AM',
      hasSeen: false,
      sent: false
    },
    {
      id: '2',
      sender: 'me',
      text: 'It’s morning in Australia.... ☀️',
      time: '09:13 AM',
      hasSeen: true,
      sent: false
    },
    {
      id: '3',
      sender: 'person1',
      text: 'What is the most popular Token in Japan?',
      time: '09:14 AM',
      hasSeen: true,
      sent: false
    },
    {
      id: '4',
      sender: 'person1',
      text: 'Do you like it?',
      time: '09:14 AM',
      hasSeen: true,
      sent: false
    },
    {
      id: '5',
      sender: 'me',
      text: 'I think the top two are Shiba Inu and Astar Network!',
      time: '09:15 AM',
      hasSeen: true,
      sent: false
    },
    {
      id: '6',
      sender: 'me',
      text: 'Payment done 💸',
      time: '09:16 AM',
      hasSeen: true,
      sent: false
    },
    {
      id: '7',
      sender: 'person1',
      text: 'Wow, that was fast! How did you send it so quickly?',
      time: '09:17 AM',
      hasSeen: true,
      sent: false
    },
    {
      id: '8',
      sender: 'me',
      text: 'Used my crypto wallet, instant transfer 😎',
      time: '09:18 AM',
      hasSeen: true,
      sent: false
    },
    {
      id: '9',
      sender: 'person1',
      text: 'Nice! Is that new Talki app you mentioned?',
      time: '09:19 AM',
      hasSeen: true,
      sent: false
    },
    {
      id: '10',
      sender: 'me',
      text: 'Yes exactly, it’s in beta now but super smooth. 🚀',
      time: '09:20 AM',
      hasSeen: true,
      sent: false
    },
    {
      id: '11',
      sender: 'person1',
      text: 'Sounds cool! Can I join the beta?',
      time: '09:22 AM',
      hasSeen: true,
      sent: false
    },
    {
      id: '12',
      sender: 'me',
      text: 'Sure! I’ll send you an invite link shortly 👍',
      time: '09:23 AM',
      hasSeen: true,
      sent: false
    },
    {
      id: '13',
      sender: 'person1',
      text: 'Thanks! By the way, did you see the market today?',
      time: '09:25 AM',
      hasSeen: true,
      sent: false
    },
    {
      id: '14',
      sender: 'me',
      text: 'Yeah, BTC bounced back again 😅',
      time: '09:26 AM',
      hasSeen: true,
      sent: false
    },
    {
      id: '15',
      sender: 'person1',
      text: 'Crazy! I wish I bought more last week.',
      time: '09:27 AM',
      hasSeen: true,
      sent: false
    },
    {
      id: '16',
      sender: 'me',
      text: 'Haha same here. Timing the market is impossible 😂, Haha same here. Timing the market is impossible 😂Haha same here. Timing the market is impossible 😂',
      time: '09:28 AM',
      hasSeen: false,
      sent: true
    }
  ]

  return (

    <View style={{
      padding: 10,
      marginTop: 28,
      paddingBottom: 100
    }}>
      {messagess.map((message) => (
        <View key={message.id} style={{
          alignItems: message.sender === 'me' ? 'flex-end' : 'flex-start',
        }}>
          {
            <View style={{
              alignItems: message.sender === 'me' ? 'flex-end' : 'flex-start',
              backgroundColor: message.sender === 'me' ? '#232323' : '#F7F7F7',
              paddingVertical: 20,
              marginVertical: 5,
              paddingHorizontal: 15,
              borderRadius: 20,
              maxWidth: message.sender === 'me' ? '80%' : '80%'
            }}>
              <Text style={{
                color: message.sender === 'me' ? '#FFFFFF' : '#000000',
                fontSize: 14,
                marginBottom: 5
              }}>{message.text}</Text>
              <View style={{
                flexDirection: 'row',
                position: 'absolute',
                right:message.sender==='me'? 10:15,
                bottom:3,
                alignItems: 'center',
                gap: 5
              }}>
                <Text style={{

                  color: message.sender === 'me' ? '#D9FD00' : '#8E8E93',
                  fontSize: 11,
                }}>{message.time}</Text>
                {message.sender === 'me' && message.hasSeen &&
                  <Image source={images.checkMark}
                    style={{
                      width: 14,
                      height: 7,
                      tintColor: '#D9FD00'
                    }} />
                }
                {message.sender === 'me' && message.sent &&
                  <Image source={images.check}
                    style={{
                      width: 8,
                      height: 8,
                      tintColor: '#D9FD00'
                    }} />
                }

              </View>
            </View>
          }
        </View>
      ),)}
    </View>

  )
}

export default Messages