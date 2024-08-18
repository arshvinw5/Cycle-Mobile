import { useEffect } from 'react';
import { Pressable, Text } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { icon } from '~/constants/icon';

interface TabBarButtonProps {
  onPress: Function;
  onLongPress: Function;
  isFocused: boolean;
  routeName: string;
  color: string;
  label: string;
}

export default function TabBarButton({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}: TabBarButtonProps) {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, {
      duration: 350,
    });
  }, [scale, isFocused]);

  //Animated text style
  const animatedText = useAnimatedStyle(() => {
    //changing opacity
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return { opacity };
  });

  //Animated icon style
  const animatedIconStyle = useAnimatedStyle(() => {
    //to make the icon bigger
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.5]);

    //to make the icon center
    const top = interpolate(scale.value, [0, 1], [0, 9]);

    return {
      transform: [
        {
          scale: scaleValue,
        },
      ],
      top,
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      className=" space-y-2 justify-center items-center"
      style={{ flex: 1 }}>
      <Animated.View style={animatedIconStyle}>
        {icon[routeName]({
          color: color,
        })}
      </Animated.View>
      <Animated.Text className="text-center" style={[{ color: color, fontSize: 13 }, animatedText]}>
        {label}
      </Animated.Text>
    </Pressable>
  );
}
