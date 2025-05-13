import { AuthContext } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { useState } from "react";

interface USER{
  id:number,
  name:string,
  email:string,
  image:string
}

export default function RootLayout() {
  const [user, setUser] = useState<USER|undefined>(undefined);
  return (
    <AuthContext.Provider value={{user, setUser}}>
    <Stack>
      <Stack.Screen name='landing' 
      options={{
        headerShown: false
      }} 
      /> 
      <Stack.Screen name="(authentication)/SignUp"
         options={{
          headerShown: false

         }}
      />
      <Stack.Screen name="(authentication)/SignIn"
         options={{
          headerTransparent: true,
         headerShown: false
         }}
      />
      <Stack.Screen name="(tabs)"
         options={{
         headerShown: false
         }}
      />
      <Stack.Screen name="add-post/index"
         options={{
         headerTitle: "Add new post"
         }}
      />
      <Stack.Screen name="explore-clubs/index"
         options={{
         headerTitle: "Explore clubs"
         }}
      />
      <Stack.Screen name="add-event/index"
         options={{
         headerTitle: "Add New Event"
         }}
      />
    </Stack>
    </AuthContext.Provider>
  )
}
