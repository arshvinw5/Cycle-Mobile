import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

import { onboarding } from '~/constants';

const Onboarding = () => {
  const swipeRef = useRef<Swiper>(null);
  //to track the index
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <SafeAreaView className="w-full h-full justify-between items-center bg-[#F7F6F2]">
      <TouchableOpacity
        onPress={() => {
          router.replace('./login');
        }}
        className="w-full justify-center items-end p-5">
        <Text className="text-[#000] text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      {/* swiper card */}
      <Swiper
        ref={swipeRef}
        loop={false}
        dot={<View className="w-[32px] h-[4px] mx-1 bg-[#EEEEEE] rounded-full" />}
        activeDot={<View className="w-[32px] h-[4px] mx-1 bg-[#F05454] rounded-full" />}
        onIndexChanged={(i) => setActiveIndex(i)}>
        {onboarding.map(({ id, title, description, image }) => (
          // swiper card
          <View key={id} className="items-center justify-center p-5 my-36">
            <Image source={image} className="w-full h-[300px]" resizeMode="contain" />
            <View className="flex-row items-center justify-center w-full mt-10">
              <Text className="text-[#000] text-3xl font-bold mx-10 text-center">{title}</Text>
            </View>
            <Text className="text-lg font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
              {description}
            </Text>
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

export default Onboarding;
