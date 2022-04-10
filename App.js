import React, { useEffect, useState } from 'react';
import {
	Image,
	StyleSheet,
	View,
	StatusBar,
	useColorScheme,
} from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import About from './components/About/About';
import { AuthContextProvider } from './components/Context/auth-context';
import Login from './components/Login/Login';
import Form from './components/Posts/Form/Form';
import PostDetails from './components/Posts/PostDetails';
import Posts from './components/Posts/Posts';

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

export default function App() {
	const colorScheme = useColorScheme();

	StatusBar.setBarStyle(STYLES[0], true);
	StatusBar.setBackgroundColor('#333');

	if (colorScheme === 'light') StatusBar.setBackgroundColor('#000', true);
	if (colorScheme === 'dark') StatusBar.setBackgroundColor('#fff', true);
	if (colorScheme === 'dark') StatusBar.setBarStyle(STYLES[1], true);
	if (colorScheme === 'light') StatusBar.setBarStyle(STYLES[2], true);

	return (
		<AuthContextProvider>
			<StatusBar animated={true} showHideTransition={'fade'} />
			<NativeRouter>
				<View style={styles.container}>
					<Routes>
						<Route path='/' element={<Posts />} />
						<Route path='/about' element={<About />} />
						<Route
							path='/posts/details'
							element={<PostDetails />}
						/>
						<Route path='/login' element={<Login />} />
						<Route path='/posts/form' element={<Form />} />
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
