import { StyleSheet, Text, View, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import Post from './Post/Post';

export default function Blog() {
	const [data, setData] = useState([]);

	useEffect(async () => {
		const resp = await fetch('https://graphqlzero.almansi.me/api', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				query: `{posts {data {id, title, body, user{id ,name, username}}}}`,
			}),
		});
		const fetchedData = resp.json().then((res) => console.log(res));

		console.log(fetchedData);

		// const sortedData = fetchedData.then(resp => )
		setData(fetchedData);
	}, []);

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
			<Post />
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
