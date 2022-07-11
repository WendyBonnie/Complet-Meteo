import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Settings() {
  const handleInputVille = async (e) => {
    await AsyncStorage.setItem("ville", e);
  };

  const addVille = async () => {
    console.log(await AsyncStorage.getItem("ville"));
    Alert.alert(
      "Changement de ville",
      "Vous avez choisi " + (await AsyncStorage.getItem("ville"))
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          marginTop: 30,
          justifyContent: "center",
          alignContent: "center",
        }}>
        <Text style={styles.text}>Choisissez votre ville</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleInputVille}
          placeholder="votre ville"
        />
        <TouchableOpacity style={styles.ButtonValide} onPress={addVille}>
          <Text style={{ textAlign: "center" }}>Valider</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E90FF",
  },

  text: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    borderColor: "white",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 70,
  },
  ButtonValide: {
    backgroundColor: "pink",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 90,
  },
});
