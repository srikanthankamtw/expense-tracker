import { Alert, StyleSheet } from "react-native";
import AuthContent from "../../components/Auth/AuthContent";
import { useContext, useState } from "react";
import Loader from "../../components/UI/Loader";
import { loginUser } from "../../services/auth";
import { AuthContext } from "../../store/auth-context";

const LoginScreen = () => {
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserLogin = async ({ email, password }) => {
    setIsLoading(true);
    try {
      const response = await loginUser(email, password);
      const token = response.data.idToken;
      authCtx.authenticate(token);
    } catch {
      Alert.alert("Can't log you in! please check your creds.");
    }
    setIsLoading(false);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <AuthContent isLogin onAuthenticate={handleUserLogin} />
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
