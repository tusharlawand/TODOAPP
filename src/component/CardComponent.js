import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Card = React.memo(({ content }) => {
  const { userId, id, title, completed } = content;

  return (
    <View style={styles.card} accessible={true} accessibilityLabel={`Task: ${title}`}>
      <View style={styles.idStyle}>
        <Text style={styles.header}>User ID: {userId}</Text>
        <Text style={styles.header}>Task ID: {id}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.idStyle}>
        <Text style={styles.status}>Status: </Text>
        <Text
          style={[
            styles.status,
            { color: completed ? 'green' : 'orange' },
          ]}
        >
          {completed ? 'Completed' : 'Not Completed'}
        </Text>
      </View>
    </View>
  );
});

// Prop types for validation
Card.propTypes = {
  content: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  idStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    fontSize: 14,
  },
});

export default Card;
