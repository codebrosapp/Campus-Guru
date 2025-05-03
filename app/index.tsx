import { useEffect, useContext } from "react";
import { auth } from "@/configs/FirebaseConfig";
import { Redirect, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { View, ActivityIndicator } from "react-native";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

export default function Index() {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userData) => {
      console.log("Auth state changed:", userData); 
      if (userData?.email) {
        try {
          const result = await axios.get(
            `${process.env.EXPO_PUBLIC_HOST_URL}/user?email=${userData.email}`
          );
          setUser(result.data);
          router.replace('/(tabs)/Home')
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
      else{
        setUser(null);
        router.replace('/landing')
      }
    });

    return () => unsubscribe(); // clean up on unmount
  }, []);

 {/* useEffect(() => {
    if (user) {
      router.replace("/(tabs)/Home");
    }
  }, [user]);*/}



  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return null;
 
}
