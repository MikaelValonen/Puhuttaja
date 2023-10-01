import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function Ostoslista() {
  const [ostos, setOstos] = useState('');
  const [maara, setMaara] = useState('');
  const [data, setData] = useState([]);
  const db = SQLite.openDatabase('shoppingdb.db');
  
  useEffect(() => {
    db.transaction(tx => {
    tx.executeSql('create table if not exists shopping (id integer primary key not null, maara text, ostos text);');
    }, () => console.error("Error when creating DB"), updateList);
    }, []); 

  const buttonAdd = async () => {
    if(ostos == '' || maara == ''){
      setOstos('');
      setMaara(''); 
      return;}
    else {
      db.transaction(tx => {
      tx.executeSql('insert into shopping (maara, ostos) values (?, ?);',
      [maara, ostos]);
      }, null, updateList)
      }
      setOstos('');
      setMaara('');     
    }
    const deleteItem = (id) => {
      db.transaction(
      tx => tx.executeSql('delete from shopping where id = ?;', [id]), null, updateList)
      }
  const updateList = () => {
    db.transaction(tx => {
    tx.executeSql('select * from shopping;', [], (_, { rows }) =>
    setData(rows._array)
        );
      }, null, null);
    }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput style={styles.input} onChangeText={ostos => setOstos(ostos)} value={ostos.toString()}/>
      <TextInput style={styles.input} onChangeText={maara => setMaara(maara)} value={maara.toString()}/>
      <View style={styles.miniContainer}>
      <Button title='Add' style={styles.button} onPress={() => buttonAdd()}>Add</Button>
      </View>
      <View style={styles.container}>
      <Text>Shopping list</Text>
      <FlatList data={data} keyExtractor={item => item.id.toString()} renderItem={({item}) =>
      <View style={styles.miniContainer}>
      <Text>{item.ostos},{item.maara}</Text> 
      <Text style={{color: '#0000ff'}} onPress={() => deleteItem(item.id)}> bought </Text>
      </View> } />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 25,
    padding: 5,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniContainer: {
    width: 150,
    margin: 5,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    width: 150,
    color: 'blue',
    borderColor: 'gray',
    borderWidth: 1,
  },
});