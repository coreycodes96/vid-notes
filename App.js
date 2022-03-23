import { useFonts } from 'expo-font';

import Screens from './src/components/Screens/Screens';

const App = () => {
  const [loaded] = useFonts({
    Mohave_VariableFont_wght: require('./assets/fonts/Mohave-VariableFont_wght.ttf'),
  });
  
  if (!loaded) {
    return null;
  }

  return (
    <Screens />
  );
}

export default App;