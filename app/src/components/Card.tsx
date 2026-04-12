import React from 'react';
import { StyleSheet, ViewStyle, StyleProp, View } from 'react-native';
import { theme } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
  },
});
