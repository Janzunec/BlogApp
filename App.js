import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import About from './components/About/About';
import { AuthContextProvider } from './components/Context/auth-context';
import Login from './components/Login/Login';
import Form from './components/Posts/Form/Form';
import PostDetails from './components/Posts/PostDetails';
import Posts from './components/Posts/Posts';

export default function App() {
	const [data, setData] = useState([]);
	useEffect(async () => {
		const resp = await fetch('http://localhost:3000/post/all', {
			method: 'GET',
		});
		const fetchedData = await resp
			.json()
			.then((res) => res)
			.catch((err) => {
				console.log(error);
			});

		setData(await fetchedData);
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
						<Route path='/posts/form' element={<Form />} />
						{/* <Image source={data[0].image} /> */}
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
