import { FlatList, StyleSheet, View } from "react-native";
import Carousel from "@/components/Carousel";
import AppText from "@/components/UI/AppText";
import Button from "@/components/UI/Button";
import Post from "@/components/Post";
import { useGetPostsQuery } from "@/store/api/posts";
import { banners } from "@/mock/banners";
import { useState } from "react";

const sections = [
  { id: 1, name: "Все", settings: null },
  {
    id: 2,
    name: "Посты",
    settings: {
      param: "type",
      value: "post",
    },
  },
  {
    id: 3,
    name: "События",
    settings: {
      param: "type",
      value: "event",
    },
  },
  {
    id: 4,
    name: "Новости",
    settings: {
      param: "type",
      value: "news",
    },
  },
];

export default function MainScr() {
  const [section, setSection] = useState<number>(1);
  const { currentData, isFetching, isError } = useGetPostsQuery({});
  const posts = Array.isArray(currentData?.data) ? currentData.data : [];

  if (isFetching) {
    return <AppText>Loading...</AppText>;
  }

  if (isError) {
    return null;
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <ListHeader section={section} setSection={setSection} />
      }
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

const ListHeader = (props: {
  section: number;
  setSection: React.Dispatch<React.SetStateAction<number>>;
}) => {
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
        data={sections}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            isActive={item.id === props.section}
            onPress={() => props.setSection(item.id)}
          />
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
