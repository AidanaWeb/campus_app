import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import Carousel from "@/components/Carousel";

import { banners } from "@/mock/banners";
import AppText from "@/components/AppText";
const { width } = Dimensions.get("window");

export default function TabOneScreen() {
  return (
    <FlatList
      ListHeaderComponent={<ListHeader />}
      data={[]}
      renderItem={({ item }) => <></>}
    />
  );
}

const ListHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <AppText
        size={38}
        type="title"
        style={{ fontWeight: "bold", marginLeft: 20 }}
      >
        Новости
      </AppText>

      <Carousel data={banners} />

      
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    gap: 20,
    marginTop: 10,
  },
});
