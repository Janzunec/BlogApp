import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Link } from 'react-router-native';

export default function HomeBtn() {
	return (
		<Link to='/' style={styles.cross}>
			<Icon
				name='times'
				type='font-awesome'
				color={'#fff'}
				style={{ height: 28, width: 28, padding: 0, margin: 0 }}
			/>
		</Link>
	);
}

const styles = StyleSheet.create({
	cross: {
		height: 45,
		width: 45,
		backgroundColor: '#444a',
		borderRadius: 50,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 0,
	},
});
