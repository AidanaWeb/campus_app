import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import Carousel from "@/components/Carousel";

import { banners } from "@/mock/banners";
import AppText from "@/components/AppText";
import Button from "@/components/Button";
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
  const filterButtons = [
    {
      id: 1,
      title: "Все",
      isActive: true,
    },
    {
      id: 2,
      title: "События",
    },
    {
      id: 3,
      title: "Новости",
    },
    {
      id: 4,
      title: "Подписки",
    },
  ];

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

      <FlatList
        data={filterButtons}
        renderItem={({ item }) => (
          <Button title={item.title} isActive={item.isActive} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginLeft: 20,
          marginTop: 10,
        }}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    gap: 10,
    marginTop: 10,
  },
});
