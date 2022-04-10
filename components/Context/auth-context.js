import React, { useState } from 'react';

const AuthContext = React.createContext({
	user: '',
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (username) => {},
});

export const AuthContextProvider = (props) => {
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
