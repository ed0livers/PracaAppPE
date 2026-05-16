import { Platform } from 'react-native';

/**
 * Endereço base da nossa API Java (Spring Boot).
 * 
 * ATENÇÃO: Se você estiver rodando no celular físico via Expo Go,
 * 'localhost' não vai funcionar porque o celular vai procurar o servidor nele mesmo.
 * 
 * SOLUÇÃO: Troque pelo Endereço IP do seu computador na sua rede Wi-Fi.
 * Você pode achar seu IP abrindo o terminal e digitando "ipconfig" (Windows) ou "ifconfig" (Mac/Linux).
 */
const IP_COMPUTADOR = '192.168.0.10'; // <-- ALERTA: MUDE ISSO PARA O SEU IP DA REDE

export const API_URL = Platform.select({
  android: `http://${IP_COMPUTADOR}:8080/api`,
  ios: `http://${IP_COMPUTADOR}:8080/api`,
  web: 'http://localhost:8080/api', // Na Web, localhost funciona perfeitamente
  default: `http://${IP_COMPUTADOR}:8080/api`
});
