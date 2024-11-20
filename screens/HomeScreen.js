import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen({ navigation, route }) {
  const [tasks, setTasks] = useState([]); // State to store tasks

  // Check if there's any data passed from the CreateTaskScreen
  useEffect(() => {
    if (route.params?.newTask) {
      const newTask = route.params.newTask;
      // Add the new task to the list without overwriting the existing ones
      setTasks((prevTasks) => [...prevTasks, newTask]); 
    }
  }, [route.params?.newTask]);

  // Function to handle task deletion
  const handleDelete = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  // Empty function for the Edit button (no functionality)
  const handleEdit = () => {
    // Placeholder for future editing functionality
    console.log('Edit button clicked - no functionality yet');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List App</Text>

      <ScrollView style={styles.taskList}>
        {tasks.map((task, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{task.title}</Text>
              {task.date && <Text style={styles.cardDate}>Date: {task.date}</Text>}
            </View>

            <View style={styles.cardActions}>
              {/* Edit Button - No functionality */}
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleEdit} // It does nothing when clicked
              >
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDelete(index)} // Delete Task
              >
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateTaskScreen')}
      >
        <Text style={styles.addButtonText}>Add Something</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskList: {
    width: '90%',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDate: {
    color: 'gray',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
