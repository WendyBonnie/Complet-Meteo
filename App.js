import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, Button } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Settings,
  Alert,
} from "react-native";
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

//mes imports pour ma nav
import Meteo from "./src/Components/Meteo";
import FiveDays from "./src/Components/FiveDays";
import Setting from "./src/Components/Setting";

import moment from "moment";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function App({ navigation }) {
  // Mettre la variable splaschreen à true pour toujours avoir le splash lorsque l'on allume l'app
  const [splashScreen, setSplashscreen] = useState(true);

  useEffect(() => {
    // set TimeOut permet d'afficher le slpashcreen pendant 2 sec et le set false ensuite
    setTimeout(() => setSplashscreen(false), 2000);
  }, []);

  if (splashScreen === true) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#1E90FF" }}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Image
            style={{ width: 155, height: 155 }}
            source={require("./assets/chat.png")}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Meteo") {
                iconName = focused ? "sunny" : "partly-sunny";
              } else if (route.name === "Settings") {
                iconName = "settings";
              } else if (route.name === "FiveDays") {
                iconName = focused ? "rainy" : "cloudy-night";
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}>
          <Tab.Screen
            name="Meteo"
            component={Meteo}
            options={{
              headerLeft: () => (
                <Ionicons
                  onPress={() => Alert.alert("fleche", "je suis une flèche")}
                  name="arrow-back"
                  size={30}
                />
              ),
            }}
          />
          <Tab.Screen name="Settings" component={Setting} />
          <Tab.Screen name="FiveDays" component={FiveDays} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E90FF",
    alignItems: "center",
    justifyContent: "center",
  },
});
