import React, { useEffect, useState, useContext } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native';
import NavBar from '../NavBar/NavBar';
import PostCard from './Cards/PostCard';
import AuthContext from '../Context/auth-context';
import { Link } from 'react-router-native';

export default function Blog(props) {
	const dimensions = useWindowDimensions();

	const [postsData, setPostsData] = useState([...props.posts]);

	const authCtx = useContext(AuthContext);
	console.log(authCtx.isLoggedIn);

	useEffect(() => {
		setPostsData(props.posts);
	}, [props.posts]);

	const editPostHandler = () => {
		const newPostsData = postsData;
		newPostsData.push({
			id: 123,
			title: 'New Post',
			body: 'Breaking news, Russia attacks Ukraine',
			user: {
				username: 'Janzunec',
			},
		});
		setPostsData([...newPostsData]);
	};

	const deletePostHandler = (id) => {
		const checkPostId = (post) => {
			return post.id === id;
		};

		const newPostsData = postsData;
		const postIndex = newPostsData.findIndex(checkPostId);

		if (postIndex > -1) {
			newPostsData.splice(postIndex, 1);
		}

		setPostsData([...newPostsData]);
	};

	return (
		<View
			style={{
				height: dimensions.height,
				position: 'relative',
				paddingTop: 50,
			}}
		>
			<Text style={styles.title} onPress={editPostHandler}>
				BLOG - POSTS
			</Text>

			{dimensions.width < 1100 && (
				<ScrollView
					style={[
						styles.postsContainer,
						{
							height: dimensions.height - 90,
							marginBottom: 40,
						},
					]}
				>
					{postsData.map((post) => (
						<PostCard
							key={post.id}
							id={post.id}
							title={post.title}
							body={post.body}
							user={post.user}
							deleteHandler={deletePostHandler}
							editHandler={editPostHandler}
						/>
					))}
				</ScrollView>
			)}

			{dimensions.width > 1100 && (
				<View
					style={[
						styles.postsContainer,
						styles.computerPostContainer,
						// { width: dimensions.width - 20 },
					]}
				>
					{postsData.map((post) => (
						<PostCard
							key={post.id}
							id={post.id}
							title={post.title}
							body={post.body}
							user={post.user}
							deleteHandler={deletePostHandler}
							editHandler={editPostHandler}
						/>
					))}
				</View>
			)}
			<View
				style={[
					styles.navBar,
					dimensions.width > 1100 && styles.navBarComputer,
				]}
			>
				<NavBar />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	postsContainer: {
		width: '100%',
		paddingHorizontal: 15,
		display: 'flex',
		flexDirection: 'column',
		borderRadius: 5,
	},
	computerPostContainer: {
		height: 'auto',
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-evenly',
		borderRadius: 5,
		paddingHorizontal: 0,
		marginHorizontal: 'auto',
		backgroundColor: '#161B23',
	},
	title: {
		width: '100%',
		fontSize: 30,
		fontWeight: '700',
		color: '#5d02bc',
		textAlign: 'center',
	},
	navBar: {
		width: '100%',
		position: 'absolute',
		bottom: 0,
		left: 0,
		zIndex: 30,
	},
	navBarComputer: {
		top: 0,
		height: 30,
	},
});
