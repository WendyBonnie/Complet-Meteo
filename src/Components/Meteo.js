import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Location from "expo-location";

function Meteo({ navigation }) {
  const [ville, setVille] = useState("Nice");
  const [forecast, setForecast] = useState();
  const [fiveDays, setFiveDays] = useState([]);

  //localisation
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchWeather = () => {
    const options = {
      method: "GET",
    };
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        ville +
        "&appid=bdb97645ce611289c0abb8c3f467c2ce",
      options
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          const meteo = responseObject;

          setForecast(meteo);
        },

        (error) => {
          console.log(error);
        }
      );
  };

  const fetchWeatherFiveDays = () => {
    const options = {
      method: "GET",
    };
    fetch(
      "api.openweathermap.org/data/2.5/forecast?q=" +
        ville +
        "&appid=80a5822fa4ea8332c131e2c4dada342a",
      options
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          const fiveDays = responseObject;

          setFiveDays(fiveDays);
          console.log(fiveDays);
        },

        (error) => {
          console.log(error);
        }
      );
  };

  const refreshMe = () => {
    changeVille();
    fetchWeather();
  };

  const changeVille = async () => {
    setVille(await AsyncStorage.getItem("ville"));
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    console.log(ville);
  }, [ville]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    console.log("location", location);
  }, []);

  useEffect(() => {
    console.log("locationGood", location);
  }, [location]);

  let text = "Waiting..";
  let text2 = "";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location.coords.longitude);
    text2 = JSON.stringify(location.coords.latitude);
  }
  useEffect(() => {
    console.log("fiiiiveé", fiveDays);
  }, [fiveDays]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 33,
            textAlign: "center",
            color: "black",
            marginTop: 20,
            color: "white",
          }}>
          METEO DAY
        </Text>

        <Text
          style={{
            marginBottom: 50,
            textAlign: "center",
            color: "white",
            fontSize: 20,
          }}>
          {ville}
        </Text>
        <Text style={{ fontSize: 20, color: "white", textAlign: "center" }}>
          {moment().format("LLLL")}
        </Text>
        <View style={{ flexDirection: "row", flex: 1, marginTop: 20 }}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image
              style={{ width: 100, height: 50, marginTop: 10 }}
              source={{
                uri:
                  "http://openweathermap.org/img/wn/" +
                  forecast?.weather[0]?.icon +
                  ".png",
              }}
            />
          </View>
          <Text style={{ color: "white" }}>
            {" "}
            {forecast?.weather[0]?.description}
          </Text>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: "white", fontSize: 20 }}>
              {parseFloat(forecast?.main?.temp - 273.15).toFixed(2)}°C
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ color: "white" }}>
            Vitesse du vent: {forecast?.wind?.speed}
          </Text>
          <Text style={{ color: "white" }}>
            Température Actuelle :
            {parseFloat(forecast?.main?.temp - 273.15).toFixed(2)} °C
          </Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "white" }}>longitude : {text}</Text>
          <Text style={{ color: "white" }}> latitude : {text2}</Text>
        </View>

        <View style={styles.refreshView}>
          <TouchableOpacity style={styles.ButtonRefresh} onPress={refreshMe}>
            <Text style={{ textAlign: "center" }}>refresh me</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.ButtonRefresh}
            onPress={() => navigation.navigate("FiveDays")}>
            <Text style={{ textAlign: "center" }}>fiveDays</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Meteo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E90FF",
    alignItems: "center",
    justifyContent: "center",
  },
  refreshView: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
  },
  ButtonRefresh: {
    backgroundColor: "pink",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 40,
    marginTop: 20,
  },
});
