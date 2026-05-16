import { Stack } from 'expo-router';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import React from 'react';

/**
 * LayoutRaiz (RootLayout)
 * 
 * Esta é a configuração principal de navegação do aplicativo.
 * O componente "Stack" (Pilha) permite que as telas sejam empilhadas umas sobre as outras.
 * Ele define quais telas existem e como elas são apresentadas (ex: como modal ou tela inteira).
 */
export default function LayoutRaiz() {
  // Hook do React Native para descobrir se o celular está no modo claro ou escuro
  const esquemaDeCores = useColorScheme();

  return (
    // ThemeProvider aplica o tema claro ou escuro em toda a navegação baseada na preferência do usuário
    <ThemeProvider value={esquemaDeCores === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Stack configura a navegação em formato de pilha. headerShown: false esconde o cabeçalho padrão. */}
      <Stack screenOptions={{ headerShown: false }}>
        {/* Tela de login */}
        <Stack.Screen name="login" />
        
        {/* Grupo de telas com abas inferiores (Bottom Tabs) */}
        <Stack.Screen name="(tabs)" />
        
        {/* Tela de adicionar produto, configurada para abrir como um "Modal" (janela sobreposta) */}
        <Stack.Screen 
          name="adicionar-produto" 
          options={{ presentation: 'modal', headerShown: true, title: 'Adicionar Produto' }} 
        />
      </Stack>
    </ThemeProvider>
  );
}
