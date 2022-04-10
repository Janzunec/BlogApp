import React, { useContext } from 'react';
import {
	Image,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Link } from 'react-router-native';
import AuthContext from '../../Context/auth-context';

const PostCard = (props) => {
	const dimensions = useWindowDimensions();

	// const postImage = require('../../../assets/test.png');

	const deleteHandler = () => {
		props.deleteHandler(props.id);
	};

	const editHandler = () => {
		props.editHandler(props.id);
	};

	const authCtx = useContext(AuthContext);

	return (
		<Link
			to='/posts/details'
			state={{
				id: props.id,
				editPost: editHandler,
				deletePost: deleteHandler,
			}}
			style={{
				width: dimensions.width > 1100 ? '30%' : '100%',
				height: dimensions.width > 1100 ? 420 : 'auto',
			}}
		>
			<View style={styles.post}>
				<Image
					source={{
						uri: props.image,
					}}
					style={styles.postImage}
				/>
				<View style={styles.postData}>
					<Text numberOfLines={2} style={styles.postTitle}>
						{props.title[0].toUpperCase() +
							props.title.substring(1)}
					</Text>
					<Text numberOfLines={3} style={styles.postBody}>
						{props.body[0].toUpperCase() +
							props.body.substring(1).replace(/(\s)/g, ' ')}
					</Text>
				</View>
				{/* <View style={styles.postButtons}>
 					<View style={[styles.postBtn, styles.editBtn]}>
 						{!authCtx.isLoggedIn && (
 							<Link to={'/login'} style={styles.btnIcon}>
 								<Icon
 									// raised
 									name='edit'
 									type='font-awesome'
 									color='#333'
 									style={styles.btnIcon}
 								/>
 							</Link>
 						)}
 						{authCtx.isLoggedIn && (
 							<Icon
 								// raised
 								name='edit'
 								type='font-awesome'
 								color='#333'
 								style={styles.btnIcon}
 								onPress={editHandler}
 							/>
 						)}
 					</View>
 					<View style={[styles.postBtn, styles.deleteBtn]}>
 						{!authCtx.isLoggedIn && (
 							<Link to='/login' style={styles.btnIcon}>
 								<Icon
 									// raised
 									name='trash'
 									type='font-awesome'
 									color='#a11'
 									style={styles.btnIcon}
 								/>
 							</Link>
 						)}
 						{authCtx.isLoggedIn && (
 							<Icon
 								// raised
 								name='trash'
 								type='font-awesome'
 								color='#a11'
 								style={styles.btnIcon}
 								onPress={deleteHandler}
 							/>
 						)}
 					</View>
 				</View> */}
			</View>
		</Link>
	);
};

const styles = StyleSheet.create({
	post: {
		flex: 1,
		flexDirection: 'column',
		height: 300,
		width: '100%',
		marginVertical: 10,
		backgroundColor: '#ddd',
		borderRadius: 5,
		position: 'relative',
	},
	postImage: {
		width: '100%',
		minHeight: 'auto',
		flex: 1,
		resizeMode: 'contain',
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		backgroundColor: '#111',
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
	// 	postButtons: {
	// 		position: 'absolute',
	// 		width: 'auto',
	// 		height: 15,
	// 		bottom: 0,
	// 		right: 0,
	// 	},
	// 	postBtn: {
	// 		position: 'absolute',
	// 		bottom: 10,
	// 		height: 40,
	// 		width: 40,
	// 		zIndex: 20,
	// 		backgroundColor: '#ccc',
	// 		display: 'flex',
	// 		alignItems: 'center',
	// 		justifyContent: 'center',
	// 		borderRadius: 50,
	// 		shadowColor: '#000',
	// 		shadowOffset: {
	// 			width: 2,
	// 			height: 2,
	// 		},
	// 		shadowOpacity: 0.25,
	// 		shadowRadius: 3.84,

	// 		elevation: 5,
	// 	},
	// 	editBtn: {
	// 		right: 60,
	// 	},
	// 	deleteBtn: {
	// 		right: 10,
	// 	},
	// 	btnIcon: {
	// 		height: 45,
	// 		width: 45,
	// 		zIndex: 10,
	// 		borderRadius: 50,
	// 		display: 'flex',
	// 		alignItems: 'center',
	// 		justifyContent: 'center',
	// 	},
});

export default React.memo(PostCard);
