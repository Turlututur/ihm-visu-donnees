import { StyleSheet } from "react-native";
import * as color from "./colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.mainColor,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  text: {
    color: color.textColor,
    fontSize: 20,
  },
  tinyText: {
    color: color.textColor,
  },
  tinyTextWhite: {
    color: color.mainColor,
  },
  link: {
    color: color.thirdColor,
    textDecorationLine: "underline",
  },
  label: {
    width: 70,
    color: color.textColor,
  },
  text_error: {
    color: "red",
  },
  text_input: {
    borderWidth: 1,
    backgroundColor: color.mainColor,
    color: color.textColor,
    margin: 15,
    height: 40,
    width: 300,
    borderRadius: 10,
    paddingLeft: 10,
  },
  pressable: {
    backgroundColor: color.thirdColor,
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    height: 40,
    width: 300,
    borderRadius: 10,
  },
  roundPressable: {
    backgroundColor: color.secondColor,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    height: 54,
    width: 54,
    borderRadius: 100,
  },
  plusButton: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 30,
  },
  refreshButton: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 90,
  },
  plusTouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
  refreshTouchableOpacityStyle: {
    position: "absolute",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 90,
  },
  floatingButtonStyle: {
    resizeMode: "contain",
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 5,
    height: 80,
    width: 350,
    marginBottom: 10,
  },
  text_item: {
    marginLeft: 5,
    width: 150,
    fontSize: 20,
    marginBottom: 20,
  },
});