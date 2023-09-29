import { Switch, Group, useMantineColorScheme, useMantineTheme, rem } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <Group>
      <Switch
        checked={colorScheme === 'dark'}
        onChange={() => toggleColorScheme()}
       
        size="md" color="dark.4" onLabel={sunIcon} offLabel={moonIcon}
      />
    </Group>
  );
}
