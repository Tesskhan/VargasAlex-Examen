import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, TouchableOpacity } from 'react-native';

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

  // Handle submitting the task
  const handleSubmit = () => {
    if (taskTitle.trim() === '') {
      alert('Please enter a task title');
      return; // Prevent further execution
    }

    const newTask = {
      title: taskTitle,
      date: isDateLimitEnabled ? dateInput : null,
    };

    navigation.navigate('HomeScreen', { newTask });

    setTaskTitle('');
    setDateInput('');
    setIsDateLimitEnabled(false);
  };

  return (
    <View style={styles.container}>
      {/* Settings at the top of the screen */}
      <View style={styles.settingsContainer}>
        {/* Task Title Input with Underline */}
        <TextInput
          style={styles.taskInput}
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
      </View>

      {/* Conditional Date Input */}
      {isDateLimitEnabled && (
        <TextInput
          style={styles.dateInput}
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
    padding: 20,
  },
  settingsContainer: {
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskInput: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1, // Underline style
    borderBottomColor: 'gray',
    marginBottom: 20,
    paddingLeft: 5,
    fontSize: 18,
  },
  switchContainer: {
    marginBottom: 5, // Reduced margin to bring the switch closer to the input
    alignItems: 'center',
  },
  dateInput: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1, // Underline style
    borderBottomColor: 'gray',
    marginBottom: 10,
    paddingLeft: 5,
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: '#800080', // Purple color
    padding: 15,
    borderRadius: 40,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
