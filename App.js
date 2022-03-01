import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet,
	Text,
	View,
	Linking,
	Touchable,
	TouchableOpacity,
	Button,
} from 'react-native';
import Posts from './components/Posts/Posts';
import { NativeRouter, Routes, Route, Link } from 'react-router-native';
import About from './components/About/About';
import NavBar from './components/NavBar/NavBar';

export default function App() {
	return (
		<NativeRouter>
			<View style={styles.container}>
				<Routes>
					<Route path='/' element={<Posts />} />
					<Route path='/about' element={<About />} />
				</Routes>
			</View>
		</NativeRouter>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#333',
		alignItems: 'center',
		justifyContent: 'center',
		color: '#fff',
	},
});
