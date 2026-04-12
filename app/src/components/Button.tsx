import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { theme } from '../theme';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isGhost = variant === 'ghost';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.base,
        isPrimary && styles.primary,
        isSecondary && styles.secondary,
        isGhost && styles.ghost,
        disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#fff' : theme.colors.primary} />
      ) : (
        <>
          {icon && icon}
          <Text
            style={[
              styles.textBase,
              isPrimary && styles.textPrimary,
              isSecondary && styles.textSecondary,
              isGhost && styles.textGhost,
              disabled && styles.textDisabled,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    height: 52,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  primary: {
    backgroundColor: theme.colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  secondary: {
    backgroundColor: theme.colors.surfaceSolid,
    borderWidth: 1,
    borderColor: theme.colors.borderSolid,
  },
  ghost: {
    backgroundColor: 'transparent',
    height: 40,
    paddingHorizontal: theme.spacing.md,
  },
  disabled: {
    opacity: 0.6,
  },
  textBase: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  textPrimary: {
    color: '#FFFFFF',
  },
  textSecondary: {
    color: theme.colors.primary,
  },
  textGhost: {
    color: theme.colors.subtext,
  },
  textDisabled: {
    color: 'rgba(255,255,255,0.8)',
  },
});
