import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { theme } from '../theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, style, ...props }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor={theme.colors.subtext}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xs,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: theme.colors.subtext,
    fontFamily: 'Inter',
    fontWeight: '500',
    marginLeft: 4,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(228, 228, 231, 0.6)',
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    height: 48,
    fontSize: 16,
    color: theme.colors.primary,
    fontFamily: 'Inter',
  },
  errorText: {
    fontSize: 12,
    color: theme.colors.error,
    marginLeft: 4,
  },
});
