import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../config';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [addData, setAddData] = useState('');
  const navigation = useNavigation();

  // READ: ambil data realtime dari Firestore
  useEffect(() => {
    const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((d) => ({
          id: d.id,
          heading: d.data().heading,
        }));
        setTodos(list);
      },
      (error) => Alert.alert('Gagal memuat data', error.message)
    );
    return unsubscribe;
  }, []);

  // DELETE
  const deleteTodo = async (todo) => {
    try {
      await deleteDoc(doc(db, 'todos', todo.id));
      Alert.alert('Berhasil', 'Todo berhasil dihapus');
    } catch (error) {
      Alert.alert('Gagal menghapus', error.message);
    }
  };

  // CREATE
  const addTodo = async () => {
    if (addData && addData.trim().length > 0) {
      try {
        await addDoc(collection(db, 'todos'), {
          heading: addData.trim(),
          createdAt: serverTimestamp(),
        });
        setAddData('');
        Keyboard.dismiss();
      } catch (error) {
        Alert.alert('Gagal menambah', error.message);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <View style={styles.textHeadingContainer}>
        <Text style={styles.textHeading}>Todos App</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new todo"
          placeholderTextColor="#aaaaaa"
          onChangeText={setAddData}
          value={addData}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        numColumns={1}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('Detail', { item })}>
            <FontAwesome
              name="trash-o"
              color="red"
              onPress={() => deleteTodo(item)}
              style={styles.todoIcon}
            />
            <View style={styles.innerContainer}>
              <Text style={styles.itemHeading}>{item.heading}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHeadingContainer: { paddingVertical: 20, alignItems: 'center' },
  textHeading: { fontWeight: 'bold', fontSize: 24 },
  innerContainer: { alignItems: 'center', flexDirection: 'column', marginLeft: 45 },
  itemHeading: { fontWeight: 'bold', fontSize: 18, marginRight: 22 },
  formContainer: {
    flexDirection: 'row',
    height: 80,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 40,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingLeft: 16,
    flex: 1,
    marginRight: 5,
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#788eec',
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { color: 'white', fontSize: 20 },
  todoIcon: { marginTop: 5, fontSize: 20, marginLeft: 14 },
});

export default Home;
