import { LogBox, StyleSheet, Text, View } from "react-native";
import StackNavigator from "./StackNavigator";
import { Provider } from "react-redux";
// import store from "./redux/store";

import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackNavigator />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
