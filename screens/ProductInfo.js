import {
  View,
  Text,
  StatusBar,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Animated,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLOURS, Items } from "../components/database/Database";
import {
  Entypo,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProductInfo({ route, navigation }) {
  const { productID } = route.params;
  const [product, setProduct] = useState({});

  const width = Dimensions.get("window").width;

  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);

  useEffect(() => {
    const unsubcribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });
    return unsubcribe;
  }, [navigation]);

  // add to cart crate now----------------------------------
  const addToCart = async (id) => {
    let itemArray = await AsyncStorage.getItem("cartItems");
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "Item Added Successfully to cart",
          ToastAndroid.SHORT
        );
        navigation.navigate("Home");
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "Item Added Successfully to cart",
          ToastAndroid.SHORT
        );
        navigation.navigate("Home");
      } catch (error) {
        return error;
      }
    }
  };

  // get product data by productID----------
  const getDataFromDB = async () => {
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].id == productID) {
        await setProduct(Items[index]);
        return;
      }
    }
  };
  // console.log(product);

  // product horizontal scroll product card---------
  const renderProduct = ({ item, index }) => {
    return (
      <View
        style={{
          width: width,
          height: 168,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={item}
          style={{
            width: "45%",
            heigth: "45%",
            resizeMode: "contain",
          }}
        />
      </View>
    );
  };
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
        position: "relative",
      }}
    >
      <StatusBar
        backgroundColor={COLOURS.backgroundLight}
        barStyle="dark-content"
      />

      <ScrollView>
        <View
          style={{
            width: "100%",
            backgroundColor: COLOURS.lightGreen,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 16,
              paddingLeft: 16,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack('Home')}>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 22,
                  color: COLOURS.backgroundMedium,
                  padding: 12,
                  backgroundColor: COLOURS.backgroundLight,
                  borderRadius: 10,
                  marginBottom: 10,
                  marginTop: 16,
                }}
              />
            </TouchableOpacity>
          </View>
          {/* //  create image scrolling added------------start */}
          <FlatList
            data={product.productImageList ? product.productImageList : null}
            horizontal
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapTopInterval={width}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          />

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              marginTop: 32,
            }}
          >
            {product.productImageList
              ? product.productImageList.map((data, index) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: "clamp",
                  });
                  return (
                    <Animated.View
                      key={index}
                      style={{
                        width: "18%",
                        height: 2.7,
                        backgroundColor: COLOURS.green,
                        opacity,
                        marginHorizontal: 4,
                        borderRadius: 100,
                      }}
                    ></Animated.View>
                  );
                })
              : null}
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 6,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 14,
            }}
          >
            <Entypo
              name="shopping-cart"
              style={{
                fontSize: 22,
                color: COLOURS.blue,
                marginRight: 6,
                marginLeft: 5,
              }}
            />

            <Text
              style={{
                fontSize: 14,
                color: COLOURS.black,
              }}
            >
              Shopping
            </Text>
          </View>
          {/* for product name---------- */}
          <View
            style={{
              flexDirection: "row",
              marginVertical: 4,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
                letterSpacing: 0.5,
                color: COLOURS.black,
                maxWidth: "84%",
                marginLeft: 5,
              }}
            >
              {product.productName}
            </Text>
            <Ionicons
              name="link-outline"
              style={{
                fontSize: 24,
                color: COLOURS.blue,
                backgroundColor: COLOURS.blue + 10,
                padding: 8,
                borderRadius: 100,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 12,
              color: COLOURS.green,
              fontWeight: "400",
              opacity: 0.8,
              lineHeight: 20,
              maxWidth: "85%",
              maxHeight: 40,
              letterSpacing: 0.9,
              marginBottom: 18,
              marginLeft: 5,
            }}
          >
            {product.description}
          </Text>
          {/* location created---------------------- */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 14,
              borderBottomColor: COLOURS.backgroundLight,
              borderBottomWidth: 1,
              paddingBottom: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "80%",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  color: COLOURS.blue,
                  backgroundColor: COLOURS.backgroundLight,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 12,
                  borderRadius: 100,
                  marginRight: 10,
                  marginLeft: 5,
                }}
              >
                <Entypo
                  name="location-pin"
                  style={{
                    fontSize: 16,
                    color: COLOURS.green,
                  }}
                />
              </View>
              <Text>Uttara ave 21, {"\n"} road:#12, section: 1, Dhaka</Text>
            </View>
            {/* location to arrow button-------------- */}
            <Entypo
              name="chevron-right"
              style={{ fontSize: 22, color: COLOURS.backgraundDark }}
            />
          </View>
          {/* price-------- */}
          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{
                fonsize: 18,
                fontWeight: "500",
                maxWidth: "85%",
                color: COLOURS.black,
                marginBottom: 4,
              }}
            >
              &#x09F3; {product.productPrice}.00
            </Text>
            <Text>
              Tax Rate 2% ~ &#x09F3; {product.productPrice / 20} (&#x09F3;
              {product.productPrice + product.productPrice / 20})
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          height: "8%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => (product.isAvailable ? addToCart(product.id) : null)}
          style={{
            width: "86%",
            height: "90%",
            backgroundColor: COLOURS.blue,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              letterSpacing: 1,
              color: COLOURS.white,
              textTransform: "uppercase",
            }}
          >
            {product.isAvailable ? "Add to cart" : "Not Available"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
