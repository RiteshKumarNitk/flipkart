import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import Home from './app/Screens/HomeScreen/Home';
import './global.css';
import { SafeAreaView } from "react-native-safe-area-context";



export default function App() {
  return (
    <SafeAreaView className="bg-blue-500">
      <Text className="text-green-300">Hello, World! xxx</Text>
      <Text className="text-green-300">Hello, World! xxx</Text>
      <Home />
      <Home />
      <Home />
      <Home />
    </SafeAreaView>
  );
}

