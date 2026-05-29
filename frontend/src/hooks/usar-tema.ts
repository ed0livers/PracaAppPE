/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Cores } from '@/constants/tema';
import { usarEsquemaDeCores } from '@/hooks/usar-esquema-de-cores';

export function usarTema() {
  const esquema = usarEsquemaDeCores();
  const tema = esquema === 'unspecified' ? 'light' : esquema;

  return Cores[tema];
}
