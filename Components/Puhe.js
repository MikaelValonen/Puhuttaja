import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, TextInput, Alert } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [Puhuttava, setPuhuttava] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    checkIsSpeaking();
  }, []);

  const checkIsSpeaking = async () => {
    const speakingStatus = await Speech.isSpeakingAsync();
    setIsSpeaking(speakingStatus); //tesatataan jos ääni kuuluu
  };
  const speak = async () => {
    Speech.speak(Puhuttava);
    setTimeout(checkIsSpeaking, 1000); // antaa aikaa puheen tapahtua testejä varten
  };
  const handleSpeakButtonPress = () => {
    if (!isSpeaking) { // yritetään korjata kaikkea, testataan hiljaisuudella
      speak();
    } else {
      Alert.alert('Speech in Progress', 'Please wait for the current speech to finish.'); //pitäisi estää napin spämmin, mutta ei toimi, mahdollisesti liittyen äänen puutteeseen
    }
  };
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={(text) => setPuhuttava(text)} value={Puhuttava} placeholder="Hello World" />
      <Button title="Press to hear the given text" onPress={handleSpeakButtonPress} />
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