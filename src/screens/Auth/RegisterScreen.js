import { Alert, StyleSheet } from "react-native";
import AuthContent from "../../components/Auth/AuthContent";
import { useState } from "react";
import Loader from "../../components/UI/Loader";
import { registerUser } from "../../services/auth";

const RegisterScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUserRegister = async ({ email, password }) => {
    setIsLoading(true);
    try {
      await registerUser(email, password);
    } catch {
      Alert.alert("You are already a registred user! please log in. ");
    }
    setIsLoading(false);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <AuthContent onAuthenticate={handleUserRegister} />
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
