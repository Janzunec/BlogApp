import React, { useContext, useEffect, useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	useWindowDimensions,
	View,
} from 'react-native';
import AuthContext from '../Context/auth-context';
import NavBar from '../NavBar/NavBar';
import PostCard from './Cards/PostCard';

export default function Blog(props) {
	const dimensions = useWindowDimensions();

	const [postsData, setPostsData] = useState([...props.posts]);

	const authCtx = useContext(AuthContext);

	useEffect(() => {
		setPostsData(props.posts);
	}, [props.posts]);

	const editPostHandler = () => {
		const newPostsData = postsData;
		newPostsData.push({
			id: Math.random(),
			title: 'New Post',
			body: 'Breaking news, Russia attacks Ukraine',
			user: {
				username: 'Janzunec',
			},
		});
		setPostsData([...newPostsData]);
	};

	// Uporabi funkcionalnost deleteHandler-ja, da bos pridobil index clicked elementa in tako iz arraya postsData pridobil podatke o clicked postu
	// Nato ustvari formo ki bo delovala za editanje in dodajanje, obe bosta prejeli type kako bota uporabljeni (editanje: 'edit', nov: 'new')
	// Forma edit bo dobila podatke ki jih nastavi kot Value textInputa, uporabi pa funkcionalnost iz login komponente
	// V tej komponenti dodaj + button za novo ikono v enak View kot navBar, saj bo na sredini nad navbarom

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
