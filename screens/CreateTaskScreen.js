import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, TouchableOpacity } from 'react-native';
import { db, collection, addDoc } from '../Firebase';  // Import Firestore methods

export default function CreateTaskScreen({ navigation, route }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [isDateLimitEnabled, setIsDateLimitEnabled] = useState(false);
  const [dateInput, setDateInput] = useState('');

  // If editing a task, populate the fields with existing task data
  useEffect(() => {
    if (route.params?.taskToEdit) {
      const task = route.params.taskToEdit;
      setTaskTitle(task.title);
      setDateInput(task.date || '');
      setIsDateLimitEnabled(!!task.date);
    }
  }, [route.params?.taskToEdit]);

  // Handle the switch toggle to enable/disable date input
  const handleSwitchToggle = () => {
    setIsDateLimitEnabled(!isDateLimitEnabled);
  };

  // Handle submitting the task to Firebase Firestore
  const handleSubmit = async () => {
    if (taskTitle.trim() === '') {
      alert('Please enter a task title');
      return;
    }

    const newTask = {
      title: taskTitle,
      date: isDateLimitEnabled ? dateInput : null,
    };

    try {
      // Save task to Firestore
      await addDoc(collection(db, 'tasks'), newTask);
      alert('Task saved successfully!');

      // Navigate to HomeScreen and pass the new task
      navigation.navigate('HomeScreen', { newTask });

      // Reset the form after submitting
      setTaskTitle('');
      setDateInput('');
      setIsDateLimitEnabled(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Failed to save task!');
    }
  };

  return (
    <View style={styles.container}>
      <Text>{route.params?.taskToEdit ? 'Edit Task' : 'Create a New To-Do Task'}</Text>

      {/* Task Title Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />

      {/* Switch for Date Limit */}
      <View style={styles.switchContainer}>
        <Text>Add a date limit?</Text>
        <Switch
          value={isDateLimitEnabled}
          onValueChange={handleSwitchToggle}
        />
      </View>

      {/* Conditional Date Input */}
      {isDateLimitEnabled && (
        <TextInput
          style={styles.input}
          placeholder="Choose a date (DD/MM/YYYY)"
          value={dateInput}
          onChangeText={setDateInput}
          keyboardType="numeric"  // Numeric keyboard
          maxLength={10}          // Limit to 10 characters
        />
      )}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
  },
  switchContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
