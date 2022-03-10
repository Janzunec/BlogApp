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
			<Text style={styles.aboutText}>
				Ob izdelavi aplikacije sem se kljub omejenemu času zabaval in
				dokončal vse kot je bilo navedeno v navodilih naloge. Želel sem
				še dodati asyncStorage za hranjenje podatkov o logirani osebi,
				vendar se mi ni zdelo preveč potrebno. Lep pozdrav, Jan Žunec
			</Text>

			<View
				style={[
					styles.navigation,
					dimensions.width > 1100 ? { top: 0 } : { bottom: 0 },
				]}
			>
				<NavBar />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	about: {
		width: '100%',
		paddingTop: 40,
		position: 'relative',
	},
	aboutText: {
		color: 'white',
		fontSize: 25,
		paddingHorizontal: 10,
		marginVertical: 10,
	},
	aboutLink: {
		color: '#0ff',
		textDecorationLine: 'underline',
	},
	aboutImage: {
		width: '100%',
		height: 300,
	},
	navigation: {
		position: 'absolute',
		width: '100%',
		left: 0,
	},
});
