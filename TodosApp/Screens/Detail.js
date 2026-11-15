import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { db } from '../config';

const Detail = ({ route }) => {
  const { item } = route.params;
  const [textHeading, setTextHeading] = useState(item.heading);
  const navigation = useNavigation();

  // UPDATE
  const updateTodo = async () => {
    if (textHeading && textHeading.trim().length > 0) {
      try {
        await updateDoc(doc(db, 'todos', item.id), { heading: textHeading.trim() });
        navigation.navigate('Home');
      } catch (error) {
        Alert.alert('Gagal memperbarui', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textfield}
        onChangeText={setTextHeading}
        value={textHeading}
        placeholder="Update Todo"
      />
      <TouchableOpacity style={styles.buttonUpdate} onPress={updateTodo}>
        <Text>UPDATE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 80, marginLeft: 15, marginRight: 15 },
  textfield: {
    marginBottom: 10,
    padding: 10,
    fontSize: 15,
    color: '#000000',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  buttonUpdate: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 10,
    backgroundColor: '#0de065',
  },
});

export default Detail;
