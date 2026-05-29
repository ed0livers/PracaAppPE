import { View, type ViewProps } from 'react-native';

import { CorTema } from '@/constants/tema';
import { usarTema } from '@/hooks/usar-tema';

export type PropsVisualizaçãoTemática = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: CorTema;
};

export function VisualizaçãoTemática({ style, lightColor, darkColor, type, ...otherProps }: PropsVisualizaçãoTemática) {
  const tema = usarTema();

  return <View style={[{ backgroundColor: tema[type ?? 'background'] }, style]} {...otherProps} />;
}
