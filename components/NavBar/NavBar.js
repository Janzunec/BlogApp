import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link, NativeRouter } from 'react-router-native';

export default function NavBar() {
	return (
		<View>
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

const styles = StyleSheet.create({});
