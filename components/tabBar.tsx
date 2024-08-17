import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import TabBarButton from './tabBarButton';

export function TabBar({ state, descriptors, navigation }: BottomTabBarButtonProps) {
  //to create the layout of button initial values
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

  //te get the number of tabs and this will create animation any number of tabs and this gets the button width
  const buttonWidth = dimensions.width / state.routes.length;

  //this will calculate bg of the button width to set
  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  //animation
  const tabPositionX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: tabPositionX.value,
        },
      ],
    };
  });
  return (
    <View
      onLayout={onTabBarLayout}
      className="absolute bottom-16 flex-row justify-between items-center bg-[#000] mx-20 py-5 rounded-xl shadow-xl shadow-[#000]">
      <Animated.View
        className="absolute bg-[#F05454] rounded-lg mx-[15px]"
        style={[animatedStyle, { height: dimensions.height - 20, width: buttonWidth - 30 }]}
      />
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, { duration: 1500 });
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? '#082032' : '#DDDDDD'}
            label={label}
          />
        );
      })}
    </View>
  );
}

//Color
//102C57
//074173
