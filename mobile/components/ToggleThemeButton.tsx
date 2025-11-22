import { setTheme } from "@/store/slices/themeSlice";
import { RootState } from "@/store/store";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "./UI/Icon";
import { saveDataInStorage } from "@/utils/storage";

export default function ToggleThemeButton() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.current);

  const handleChangeTheme = async (next: "dark" | "light") => {
    dispatch(setTheme(next));
    await saveDataInStorage("app_theme", next);
  };

  if (theme === "dark") {
    return (
      <TouchableOpacity
        onPress={() => handleChangeTheme("light")}
        style={{
          borderRadius: 50,
          paddingVertical: 5,
          paddingHorizontal: 5,
          opacity: 0.3,
        }}
      >
        <Icon type="AntDesign" name="sun" color="#fff" />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => handleChangeTheme("dark")}
      style={{
        borderRadius: 50,
        paddingVertical: 5,
        paddingHorizontal: 5,
        opacity: 0.3,
      }}
    >
      <Icon type="FontAwesome" name="moon-o" color="#000" />
    </TouchableOpacity>
  );
}
