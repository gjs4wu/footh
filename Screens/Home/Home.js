//
//  Home
//  CSSS Design-21.09.25
//
//  Created by [Author].
//  Copyright © 2018 [Company]. All rights reserved.
//

import React from "react"
import { Image, StyleSheet, Text, View, ScrollView, Button, TextInput } from "react-native"


export default class Home extends React.Component {



	
	static navigationOptions = ({ navigation }) => {
	
		const { params = {} } = navigation.state
		return {
				header: null,
				headerLeft: null,
				headerRight: null,
			}
	}

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	render() {
	
		return <View
				style={styles.homeView}>
				<View
					style={styles.searchgroupView}>

					<TextInput
							style={styles.rectangleView}
							//onChangeText={onChangeText0}
							//value={title0}
						/>
					<View
						style={{
							flex: 1,
						}}/>
					
					<Button title = "Search!"/>
					{/* <Image
						source={require("./../../assets/images/-icon-olor-2.png")}
						style={styles.iconСolorImage}/> */}
				</View>
				
				<ScrollView horizontal>
					<View
						style={styles.topnavbarView}>
						<Button title = "French"/>
						<Button title = "Mexican"/>
						<Button title = "German"/>
						<Button title = "Russian"/>
						<Button title = "Korean"/>
						<Button title = "Chinese"/>
						<Button title = "Italian"/>
						<Button title = "Japanese"/>
						
				
					</View>
				</ScrollView>
				
				<ScrollView>
				<View
					style={styles.contentView}>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							alignSelf: "center",
							justifyContent: "center",
							left: 0,
							right: 0,
							marginTop: 0,
							marginBottom: 20
						}}>
						<View
							style={styles.rectangle2View}>
							<Text
								style={styles.textFourText}>Kompot Drink{"\n"}Kompot is a fruit juice made by nearly every Russian and Ukrainian family. There are a gazillion ways to make it. It all depends on the fruit you have on hand. </Text>
						</View>
						<View
							style={styles.rectangle2View}>
							<Text
								style={styles.textFourText}>Apple Strudel{"\n"}Apple Strudel is a traditional pastry from the Austro-Hungarian Empire. The name is German, and the dish was made famous by the Viennese. </Text>
						</View>
						<View
							style={styles.rectangle2View}>
							<Text
								style={styles.textFourText}>Kung Pao chicken{"\n"}Kung pao chicken is a popular Chinese restaurant dish of stir-fried chicken, peanuts and vegetables. It’s traditionally made with specialty ingredients, like Sichuan peppercorns, Chinese black vinegar, Chinese rice wine, and whole dried red chilies. </Text>
						</View>
						<View
							style={styles.rectangle2View}>
							<Text
								style={styles.textFourText}>Kebab{"\n"}These kebabs start with the most flavorful marinade mixture made with richly flavored ingredients like Worcestershire, soy sauce and bright red wine vinegar. And of course a generous amount of marinating time really allows the flavors to soak right into the beef and also help tenderize it. </Text>
						</View>
						<View
							style={styles.rectangle2View}>
							<Text
								style={styles.textFourText}>California roll{"\n"}A California roll or California maki is a makizushi sushi roll that is usually rolled inside-out, and containing cucumber, crab or imitation crab, and avocado. Sometimes crab salad is substituted for the crab stick, and often the outer layer of rice in an inside-out roll (uramaki) is sprinkled with toasted sesame seeds or roe such as tobiko from flying fish. </Text>
						</View>

					</View>
				</View>
			    </ScrollView>


				<View
					style={{
						flex: 1,
					}}/>
				<View
					style={styles.navbarView}>
					<View
						pointerEvents="box-none"
						style={{
							position: "absolute",
							left: 0,
							right: 0,
							top: 13,
							height: 94,
						}}>
						{/* <View
							style={styles.barCopyView}/> */}
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 36,
								right: 45,
								top: 22,
								height: 60,
								flexDirection: "row",
								alignItems: "flex-start",
							}}>
							{/* <View
								style={styles.homegroupView}>
								<View
									pointerEvents="box-none"
									style={{
										height: 24,
									}}>
									<View
										style={styles.fill3View}/>
									<Image
										source={require("./../../assets/images/fill-4.png")}
										style={styles.fill4Image}/>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.homeText}>首页</Text>
							</View> */}
							{/* <Image
								source={require("./../../assets/images/mesgroup.png")}
								style={styles.mesgroupImage}/> */}
							<View
								style={{
									flex: 1,
								}}/>
							{/* <View
								style={styles.collgroupView}>
								<View
									pointerEvents="box-none"
									style={{
										height: 24,
									}}>
									<Image
										source={require("./../../assets/images/fill-3-2.png")}
										style={styles.fill3TwoImage}/>
									<Image
										source={require("./../../assets/images/fill-5.png")}
										style={styles.fill5TwoImage}/>
									<Image
										source={require("./../../assets/images/fill-7.png")}
										style={styles.fill7Image}/>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.collText}>收藏</Text>
							</View> */}
							{/* <View
								style={styles.setgroupView}>
								<Image
									source={require("./../../assets/images/fill-3.png")}
									style={styles.fill3Image}/>
								<Image
									source={require("./../../assets/images/fill-5-2.png")}
									style={styles.fill5Image}/>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.setText}>设置</Text>
							</View> */}
						</View>
					</View>
					{/* <View
						style={styles.plusView}>
						<Image
							source={require("./../../assets/images/plus-copy.png")}
							style={styles.plusCopyImage}/>
					</View> */}
				</View>
			</View>
	}
}

const styles = StyleSheet.create({
	homeView: {
		backgroundColor: "rgb(249, 250, 250)",
		flex: 1,
		alignItems: "center",
	},
	searchgroupView: {
		backgroundColor: "transparent",
		width: 337,
		height: 37,
		marginTop: 52,
		flexDirection: "row",
		alignItems: "center",
	},
	rectangleView: {
		backgroundColor: "white",
		borderRadius: 14,
		shadowColor: "rgba(79, 98, 192, 0.15)",
		shadowRadius: 20,
		shadowOpacity: 1,
		width: 278,
		height: 37,
	},
	iconСolorImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 34,
		height: 34,
	},
	topnavbarView: {
		backgroundColor: "transparent",
		width: 500,
		height: 40,
		marginTop: 2,
		marginRight: 130,
		flexDirection: "row",
		alignItems: "center",
	},
	sportText: {
		color: "rgb(32, 61, 186)",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	foodText: {
		backgroundColor: "transparent",
		color: "rgb(135, 133, 154)",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 63,
	},
	rentText: {
		backgroundColor: "transparent",
		color: "rgb(135, 133, 154)",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginRight: 86,
	},
	textText: {
		color: "rgb(135, 133, 154)",
		fontSize: 16,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 39,
	},
	contentView: {
		backgroundColor: "transparent",
		width: 365,
		height: 491,
		marginTop: 20,
		marginBottom: 360
	},
	rectangle4View: {
		backgroundColor: "white",
		borderRadius: 14,
		shadowColor: "rgba(79, 98, 192, 0.15)",
		shadowRadius: 20,
		shadowOpacity: 1,
		height: 147,
		marginLeft: 2,
		justifyContent: "center",
		alignItems: "center",
	},
	textTwoText: {
		backgroundColor: "transparent",
		color: "rgb(30, 30, 30)",
		fontSize: 15,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 25,
		width: 310,
	},
	rectangle2View: {
		backgroundColor: "white",
		borderRadius: 14,
		shadowColor: "rgba(79, 98, 192, 0.15)",
		shadowRadius: 20,
		shadowOpacity: 1,
		height: 147,
		marginRight: 2,
		marginBottom: -10,
		marginTop: 30,
		justifyContent: "center",
		alignItems: "center",
	},
	textFourText: {
		backgroundColor: "transparent",
		color: "rgb(30, 30, 30)",
		fontSize: 15,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 25,
		width: 310,
	},
	rectangle3View: {
		backgroundColor: "white",
		borderRadius: 14,
		shadowColor: "rgba(79, 98, 192, 0.15)",
		shadowRadius: 20,
		shadowOpacity: 1,
		height: 147,
		marginLeft: 4,
		justifyContent: "center",
		alignItems: "center",
	},
	textThreeText: {
		backgroundColor: "transparent",
		color: "rgb(30, 30, 30)",
		fontSize: 15,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "center",
		lineHeight: 25,
		width: 310,
	},
	navbarView: {
		backgroundColor: "transparent",
		alignSelf: "stretch",
		height: 107,
		marginRight: 1,
		marginBottom: 1,
	},
	barCopyView: {
		backgroundColor: "white",
		shadowColor: "rgba(155, 132, 135, 0.14)",
		shadowRadius: 20,
		shadowOpacity: 1,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 94,
	},
	homegroupView: {
		backgroundColor: "transparent",
		width: 22,
		height: 48,
	},
	fill3View: {
		backgroundColor: "rgb(35, 31, 32)",
		position: "absolute",
		left: 9,
		right: 8,
		top: 15,
		height: 8,
	},
	fill4Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 24,
	},
	homeText: {
		backgroundColor: "transparent",
		color: "rgb(135, 133, 154)",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	mesgroupImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 31,
		height: 46,
		marginLeft: 56,
	},
	collgroupView: {
		backgroundColor: "transparent",
		width: 24,
		height: 49,
		marginRight: 64,
	},
	fill3TwoImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		left: 0,
		right: 13,
		top: 7,
		height: 17,
	},
	fill5TwoImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		left: 1,
		right: 0,
		top: 0,
		height: 10,
	},
	fill7Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		position: "absolute",
		left: 13,
		right: 0,
		top: 7,
		height: 17,
	},
	collText: {
		backgroundColor: "transparent",
		color: "rgb(32, 61, 186)",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		marginLeft: 2,
	},
	setgroupView: {
		backgroundColor: "transparent",
		width: 22,
		height: 49,
	},
	fill3Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 11,
		marginLeft: 6,
		marginRight: 5,
	},
	fill5Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 11,
		marginLeft: 2,
		marginRight: 1,
		marginTop: 2,
	},
	setText: {
		backgroundColor: "transparent",
		color: "rgb(135, 133, 154)",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	plusView: {
		backgroundColor: "rgb(32, 61, 186)",
		borderRadius: 29,
		borderWidth: 3,
		borderColor: "rgb(230, 233, 255)",
		borderStyle: "solid",
		position: "absolute",
		alignSelf: "center",
		width: 58,
		top: 0,
		height: 58,
		justifyContent: "center",
		alignItems: "center",
	},
	plusCopyImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 17,
		height: 17,
	},
})
