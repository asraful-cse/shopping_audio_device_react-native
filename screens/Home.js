import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
// import { StatusBar } from "expo-status-bar";
import { COLOURS, Items } from "../components/database/Database";

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);
  const [accessory, setAccessory] = useState([]);

  useEffect(() => {
    const unsubcribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });
    return unsubcribe;
  }, [navigation]);
  //   get data from DB-----------------------------------------------

  const getDataFromDB = () => {
    let productList = [];
    let accessoryList = [];
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].category == "product") {
        productList.push(Items[index]);
      } else if (Items[index].category == "accessory") {
        accessoryList.push(Items[index]);
      }
    }
    setProducts(productList);
    setAccessory(accessoryList);
  };

  // create am product reusable---- <Text>{data.productName}</Text>;
  const ProductCard = ({ data }) => {
    return (
   
      <TouchableOpacity

      onPress={()=>navigation.navigate('ProductInfo', {productID:data.id})}
        style={{
          width: "48%",
          marginVertical: 14,
          backgroundColor: COLOURS.lightYellow,
          borderRadius: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 100,
            borderRadius: 10,
            backgroundColor: COLOURS.lightGreen,
            justifyContent: "center",
            position: "relative",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          {data.isOff ? (
            <View
              style={{
                position: "absolute",
                width: "20%",
                height: "24%",
                backgroundColor: COLOURS.green,
                top: 0,
                left: 0,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.white,
                  fontWeight: "bold",
                  letterSpacing: 1,
                }}
              >
                {data.offPercentage} %
              </Text>
            </View>
          ) : null}

          <Image
            source={data.productImage}
            style={{
              width: "80%",
              height: "80%",
              resizeMode: "contain",
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 12,
            color: COLOURS.black,
            fontWeight: "600",
            marginBottom: 2,
            marginLeft: 5,
          }}
        >
          {data.productName}
        </Text>

        {data.category == "accessory" ? (
          data.isAvailable ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome
                name="circle"
                style={{ color: COLOURS.green, marginRight: 6, marginLeft: 5 }}
              />
              <Text
                style={{ fontSize: 12, color: COLOURS.green, marginLeft: 5 }}
              >
                Available
              </Text>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome
                name="circle"
                style={{ color:'red', marginRight: 6, marginLeft: 5 }}
              />
              <Text
                style={{ fontSize: 12, color: 'red', marginLeft: 5 }}
              >
                Unvailable
              </Text>
            </View>
          )
        ) : null}

        <Text
          style={{
            color: COLOURS.black,
            opacity: 0.6,
            fontSize: 15,
            marginLeft: 5,
            marginBottom: 4,
          }}
        >
          &#x09F3; {data.productPrice}
        </Text>
      </TouchableOpacity>


    );

  };

  return (
    <View
      style={{ width: "100%", height: "100%", backgroundColor: COLOURS.white }}
      barStyle="dark-content"
    >
      <StatusBar style={{ backgroundColor: COLOURS.white }}></StatusBar>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 16,
          }}
        >
          {/* navbar icon touchble create------------------ */}
          <TouchableOpacity>
            <Entypo
              name="shopping-bag"
              style={{
                fontSize: 18,
                borderRadius: 10,
                padding: 12,
                color: COLOURS.white,
                backgroundColor: COLOURS.backgroundLight,
              }}
            ></Entypo>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={()=> navigation.navigate('MyCart')}>
            <MaterialCommunityIcons
              name="cart"
              style={{
                fontSize: 18,
                borderRadius: 10,
                padding: 12,
                norderWidth: 1,
                color: COLOURS.white,
                backgroundColor: COLOURS.backgroundLight,
              }}
            ></MaterialCommunityIcons>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 10, padding: 16 }}>
          <Text
            style={{
              fontSize: 26,
              color: COLOURS.black,
              fontWeight: "500",
              letterSpacing: 1,
              marginBottom: 10,
            }}
          >
            HI-Fi shop &amp; Service
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: "400",
              letterSpacing: 1,
              lineHeight: 24,
            }}
          >
            Audio shop on rustaveli ave 40. {"\n"} This shop offers both
            products and services
          </Text>
        </View>

        {/* for product-------------------------- */}
        <View
          style={{
            padding: 16,
          }}
        >
          <View
            style={{
              // padding: 16,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  letterSpacing: 1,
                  color: COLOURS.black,
                }}
              >
                Products
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  marginLeft: 10,
                  color: COLOURS.black,
                  opacity: 0.5,
                }}
              >
                41
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: "400",
              }}
            >
              seeAll
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {products.map((data) => {
              return <ProductCard data={data} key={data.id} />;
            })}
          </View>
        </View>

        {/* for accessories ---------------design and data */}

        <View
          style={{
            padding: 16,
          }}
        >
          <View
            style={{
              // padding: 16,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  letterSpacing: 1,
                  color: COLOURS.black,
                }}
              >
                Accessories
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  marginLeft: 10,
                  color: COLOURS.black,
                  opacity: 0.5,
                }}
              >
                76
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: "400",
              }}
            >
              seeAll
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {accessory.map((data) => {
              return <ProductCard data={data} key={data.id} />;
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


