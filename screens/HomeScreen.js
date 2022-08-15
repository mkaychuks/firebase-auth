import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { collection, addDoc } from "firebase/firestore";

// local imports
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";

const HomeScreen = ({ navigation }) => {
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState("");
  const [owner, setOwner] = useState(auth.currentUser?.email);

  // handle signing user out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => alert(err.message));
  };

  // adding something to the database
  const addToDB = async () => {
    try {
      const docRef = await addDoc(collection(db, "details"), {
        surname: { surname },
        address: { address },
        owner: { owner },
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setAddress("");
    setSurname("");
  };

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>

      <View style={{ width: "75%", marginTop: 10 }}>
        <TextInput
          placeholder="surname"
          mode="outlined"
          activeOutlineColor="white"
          outlineColor="white"
          value={surname}
          onChangeText={(text) => setSurname(text)}
        />
        <TextInput
          placeholder="address"
          mode="outlined"
          activeOutlineColor="white"
          outlineColor="white"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Button onPress={addToDB} mode="outlined" style={{ marginTop: 15 }}>
          Submit
        </Button>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782f9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
