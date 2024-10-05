import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

// Define the Button component
const Button = ({ title, onPress, style = {}, loading = false, ...props }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]} // Combine styles
      onPress={onPress}
      disabled={loading} // Disable button while loading
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#fff" /> // Show loading spinner
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

// Styles for the button
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

// PropTypes for validation
Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  loading: PropTypes.bool,
};

export default Button;
