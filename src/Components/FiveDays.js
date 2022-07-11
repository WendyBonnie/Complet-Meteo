import { requestForegroundPermissionsAsync } from "expo-location";
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
import { ScrollView } from "react-native-gesture-handler";

function FiveDays() {
  const [fiveDays, setFiveDays] = useState([]);

  const fetchWeatherFiveDays = () => {
    const options = {
      method: "GET",
    };
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=Nice&appid=bdb97645ce611289c0abb8c3f467c2ce",
      options
    )
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          const fiveDays = responseObject;

          setFiveDays(fiveDays.list);
          console.log("fivedaysssssssss", fiveDays);
        },

        (error) => {
          console.log(error);
        }
      );
  };

  const renderFiveDays = () => {
    return fiveDays.map((item, index) => {
      return (
        <View
          key={index}
          style={{
            marginRight: 2,
          }}>
          <Image
            style={{ width: 100, height: 50, marginTop: 10, marginBottom: 10 }}
            source={{
              uri:
                "http://openweathermap.org/img/wn/" +
                item.weather[0].icon +
                ".png",
            }}
          />
          <Text style={styles.center}>{item.weather[0].description}</Text>
          <Text style={styles.center}>
            {" "}
            min : {parseFloat(item.main.temp_min - 273.15).toFixed(2)}°c
          </Text>
          <Text style={styles.center}>
            {" "}
            max :{parseFloat(item.main.temp_max - 273.15).toFixed(2)}°c
          </Text>
          <Text style={{ fontSize: 10, textAlign: "center" }}>
            {item.dt_txt}
          </Text>
        </View>
      );
    });
  };

  useEffect(() => {
    fetchWeatherFiveDays();
  }, []);

  useEffect(() => {
    console.log("fiiiiveé", fiveDays);
  }, [fiveDays]);

  return (
    <View style={{ flex: 1, backgroundColor: "#1E90FF" }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 40, textAlign: "center", marginTop: 30 }}>
          Forecast 5 jours
        </Text>
      </View>
      <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 20 }}>
        {" "}
        Meteo heure par heure{" "}
      </Text>
      <ScrollView horizontal>{renderFiveDays()}</ScrollView>
      <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 20 }}>
        {" "}
        Meteo à 5 jours
      </Text>
      <ScrollView horizontal>
        <View style={styles.scroll}>
          <Image
            style={{ width: 100, height: 50, marginTop: 10 }}
            source={{
              uri:
                "http://openweathermap.org/img/wn/" +
                fiveDays[0]?.weather?.[0].icon +
                ".png",
            }}
          />
          <Text>{fiveDays[0]?.weather[0]?.description}</Text>
          <Text>{fiveDays[0]?.dt_txt}</Text>
        </View>
        <View style={styles.scroll}>
          <Image
            style={{ width: 100, height: 50, marginTop: 10 }}
            source={{
              uri:
                "http://openweathermap.org/img/wn/" +
                fiveDays[9]?.weather?.[0].icon +
                ".png",
            }}
          />
          <Text>{fiveDays[9]?.weather[0]?.description}</Text>
          <Text>{fiveDays[9]?.dt_txt}</Text>
        </View>
        <View style={styles.scroll}>
          <Image
            style={{ width: 100, height: 50, marginTop: 10 }}
            source={{
              uri:
                "http://openweathermap.org/img/wn/" +
                fiveDays[18]?.weather?.[0].icon +
                ".png",
            }}
          />
          <Text>{fiveDays[18]?.weather[0]?.description}</Text>
          <Text>{fiveDays[18]?.dt_txt}</Text>
        </View>
        <View style={styles.scroll}>
          <Image
            style={{ width: 100, height: 50, marginTop: 10 }}
            source={{
              uri:
                "http://openweathermap.org/img/wn/" +
                fiveDays[26]?.weather?.[0].icon +
                ".png",
            }}
          />
          <Text>{fiveDays[26]?.weather[0]?.description}</Text>
          <Text>{fiveDays[26]?.dt_txt}</Text>
        </View>
        <View style={styles.scroll}>
          <Image
            style={{ width: 100, height: 50, marginTop: 10 }}
            source={{
              uri:
                "http://openweathermap.org/img/wn/" +
                fiveDays[33]?.weather?.[0].icon +
                ".png",
            }}
          />
          <Text>{fiveDays[33]?.weather[0]?.description}</Text>
          <Text>{fiveDays[33]?.dt_txt}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default FiveDays;

const styles = StyleSheet.create({
  scroll: { marginRight: 15 },
  center: { textAlign: "center" },
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
  },
});
