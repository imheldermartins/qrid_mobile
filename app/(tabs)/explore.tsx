import { api } from "@/utils/api";
import { useRef, useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { Input } from '../../components/Input';
import { useForm } from "react-hook-form";

async function sendMessage(message: string) {
  const response = await api.post("/api", { message });

  return response;
}

export default function TabTwoScreen() {
  const { control, handleSubmit } = useForm();

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  // const handleSendMessage = async () => {
  //   if (!value) return;

  //   await sendMessage(value).then(({ data }) => {
  //     setMessage(data.message);
  //   });
  // };

  const onSubmit = (data: any) => {
    console.log('submit:', data);
  }

  return (
    <View className="w-full flex flex-1 h-screen justify-center items-center bg-slate-50 dark:bg-zinc-900">
      <View className="w-4/5">
        <Text className="text-4xl mb-6 font-semibold text-slate-950 dark:text-white text-center">
          Entrar no Notes
        </Text>
        {/* <TextInput
          value={value}
          onChangeText={setValue}
          placeholder="Digite seu nome"
          className="max-w-4/5 min-w-full text-lg outline-none mt-4 px-5 py-3 rounded-lg dark:text-white dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-400 focus:ring-blue-500 placeholder:text-zinc-400"
        /> */}
        <Input
          name="user.name"
          control={control}
          className="mb-3"
          placeholder="Nome"
          onSubmitEditing={() => emailRef.current?.focus()}
          returnKeyType="next"
        />
        <Input
          ref={emailRef}
          name="user.email"
          control={control}
          className="mb-3"
          placeholder="E-mail"
          onSubmitEditing={() => passwordRef.current?.focus()}
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          name="user.password"
          control={control}
          placeholder="Senha"
        />

        <TouchableOpacity
          className="bg-blue-500 rounded-lg px-4 py-3 mt-4"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-2xl font-semibold text-center">
            Enviar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
