import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";

// local imports
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in as", user.email);
      })
      .catch((error) => alert(error.message));
  };

  // firebase listener for login
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, [handleLogin]);

  // handle navigating to register screen
  const handleRegisterScreen = () => {
    navigation.navigate("Register");
  };

  // change the icon
  const changeIcon = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          mode={"outlined"}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          activeOutlineColor={"white"}
          outlineColor={"white"}
        />
        <TextInput
          placeholder="Password"
          value={password}
          mode={"outlined"}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          right={<TextInput.Icon name={showPassword ? "eye" : "eye-off"} onPress={changeIcon}/>}
          secureTextEntry={showPassword}
          activeOutlineColor={"white"}
          outlineColor={"white"}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRegisterScreen}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782f9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782f9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782f9",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
