import { StyleSheet, Text, View, Linking } from 'react-native';
import React from 'react';
import NavBar from '../NavBar/NavBar';

export default function Blog() {
	const openLink = () => {
		Linking.openURL('https://covstats-19.pages.dev');
	};
	return (
		<View>
			<Text style={styles.mainText}>
				For latest covid-19 statistics look on{' '}
				<Text onPress={openLink} style={styles.link}>
					Covstats-19
				</Text>
			</Text>
			<View>
				<NavBar />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mainText: {
		color: 'white',
		fontSize: 30,
	},
	link: {
		color: '#0ff',
		textDecorationLine: 'underline',
	},
});
