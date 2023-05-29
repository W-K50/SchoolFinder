import { useDispatch, useSelector } from "react-redux";
import axios from "../Config/Urls";
import { getAuth_Data } from "@/Store/Auth_State/Auth_Actions";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const AuthData = useSelector((state) => state.Auth_Reducer.users);
  try {
    const refresh = async () => {
      const response = await axios.post(
        "/refresh",
        {
          refresh_token: AuthData.refresh_token,
        },
        {
          withCredentials: true,
        }
      );

      return response.data.access_token;
    };
    return refresh;
  } catch (error) {
    console.log("Error", error);
  }
};

export default useRefreshToken;
