import { api } from "@/utils/api";
import { useState } from "react";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";

async function sendMessage(message: string) {
  const response = await api.post("/api", { message });

  return response;
}

export default function TabTwoScreen() {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = async () => {
    if (!value) return;

    await sendMessage(value).then(({ data }) => {
      setMessage(data.message);
    });
  };

  return (
    <View className="w-full flex flex-1 h-screen justify-center items-center bg-zinc-900">
      <View className="w-4/5">
        <Text className="text-4xl font-semibold dark:text-white text-center">
          {!message ? "Entrar no Notes" : message}
        </Text>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder="Digite seu nome"
          className="max-w-4/5 min-w-full text-lg outline-none mt-4 px-4 py-3 rounded-lg dark:text-white dark:bg-zinc-800 ring-1 dark:ring-zinc-400 focus:ring-blue-500 placeholder:text-zinc-400"
        />

        <TouchableOpacity
          className="bg-blue-500 rounded-lg px-4 py-3 mt-4"
          onPress={() => handleSendMessage()}
        >
          <Text className="text-white text-2xl font-semibold text-center">
            Enviar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
