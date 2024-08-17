import { View, Text } from 'react-native';
import { Tabs, Redirect } from 'expo-router';
import { TabBar } from '~/components/tabBar';

const TabsLayout = () => {
  return (
    <>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="activity"
          options={{
            title: 'Activity',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
