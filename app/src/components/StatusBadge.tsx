import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface StatusBadgeProps {
  label: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(22, 163, 74, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(22, 163, 74, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    color: theme.colors.success,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'Inter',
  },
});
