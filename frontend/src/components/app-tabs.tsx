import { NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';
import { usarEsquemaDeCores } from 'react-native';

import { Cores } from '@/constants/tema';

export default function AbasApp() {
  const esquema = usarEsquemaDeCores();
  const cores = Cores[esquema === 'unspecified' ? 'light' : esquema];

  return (
    <NativeTabs
      backgroundColor={cores.background}
      indicatorColor={cores.backgroundElement}
      labelStyle={{ selected: { color: cores.text } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
