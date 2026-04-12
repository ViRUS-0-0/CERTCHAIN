import { Tabs } from 'expo-router';
import React from 'react';
import { View, Platform } from 'react-native';
import { ShieldCheck, PlusCircle, Search } from 'lucide-react-native';
import { theme } from '../../src/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.cta,
        tabBarInactiveTintColor: theme.colors.subtext,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 24 : 16,
          left: 16,
          right: 16,
          elevation: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          borderRadius: 24,
          height: 64,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.4)',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
          paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarBackground: () => (
          <View style={{ flex: 1, backgroundColor: 'transparent' }} />
        ),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <ShieldCheck size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="issue"
        options={{
          title: 'Issue',
          tabBarIcon: ({ color, focused }) => (
            <PlusCircle size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
      <Tabs.Screen
        name="verify"
        options={{
          title: 'Verify',
          tabBarIcon: ({ color, focused }) => (
            <Search size={24} color={color} strokeWidth={focused ? 2.5 : 2} />
          ),
        }}
      />
    </Tabs>
  );
}
