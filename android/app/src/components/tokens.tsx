import { View, Text, Image, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { images } from '../constants/images';

interface TokensProps {
  onTotalSumChange?: (totalSum: number) => void;
}

const Tokens = ({onTotalSumChange }: TokensProps) => {

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


const tokenImage = images.token1;

const coins=[
  {
    id: '1', coinName: 'Bitcoin', coinImage: tokenImage, numberOfCoins:'0.5 BTC', total:'$22,500.00'
  },
  {
    id: '2', coinName: 'Ethereum', coinImage: tokenImage, numberOfCoins:'15 ETH', total:'$24,750.00'
  },
  {
    id: '3', coinName: 'USD Coin', coinImage: tokenImage, numberOfCoins:'5,000 USDC', total:'$5,000.00'
  },
  {
    id: '4', coinName: 'Binance Coin', coinImage: tokenImage, numberOfCoins:'100 BNB', total:'$23,000.00'
  },
  {
    id: '5', coinName: 'Cardano', coinImage: tokenImage, numberOfCoins:'10,000 ADA', total:'$3,500.00'
  },
  {
    id: '6', coinName: 'Solana', coinImage: tokenImage, numberOfCoins:'250 SOL', total:'$5,750.00'
  },
  {
    id: '7', coinName: 'Polygon', coinImage: tokenImage, numberOfCoins:'8,000 MATIC', total:'$6,400.00'
  },
  {
    id: '8', coinName: 'Chainlink', coinImage: tokenImage, numberOfCoins:'500 LINK', total:'$7,250.00'
  },
  {
    id: '9', coinName: 'Polkadot', coinImage: tokenImage, numberOfCoins:'1,200 DOT', total:'$6,000.00'
  },
  {
    id: '10', coinName: 'Avalanche', coinImage: tokenImage, numberOfCoins:'300 AVAX', total:'$4,200.00'
  },
  {
    id: '11', coinName: 'Litecoin', coinImage: tokenImage, numberOfCoins:'50 LTC', total:'$3,650.00'
  },
  {
    id: '12', coinName: 'Uniswap', coinImage: tokenImage, numberOfCoins:'800 UNI', total:'$4,800.00'
  },
  {
    id: '13', coinName: 'Uniswap', coinImage: tokenImage, numberOfCoins:'800 UNI', total:'$4,800.00'
  },
  {
    id: '14', coinName: 'Uniswap', coinImage: tokenImage, numberOfCoins:'800 UNI', total:'$4,800.00'
  }

]
const totalSum = coins.reduce((sum, item) => {
  
  const value = Number(item.total.replace(/\$|,/g, ''));
  return sum + value;
}, 0);

useEffect(() => {
  onTotalSumChange?.(totalSum);
}, [totalSum, onTotalSumChange]);


  return (
    <View>
      {coins.map((items)=>(
        <React.Fragment key={items.id}>
          
          <View style={{
            flexDirection:'row',
            paddingVertical:scaleHeight(10),
            alignItems:'center',
            justifyContent:'space-between'
          }}>
            <View style={{
              flexDirection:'row',
              gap: scaleWidth(12)
            }}>
            <Image source={items.coinImage}/>
            <View style={{
              flexDirection:'column'
            }}>
                <Text style={{fontSize: 14}}>{items.coinName}</Text>
                <Text style={{fontSize: 14}}>{items.numberOfCoins}</Text>
            </View>
            </View>
            <Text style={{fontSize: 14,paddingRight:scaleWidth(25)}}>{items.total}</Text>
          </View>
          {/* Border Bottom */}
          <View style={{
            borderBottomColor:'rgba(60,60,67,0.29)',
            borderBottomWidth:1,
            paddingHorizontal:scaleHeight(5),
            width:dimensions.width - scaleWidth(50)
          }}/>
        </React.Fragment>
      ))}
    </View>
  )
}

export default Tokens