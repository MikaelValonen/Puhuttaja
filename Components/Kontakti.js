import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function Ostoslista() {
  const [data, setData] = useState([]);
  const [hasContactsPermission, setPermission] = useState(null);

  useEffect(() => {
    askContactsPermission();
  }, []);

  const askContactsPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    setPermission(status === 'granted');
  };

  const getContacts = async () => {
    if (hasContactsPermission) {
      const { data: contacts } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.FirstName, Contacts.Fields.LastName],
      });
      setData(contacts);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.miniContainer}>
        <Button title="getContacts" style={styles.button} onPress={() => getContacts()}>
        <Text>Get Contacts</Text>
        </Button>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.miniContainer}>
            <Text>{`${item.firstName} ${item.lastName}, ${item.phoneNumbers[0]?.number}`}</Text>
          </View>
        )}
      />
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
    width: 300,
    margin: 5,
    padding: 5,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    color: 'blue',
    borderColor: 'gray',
    borderWidth: 1,
  },
});