import { View, ScrollView, TouchableOpacity, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLOURS, Items } from "../components/database/Database";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
export default function MyCart({ navigation }) {
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const unsubcribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });
    return unsubcribe;
  }, [navigation]);

  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem("cartItems");
    items = JSON.parse(items);
    let productData = [];
    if (items) {
      Items.forEach((data) => {
        if (items.includes(data.id)) {
          productData.push(data);
          return;
        }
      });
      setProduct(productData);
      getTotal(productData);
    } else {
      setProduct(false);
      getTotal(false);
    }
    const getTotal = (productData) => {
      let total = 0;
      for (let index = 0; index < productData.length; index++) {
        let productPrice = productData[index].productPrice;
        total = total + productPrice;
      }
      setTotal(total);
    };
  };
  // remove removeItemFromCart--------------
  const removeItemFromCart = async id => {
    let itemArray = await AsyncStorage.getItem("cartItems");
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      for (let index = 0; index < array.length; index++) {
        if (array[index] == id) {
          array.splice(index, 1);
        }
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        getDataFromDB();
      }
    }
  };

  const renderProducts = (data, index) => {
    return (
      <TouchableOpacity
      key={data.key}
        onPress={() =>
          navigation.navigate("ProductInfo", { productID: data.id })
        }
        style={{
          width: "100%",
          height: 100,
          marginVertical: 6,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "30%",
            height: 100,
            // marginVertical:6,
            // flexDirection:'row',
            justifyContent: "center",
            backgroundColor: COLOURS.backgroundLight,
            borderRadius: 10,
            marginRight: 22,
            // marginLeft: 5,
          }}
        >
          <Image
            source={data.productImage}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
            }}
          />
        </View>
        {/* product added product name */}
        <View
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "space-around",
          }}
        >
          <View style={{}}>
            <Text
              style={{
                fontSize: 14,
                maxWidth: "100%",
                color: COLOURS.black,
                fontWeight: "600",
                letterSpacing: 1,
              }}
            >
              {data.productName}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: "row",
                alignItems: "center",
                // opacity:0.4
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  maxWidth: "85%",
                  marginRight: 4,
                  color: COLOURS.black,
                  opacity: 0.6,
                }}
              >
                &#x09F3;{data.productPrice}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  maxWidth: "85%",
                  marginRight: 4,
                  color: COLOURS.black,
                  opacity: 0.6,
                }}
              >
                (~&#x09F3;
                {data.productPrice + data.productPrice / 20})
              </Text>
            </View>
          </View>
          {/* _ + added------------------------*/}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                // justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderRadius: 100,
                  marginRight: 20,
                  paaing: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundMedium,
                }}
              >
                <MaterialCommunityIcons
                  name="minus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgraundDark,
                  }}
                />
              </View>
              <Text>1</Text>
              <View
                style={{
                  borderRadius: 100,
                  marginLeft: 20,
                  paaing: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundMedium,
                }}
              >
                <MaterialCommunityIcons
                  name="plus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgraundDark,
                  }}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: COLOURS.backgraundDark,
                  backgroundColor: COLOURS.backgroundLight,
                  padding: 6,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
      }}
    >
      <ScrollView>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            paddingTop: 16,
            paddingHorizontal: 16,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              style={{
                fontSize: 24,
                color: COLOURS.white,
                padding: 12,
                backgroundColor: COLOURS.backgroundLight,
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 26,
              color: COLOURS.green,
              fontWeight: "400",
              marginTop: 6,
            }}
          >
            My Order Details
          </Text>
          <View></View>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: "gray",
            fontWeight: "500",
            letterSpacing: 1,
            paddingTop: 20,
            paddingLeft: 16,
            marginBottom: 10,
          }}
        >
          My Cart
        </Text>
        <View
          style={{
            paddingHorizontal: 16,
          }}
        >
          {product ? product.map(renderProducts) : null}
        </View>
      </ScrollView>
    </View>
  );
}
