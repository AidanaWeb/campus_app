import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import Carousel from "@/components/Carousel";
import AppText from "@/components/UI/AppText";
import Button from "@/components/UI/Button";
import Post from "@/components/Post";
import { useGetPostsQuery } from "@/store/api/posts";
import { banners } from "@/mock/banners";
import { useCallback, useEffect, useState } from "react";
import Icon from "@/components/UI/Icon";
import Colors from "@/constants/Theme";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Input from "@/components/UI/Input";
import { PostType } from "@/types/post.type";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { useFocusEffect } from "expo-router";

interface filters {
  type: PostType | null;
  search: string | null;
}
const sections = [
  { id: 1, name: { ru: "Все", en: "All" }, type: null },
  {
    id: 2,
    name: {
      ru: "Посты",
      en: "Posts",
    },
    type: PostType.POST,
  },
  {
    id: 3,
    name: { ru: "События", en: "Events" },
    type: PostType.EVENT,
  },
  {
    id: 4,
    name: { ru: "Новости", en: "News" },
    type: PostType.NEWS,
  },
];

export default function MainScr() {
  const theme = useSelector((state: RootState) => state.theme.current);
  const [sectionId, setSectionId] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<filters>({
    type: null,
    search: null,
  });

  const { currentData, isFetching, isLoading, isError, error, refetch } =
    useGetPostsQuery(filters);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: search }));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    const section = sections.find((item) => item.id === sectionId);
    updateFilter("type", section?.type ?? null);
  }, [sectionId]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const posts = Array.isArray(currentData?.data) ? currentData.data : [];

  if (isLoading) {
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
      data={posts}
      ListHeaderComponent={
        <ListHeader
          sectionId={sectionId}
          setSectionId={setSectionId}
          search={search}
          setSearch={setSearch}
        />
      }
      renderItem={({ item }) => (
        <View style={{ marginHorizontal: 10 }}>
          <Post post={item} paddingHorizontal={10} />
        </View>
      )}
      ListEmptyComponent={
        isFetching ? (
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
        ) : (
          <EmptyPostsList />
        )
      }
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const ListHeader = (props: {
  sectionId: number;
  setSectionId: React.Dispatch<React.SetStateAction<number>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { t } = useTranslation();
  const lang = i18n.language;

  return (
    <View style={styles.headerContainer}>
      <AppText
        size={38}
        type="title"
        style={{ fontWeight: "bold", marginLeft: 20 }}
      >
        {t("news")}
      </AppText>

      <Carousel data={banners} />

      <Input
        value={props.search}
        onChangeText={props.setSearch}
        placeholder={`${t("search")}...`}
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
        horizontal
        data={sections}
        renderItem={({ item }) => (
          <Button
            title={item.name[lang]}
            isActive={item.id === props.sectionId}
            onPress={() => props.setSectionId(item.id)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        style={{
          marginLeft: 10,
        }}
      />
    </View>
  );
};

const EmptyPostsList = () => {
  return (
    <View
      style={{
        height: 500,
        alignItems: "center",
        paddingTop: 50,
      }}
    >
      <Icon type="Ionicons" name="search-outline" size={62} opacity={0.3} />
      <AppText type="subText" size={14}>
        Посты не найдены
      </AppText>
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
