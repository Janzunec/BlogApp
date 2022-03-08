import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'react-router-native';
import { Icon } from 'react-native-elements';

export default function HomeBtn() {
	return (
		<Link to='/' style={styles.cross}>
			<Icon
				name='times'
				type='font-awesome'
				color={'#fff'}
				style={{ height: 27, width: 27, padding: 0, margin: 0 }}
			/>
		</Link>
	);
}

const styles = StyleSheet.create({
	cross: {
		height: 40,
		width: 40,
		backgroundColor: '#444',
		borderRadius: 50,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 0,
	},
});
