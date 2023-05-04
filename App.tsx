import { SafeAreaView, StatusBar } from "react-native";
import Home from "./views/Home";
import ImageDetectorView from "./views/ImageDetectorView";

function App(): JSX.Element {

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'white'}
      />
      < Home />
    </SafeAreaView>
  );
}

export default App;
