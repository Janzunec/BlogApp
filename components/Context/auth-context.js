import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext({
	user: '',
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (username) => {},
});

export const AuthContextProvider = (props) => {
	// const storeData = async (value) => {
	// 	try {
	// 		await AsyncStorage.setItem('isLoggedIn', value);
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// };

	// const getData = async () => {
	// 	try {
	// 		const value = await AsyncStorage.getItem('isLoggedIn');
	// 		if (value !== null) {
	// 			return value;
	// 		}
	// 		return false;
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// };

	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const [user, setUser] = useState('');

	const logoutHandler = () => {
		setIsLoggedIn(false);
		setUser('');
	};

	const loginHandler = (username) => {
		setIsLoggedIn(true);
		setUser(username);
	};

	// useEffect(async () => {
	// 	// const storedUserLoggedInInformation = getData();
	// 	const storedUserLoggedInInformation = false;
	// 	console.log(storedUserLoggedInInformation);

	// 	if (storedUserLoggedInInformation === true) {
	// 		setIsLoggedIn(true);
	// 	}
	// }, []);

	return (
		<AuthContext.Provider
			value={{
				user: user,
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
