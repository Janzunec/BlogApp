import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link, NativeRouter } from 'react-router-native';

export default function NavBar() {
	return (
		<View style={styles}>
			<Link to='/'>
				<View>
					<Text>Posts</Text>
				</View>
			</Link>
			<Link to='/about'>
				<View>
					<Text>About</Text>
				</View>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	navigation: {
		width: '100%',
		height: 50,
		position: 'absolute',
		bottom: 0,
		left: 0,
		display: 'flex',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		flexDirection: 'row',
	},
});
