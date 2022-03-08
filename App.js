import { StatusBar } from 'expo-status-bar';
import {
	StyleSheet,
	Text,
	View,
	Linking,
	Touchable,
	TouchableOpacity,
	Button,
	useWindowDimensions,
} from 'react-native';
import Posts from './components/Posts/Posts';
import { NativeRouter, Routes, Route, Link } from 'react-router-native';
import About from './components/About/About';
import NavBar from './components/NavBar/NavBar';
import React, { useEffect, useState } from 'react';
import PostDetails from './components/Posts/PostDetails';

export default function App() {
	const [data, setData] = useState([]);

	useEffect(async () => {
		const resp = await fetch('https://graphqlzero.almansi.me/api', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				query: `{posts {data {id, title, body, user{id ,name, username}}}}`,
			}),
		});
		const fetchedData = await resp.json().then((res) => res);

		const sortedData = fetchedData.data.posts.data.map((post) => {
			return post;
		});
		setData(sortedData);
	}, []);

	return (
		<NativeRouter>
			<View style={styles.container}>
				<Routes>
					<Route path='/' element={<Posts posts={data} />} />
					<Route path='/about' element={<About />} />
					<Route path='/posts/details' element={<PostDetails />} />
				</Routes>
			</View>
		</NativeRouter>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#161B23',
		color: '#fff',
		width: '100%',
		paddingVertical: 30,
	},
});
