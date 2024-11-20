import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';

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

  // Function to handle task deletion with confirmation
  const handleDelete = (index) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
          }
        }
      ]
    );
  };

  // Function to toggle task completion
  const toggleTaskCompletion = (index) => {
    setTasks((prevTasks) => {
      // Create a new array and modify the task at the specific index
      const updatedTasks = prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      );
      return updatedTasks;  // Return the updated tasks array
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List App</Text>

      <ScrollView style={styles.taskList}>
        {tasks.map((task, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardContent}>
              {/* Switch for task completion, placed on the far left */}
              <Switch
                value={task.completed} // Whether the task is completed
                onValueChange={() => toggleTaskCompletion(index)} // Toggle completion
                style={styles.switch} // Add custom styling for the switch position
              />
              
              <View style={styles.textContent}>
                <Text
                  style={[
                    styles.cardTitle,
                    task.completed && styles.completedText, // Apply strikethrough if completed
                  ]}
                >
                  {task.title}
                </Text>
                {task.date && (
                  <Text
                    style={[
                      styles.cardDate,
                      task.completed && styles.completedText, // Apply strikethrough if completed
                    ]}
                  >
                    Date: {task.date}
                  </Text>
                )}
              </View>
            </View>

            <View style={styles.cardActions}>
              {/* Edit Button - Does nothing when clicked */}
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDelete(index)} // Trigger the delete confirmation
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
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Ensure that cards' content is aligned to the start
    minHeight: 80, // Set a minimum height for each card
  },
  switch: {
    marginRight: 10, // Space between switch and task text
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDate: {
    color: 'gray',
  },
  completedText: {
    textDecorationLine: 'line-through',
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
