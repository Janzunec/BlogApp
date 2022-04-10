import React, { useContext, useEffect, useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native';
import { useNavigate } from 'react-router-native';
import AuthContext from '../Context/auth-context';
import NavBar from '../NavBar/NavBar';
import AddPostBtn from './Buttons/AddPostBtn';
import PostCard from './Cards/PostCard';

export default function Blog(props) {
	const dimensions = useWindowDimensions();

	const [postsData, setPostsData] = useState([...props.posts]);

	const authCtx = useContext(AuthContext);

	const navigate = useNavigate();

	useEffect(() => {
		let isMounted = true;
		if (isMounted) setPostsData(props.posts);
	}, [props.posts]);

	const addPostHandler = (data) => {
		const checkPostId = (post) => {
			return post.id === data.id;
		};

		const newPostsData = postsData;
		const postIndex = newPostsData.findIndex(checkPostId);

		if (postIndex === -1) {
			newPostsData.unshift(data);
		} else {
			newPostsData.splice(postIndex, 1, data);
		}
		setPostsData(newPostsData);
	};

	const editPostHandler = (id) => {
		const checkPostId = (post) => {
			return post.id === id;
		};

		const postIndex = postsData.findIndex(checkPostId);
		const clickedPostData = postsData[postIndex];

		navigate('/posts/form', {
			state: {
				data: clickedPostData,
				type: 'edit',
				addPost: addPostHandler,
			},
		});
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
				paddingTop: dimensions.width > 1100 ? 50 : 30,
			}}
		>
			<Text style={styles.title}>BLOG - POSTS</Text>

			{dimensions.width < 1100 && (
				<ScrollView
					style={[
						styles.postsContainer,
						{
							height: dimensions.height,
							marginBottom: 50,
						},
					]}
				>
					{postsData.map((post) => (
						<PostCard
							key={post.post_ID}
							id={post.post_ID}
							title={post.title}
							body={post.body}
							image={post.image}
							deleteHandler={deletePostHandler}
							editHandler={editPostHandler}
						/>
					))}
				</ScrollView>
			)}

			{/* Različna elementa sta z razlogom da sezna izgleda dobro tudi na računalniku in večjih dimenzijah */}

			{dimensions.width > 1100 && (
				<View
					style={[
						styles.postsContainer,
						styles.computerPostContainer,
					]}
				>
					{postsData.map((post) => (
						<PostCard
							key={post.post_ID}
							id={post.post_ID}
							title={post.title}
							body={post.body}
							image={post.image}
							deleteHandler={deletePostHandler}
							editHandler={editPostHandler}
						/>
					))}
				</View>
			)}
			<View
				style={[
					dimensions.width > 1100
						? styles.addPostBtnComputer
						: styles.addPostBtn,
				]}
			>
				<AddPostBtn addPostHandler={addPostHandler} />
			</View>
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
	addPostBtn: {
		width: '100%',
		position: 'absolute',
		left: 0,
		zIndex: 30,
		display: 'flex',
		alignItems: 'center',
		bottom: 60,
	},
	addPostBtnComputer: {
		// width: 'auto',
		position: 'absolute',
		zIndex: 30,
		bottom: 60,
		left: '47%',
		// right: '45%',
		marginHorizontal: 'auto',
	},
});
