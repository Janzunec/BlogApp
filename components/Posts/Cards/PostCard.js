import React from 'react';
import {
	Image,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Link } from 'react-router-native';

export default function Post(props) {
	const dimensions = useWindowDimensions();

	const postImage = require('../../../assets/test.png');

	return (
		<Link
			to='/posts/details'
			state={{
				image: postImage,
				title: props.title,
				body: props.body,
				user: props.user,
			}}
			style={{
				width: dimensions.width > 1100 ? '40%' : '100%',
				minHeight: 'auto',
			}}
		>
			<View style={[styles.post]}>
				<Image source={postImage} style={styles.postImage} />
				<View style={styles.postData}>
					<Text numberOfLines={2} style={styles.postTitle}>
						{props.title[0].toUpperCase() +
							props.title.substring(1)}
					</Text>
					<Text numberOfLines={3} style={styles.postBody}>
						{props.body[0].toUpperCase() +
							props.body.substring(1).replace(/(\s)/g, ' ')}
					</Text>
					<Text style={styles.postUser}>{props.user.username}</Text>
				</View>
				<View style={styles.postButtons}>
					<View style={[styles.postBtn, styles.editBtn]}>
						<Icon
							// raised
							name='edit'
							type='font-awesome'
							color='#333'
							style={styles.btnIcon}
						/>
					</View>
					<View style={[styles.postBtn, styles.deleteBtn]}>
						<Icon
							// raised
							name='trash'
							type='font-awesome'
							color='#a11'
							style={styles.btnIcon}
						/>
					</View>
				</View>
			</View>
		</Link>
	);
}

const styles = StyleSheet.create({
	post: {
		flex: 1,
		flexDirection: 'column',
		minHeight: 'auto',
		width: '100%',
		marginVertical: 10,
		backgroundColor: '#ddd',
		borderRadius: 5,
		// padding: 20,
	},
	postImage: {
		width: '100%',
		height: 150,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
	},
	postData: {
		width: '100%',
		padding: 15,
	},
	postTitle: {
		color: '#5d02bc',
		fontSize: 20,
		fontWeight: '700',
		marginBottom: 10,
	},
	postBody: {
		color: '#000',
		fontSize: 15,
	},
	postUser: {
		marginTop: 15,
		height: 30,
		width: '60%',
		fontWeight: '700',
		fontSize: 15,
	},
	postButtons: {
		position: 'relative',
		height: 15,
	},
	postBtn: {
		position: 'absolute',
		bottom: 10,
		height: 40,
		width: 40,
		backgroundColor: '#ccc',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50,
		shadowColor: '#000',
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	editBtn: {
		right: 60,
	},
	deleteBtn: {
		right: 10,
	},
	btnIcon: {
		zIndex: 10,
	},
});
