import { setTheme } from "@/store/slices/themeSlice";
import { RootState } from "@/store/store";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "./UI/Icon";

export default function ToggleThemeButton() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.current);

  if (theme === "dark") {
    return (
      <TouchableOpacity
        onPress={() => dispatch(setTheme("light"))}
        style={{
          borderRadius: 50,
          paddingVertical: 5,
          paddingHorizontal: 5,
        }}
      >
        <Icon type="AntDesign" name="sun" color="#fff" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => dispatch(setTheme("dark"))}
      style={{
        borderRadius: 50,
        paddingVertical: 5,
        paddingHorizontal: 5,
      }}
    >
      <Icon type="FontAwesome" name="moon-o" color="#000" />
    </TouchableOpacity>
  );
}
