import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDataRequest} from '../redux/actions/myActions';
import Card from '../component/CardComponent';
import Button from '../component/Button';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.myReducer);
  const [filter, setFilter] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchDataRequest());
  }, [dispatch]);

  // Filter the data based on the selected filter
  const filteredData = (data || []).filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'notCompleted') return !todo.completed;
    return true; // 'all' case
  });

  const renderItem = useCallback(({item}) => {
    return <Card content={item} />;
  }, []);

  const handleFilterSelect = useCallback(filterOption => {
    setFilter(filterOption);
    setModalVisible(false);
  }, []);

  // Loading and error states handled here
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }
  const getItemLayout = (data, index) => ({
    length: 100,
    offset: 100 * index,
    index,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Todo List</Text>
        <Button title="Filter" onPress={() => setModalVisible(true)} />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={5}
        getItemLayout={getItemLayout}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Filter</Text>
            <TouchableOpacity onPress={() => handleFilterSelect('all')}>
              <Text style={styles.modalOption}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterSelect('completed')}>
              <Text style={styles.modalOption}>Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleFilterSelect('notCompleted')}>
              <Text style={styles.modalOption}>Not Completed</Text>
            </TouchableOpacity>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalOption: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default HomeScreen;
