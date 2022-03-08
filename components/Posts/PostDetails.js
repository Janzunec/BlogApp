import {
	StyleSheet,
	Text,
	View,
	Image,
	useWindowDimensions,
	ScrollView,
} from 'react-native';
import React from 'react';
import { useLocation } from 'react-router-native';
import HomeBtn from './Buttons/HomeBtn';

export default function PostDetails() {
	const dimensions = useWindowDimensions();

	let imageHeight = dimensions.height / 4;
	let detailsHeight = dimensions.height - imageHeight - 500;
	const imageWidth = dimensions.width;

	const location = useLocation();
	const { image, title, body, user } = location.state;

	return (
		<View style={styles.postDeatails}>
			<Image
				source={image}
				style={{
					height: imageHeight,
					width: imageWidth,
				}}
			/>
			<ScrollView
				style={[
					{
						height: detailsHeight,
						width: '100%',
					},
				]}
			>
				<Text>{title}</Text>
				<Text>{body}</Text>
			</ScrollView>
			<View style={styles.homeBtn}>
				<HomeBtn />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	postDeatails: {
		height: '100%',
		width: '100%',
		overflow: 'hidden',
	},
	homeBtn: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
