import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import About from './components/About/About';
import { AuthContextProvider } from './components/Context/auth-context';
import Login from './components/Login/Login';
import PostDetails from './components/Posts/PostDetails';
import Posts from './components/Posts/Posts';

export default function App() {
	const [data, setData] = useState([]);

	useEffect(async () => {
		const resp = await fetch('https://graphqlzero.almansi.me/api', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				query: `{posts {data {id, title, body, user{id ,name, username, email}}}}`,
			}),
		});
		const fetchedData = await resp.json().then((res) => res);

		const sortedData = fetchedData.data.posts.data.map((post) => {
			return post;
		});
		setData(sortedData);
	}, []);

	return (
		<AuthContextProvider>
			<NativeRouter>
				<View style={styles.container}>
					<Routes>
						<Route path='/' element={<Posts posts={data} />} />
						<Route path='/about' element={<About />} />
						<Route
							path='/posts/details'
							element={<PostDetails />}
						/>
						<Route path='/login' element={<Login />} />
					</Routes>
				</View>
			</NativeRouter>
		</AuthContextProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#161B23',
		color: '#fff',
		width: '100%',
	},
});
