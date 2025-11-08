import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Animated, {
  Extrapolation,
  interpolate,
  scrollTo,
  SharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
const { width } = Dimensions.get("window");

interface sliderItem {
  id?: number | string;
  title?: string;
  image: string;
  link?: string;
}

interface CarouselProps {
  data: sliderItem[];
  slideInterval: number;
}

export default function Carousel({
  data,
  slideInterval = 2000,
}: CarouselProps) {
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const interval = useRef<NodeJS.Timeout>(null);
  const offset = useSharedValue(0);
  const currentIndex = useRef(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
    onMomentumEnd: (e) => {
      offset.value = e.contentOffset.x;
    },
  });

  useEffect(() => {
    interval.current = setInterval(() => {
      if (!isAutoPlay) return;

      currentIndex.current += 1;
      if (currentIndex.current < data.length) {
        ref.current?.scrollToOffset({
          offset: width * currentIndex.current,
          animated: true,
        });
      } else {
        currentIndex.current = 0;
        setTimeout(() => {
          ref.current?.scrollToOffset({
            offset: 0,
            animated: true,
          });
        }, slideInterval);
      }
    }, slideInterval);

    return () => {
      clearInterval(interval.current);
    };
  }, [data, isAutoPlay, offset]);

  useDerivedValue(() => {
    scrollTo(ref, offset.value, 0, true);
  });

  return (
    <View>
      <Animated.FlatList
        ref={ref}
        data={data}
        renderItem={({ item, index }) => (
          <SliderItem slider={item} index={index} scrollX={scrollX} />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollHandler}
        onScrollBeginDrag={(e) => {
          currentIndex.current = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setIsAutoPlay(false);
        }}
        onScrollEndDrag={(e) => {
          currentIndex.current = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setIsAutoPlay(true);
        }}
        onMomentumScrollBegin={(e) => {
          currentIndex.current = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setIsAutoPlay(false);
        }}
        onMomentumScrollEnd={(e) => {
          currentIndex.current = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setIsAutoPlay(true);
        }}
      />
    </View>
  );
}

interface SliderItemProps {
  slider: sliderItem;
  index: number;
  scrollX: SharedValue<number>;
}

const SliderItem = ({ slider, index, scrollX }: SliderItemProps) => {
  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.15 + 10, 0, width * 0.15 - 10],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Animated.View key={index} style={[styles.slider, rnAnimatedStyle]}>
      <Image source={{ uri: slider.image }} style={styles.sliderImage} />
      <Text style={styles.sliderText}>{slider.title}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  slider: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: width,
  },
  sliderImage: {
    width: width * 0.85,
    height: width * 0.85 * 0.5,
    borderRadius: 20,
  },
  sliderText: {
    position: "absolute",
    bottom: 10,
  },
});
