import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet,
	Text,
	View,
	Linking,
	Touchable,
	TouchableOpacity,
} from 'react-native';

export default function App() {
	const openLink = () => {
		Linking.openURL('https://covstats-19.pages.dev');
	};

	return (
		<View style={styles.container}>
			<Text style={styles.mainText}>
				For latest covid-19 statistics look on{' '}
			</Text>
			<TouchableOpacity onPress={openLink}>
				<Text>Covstats-19</Text>
			</TouchableOpacity>
			<StatusBar style='auto' />
		</View>
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
	mainText: {
		color: 'white',
		fontSize: 30,
	},
});
