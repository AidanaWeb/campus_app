import { FlatList, StyleSheet, View } from "react-native";
import Carousel from "@/components/Carousel";
import AppText from "@/components/UI/AppText";
import Button from "@/components/UI/Button";
import Post from "@/components/Post";
import { useGetPostsQuery } from "@/store/api/posts";
import { banners } from "@/mock/banners";

export default function MainScr() {
  const { currentData, isLoading, isError } = useGetPostsQuery({});
  const posts = Array.isArray(currentData?.data) ? currentData.data : [];

  if (isLoading) {
    return null;
  }

  if (isError) {
    return null;
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<ListHeader />}
      data={posts}
      renderItem={({ item }) => (
        <View style={{ marginHorizontal: 10 }}>
          <Post post={item} paddingHorizontal={10} />
        </View>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
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
          marginLeft: 10,
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
