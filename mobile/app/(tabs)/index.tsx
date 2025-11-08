import { FlatList, StyleSheet, View } from "react-native";
import Carousel from "@/components/Carousel";
import AppText from "@/components/AppText";
import Button from "@/components/Button";
import Post from "@/components/Post";

import { posts } from "@/mock/posts";
import { banners } from "@/mock/banners";

export default function TabOneScreen() {
  return (
    <FlatList
      ListHeaderComponent={<ListHeader />}
      data={posts}
      renderItem={({ item }) => (
        <View style={{ marginHorizontal: 10 }}>
          <Post post={item} />
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      showsVerticalScrollIndicator={false}
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
    marginBottom: 20,
  },
});
