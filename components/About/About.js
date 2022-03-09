import {
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
	Linking,
	Image,
} from 'react-native';
import React from 'react';
import NavBar from '../NavBar/NavBar';

export default function About() {
	const openLink = () => {
		Linking.openURL('https://covstats-19.pages.dev');
	};

	const dimensions = useWindowDimensions();

	return (
		<View
			style={[
				styles.about,
				{
					height: dimensions.height,
				},
			]}
		>
			<Image
				source={require('../../assets/covid-19-statistics.jpg')}
				style={styles.aboutImage}
			/>
			<Text style={styles.aboutText}>
				Za najnovejše statistike in podatke o Covid-19 za cel svet
				poglejte na moji najnovejši spletni aplikaciji{' '}
				<Text onPress={openLink} style={styles.aboutLink}>
					Covstats-19
				</Text>
			</Text>

			<View style={styles.navigation}>
				<NavBar />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	about: {
		width: '100%',
		paddingTop: 30,
		position: 'relative',
	},
	aboutText: {
		color: 'white',
		fontSize: 30,
		paddingHorizontal: 10,
	},
	aboutLink: {
		color: '#0ff',
		textDecorationLine: 'underline',
	},
	aboutImage: {
		width: '100%',
		height: 300,
		marginBottom: 20,
	},
	navigation: {
		position: 'absolute',
		bottom: 0,
		left: 0,
	},
});
