import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (email, password) => {},
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

	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const logoutHandler = () => {
		AsyncStorage.removeItem('isLoggedIn');
		setIsLoggedIn(false);
	};

	const loginHandler = () => {
		storeData(true);
		setIsLoggedIn(true);
	};

	useEffect(async () => {
		// const storedUserLoggedInInformation = getData();
		const storedUserLoggedInInformation = false;
		console.log(storedUserLoggedInInformation);

		if (storedUserLoggedInInformation === true) {
			setIsLoggedIn(true);
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
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
