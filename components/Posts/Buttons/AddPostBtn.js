import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import { Icon } from 'react-native-elements';
import AuthContext from '../../Context/auth-context';

export default function AddPostBtn(props) {
	const authCtx = useContext(AuthContext);
	return (
		<Link
			to={authCtx.isLoggedIn === true ? '/posts/form' : '/login'}
			state={{
				type: 'add',
				addPost: props.addPostHandler,
			}}
			style={styles.plus}
		>
			<Icon
				name='plus'
				type='font-awesome'
				color='#fff'
				style={{
					width: 25,
					height: 25,
					padding: 0,
					margin: 0,
				}}
			/>
		</Link>
	);
}

const styles = StyleSheet.create({
	plus: {
		height: 45,
		width: 45,
		backgroundColor: '#444a',
		borderRadius: 50,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 0,
		zIndex: 40,
	},
});
