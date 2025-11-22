import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import Carousel from "@/components/Carousel";
import AppText from "@/components/UI/AppText";
import Button from "@/components/UI/Button";
import Post from "@/components/Post";
import { useGetPostsQuery } from "@/store/api/posts";
import { banners } from "@/mock/banners";
import { useState } from "react";
import Icon from "@/components/UI/Icon";
import Colors from "@/constants/Theme";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Input from "@/components/UI/Input";
import { PostType } from "@/types/post.type";

const sections = [
  { id: 1, name: "Все", type: null },
  {
    id: 2,
    name: "Посты",
    type: "POST",
  },
  {
    id: 3,
    name: "События",
    type: "EVENT",
  },
  {
    id: 4,
    name: "Новости",
    type: "NEWS",
  },
];

export default function MainScr() {
  const theme = useSelector((state: RootState) => state.theme.current);
  const [section, setSection] = useState<PostType | null>(null);

  const params = section ? { type: section } : {};
  const { currentData, isFetching, isError, error, refetch } =
    useGetPostsQuery(params);
  const posts = Array.isArray(currentData?.data) ? currentData.data : [];

  if (isFetching) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={Colors[theme].secondary} />
        <View style={{ height: 100 }} />
      </View>
    );
  }

  if (isError) {
    return (
      <View
        style={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Icon type="Entypo" name="circle-with-cross" color="red" size={62} />
        <AppText type="title" size={18} weight={"bold"}>
          Что-то пошло не так 😕
        </AppText>

        <AppText>{"Попробуйте обновить страницу."}</AppText>

        <Button
          title={"Попробовать снова"}
          onPress={refetch}
          isActive
          containerStyle={{ marginTop: 20 }}
        />

        <View style={{ height: 100 }} />
      </View>
    );
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
  section: PostType | null;
  setSection: React.Dispatch<React.SetStateAction<PostType | null>>;
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

      <Input
        value=""
        onChangeText={(text) => {}}
        placeholder="поиск..."
        fontSize={14}
        iconLeft={<Icon type="Ionicons" name="search-outline" color={"grey"} />}
        inputStyle={{ paddingVertical: 20 }}
        containerStyle={{
          marginHorizontal: 10,
          borderRadius: 30,
          marginVertical: 5,
        }}
      />

      <FlatList
        data={sections}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            isActive={item.type === props.section}
            onPress={() => props.setSection(item.type)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginLeft: 10,
          // marginTop: 10,
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
