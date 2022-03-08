import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link, NativeRouter } from 'react-router-native';
import { Icon } from 'react-native-elements';

export default function NavBar() {
	return (
		<View style={styles.navigation}>
			<Link to='/'>
				<View style={styles.link}>
					<Icon
						// raised
						name='info'
						type='font-awesome'
						color='#0ff'
						style={styles.linkIcon}
					/>
					<Text style={styles.linkText}>Posts</Text>
				</View>
			</Link>
			<Link to='/about'>
				<View style={styles.link}>
					<Icon
						// raised
						name='blogger-b'
						type='font-awesome-5'
						color='#0ff'
						style={styles.linkIcon}
					/>
					<Text style={styles.linkText}>About</Text>
				</View>
			</Link>
		</View>
	);
}

const styles = StyleSheet.create({
	navigation: {
		width: '100%',
		height: 50,
		display: 'flex',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: '#161B23',
		borderBottomWidth: 1,
		borderBottomColor: '#333',
		// borderWidth: 4,
	},
	link: {
		width: 'auto',
		height: 'auto',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	linkIcon: {
		height: 23,
		width: 23,
	},
	linkText: {
		color: '#00ffff',
		fontSize: 23,
		marginLeft: 7,
	},
});
