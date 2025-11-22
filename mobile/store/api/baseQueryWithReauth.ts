import { API_BASE_URL } from "@/config/api";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  getDataFromStorage,
  removeDataFromStorage,
  saveDataInStorage,
} from "@/utils/storage";
import { logoutUser, setAccessToken } from "../slices/userSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshToken = await getDataFromStorage("refreshToken");

    if (!refreshToken) {
      api.dispatch(logoutUser());
      return result;
    }

    const tokensResult: any = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (tokensResult.data) {
      const { accessToken, refreshToken: newRefresh } = tokensResult.data;

      api.dispatch(setAccessToken(accessToken));
      await saveDataInStorage("refreshToken", newRefresh);

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logoutUser());
      await removeDataFromStorage("refreshToken");
    }
  }

  return result;
};
