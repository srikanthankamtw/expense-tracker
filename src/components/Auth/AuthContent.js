import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import FlatButton from "../UI/FlatButton.js";
import AuthForm from "./AuthForm";
import { GlobalStyles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

const AuthContent = ({ isLogin, onAuthenticate }) => {
  const navigation = useNavigation();
  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  const switchAuthModeHandler = () => {
    isLogin ? navigation.replace("Register") : navigation.replace("Login");
  };

  const submitHandler = (credentials) => {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  };

  return (
    <View style={styles(isLogin).authContent}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
      />
      <View style={styles.buttons}>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? "Create a new user" : "Log in instead"}
        </FlatButton>
      </View>
    </View>
  );
};

export default AuthContent;

const styles = (isLogin) =>
  StyleSheet.create({
    authContent: {
      marginTop: isLogin ? 200 : 120,
      marginHorizontal: 32,
      padding: 16,
      borderRadius: 8,
      backgroundColor: GlobalStyles.colors.primary800,
      elevation: 2,
      shadowColor: "black",
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.35,
      shadowRadius: 4,
    },
    buttons: {
      marginTop: 8,
    },
  });
