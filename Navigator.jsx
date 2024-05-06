import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Plan from "./screens/Onboarding_Screens/Plan";
import { Appearance, StatusBar } from "react-native";
import { useTheme } from "@react-navigation/native";
import SignIn from "./screens/Registration/SignIn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogIn from "./screens/Registration/LogIn";
import Congrats from "./screens/Registration/Congrats";
import Home from "./screens/Home/Home";
// import CreateAccount from "./screens/Registration/CreateAccount";
// import ResetPassword from "./screens/Registration/ResetPassword";
// import Confirmation from "./screens/Registration/Confirmation";
// import NewPassword from "./screens/Registration/NewPassword";
// import Home from "./screens/Home/Home";
// import Profile from "./screens/Profile/Profile";
// import EditProfile from "./screens/Profile/EditProfile";
// import Tour from "./screens/Home/Tour";

const Navigator = () => {
  const Stack = createNativeStackNavigator();

  // Getting the device default color mode
  const [colorScheme, setColorScheme] = React.useState(
    Appearance.getColorScheme()
  );

  React.useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) =>
      setColorScheme(colorScheme)
    );
  }, []);

  const dark = {
    dark: true,
    colors: {
      primary: "green",
      background: "black",
      card: "black",
      text: "white",
      border: "blue",
      notification: "green",
      placeholder: "#959598",
      shadowColor: "#0094FF",
    },
  };
  const light = {
    dark: false,
    colors: {
      primary: "blue",
      background: "white",
      card: "green",
      text: "black",
      border: "blue",
      notification: "green",
      placeholder: "#959598",
      shadowColor: "#171717",
    },
  };
  //  Getting themes
  const { colors } = useTheme();

  const [firstLaunch, setFirstLaunch] = React.useState(null);
  React.useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem("appLaunched");
      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.setItem("appLaunched", "false");
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
  }, []);
  return (
    firstLaunch != null && (
      <NavigationContainer theme={colorScheme === "dark" ? dark : light}>
        <StatusBar animated={true} barStyle={colors.text} />
        <Stack.Navigator>
          {firstLaunch && (
            <Stack.Screen
              name="Plan"
              component={Plan}
              options={{ title: null, headerShown: false }}
            />
          )}

          <Stack.Screen
            name="LogIn"
            component={LogIn}
            options={{ title: null, headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ title: null, headerShown: false }}
          />
          <Stack.Screen
            name="Congrats"
            component={Congrats}
            options={{ title: null, headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: null, headerShown: false }}
          />
          {/* <Stack.Screen
            name="NewPassword"
            component={NewPassword}
            options={{ title: null, headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: null, headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ title: null, headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ title: null, headerShown: false }}
          />
          <Stack.Screen
            name="Tour"
            component={Tour}
            options={{ title: null, headerShown: false }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};

export default Navigator;
