import { Tabs, rem } from '@mantine/core';

import classes from './HomeTabs.module.css';
import { BsFire } from "react-icons/bs";
import { GiWaveCrest } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
export function HomeTabs() {
  return (
    <Tabs variant="unstyled" defaultValue="settings" classNames={classes}>
      <Tabs.List grow>
        <Tabs.Tab
          value="settings"
          leftSection={<GiWaveCrest style={{ width: rem(16), height: rem(16) }} />}
        >
          Waves
        </Tabs.Tab>
        <Tabs.Tab
          value="messages"
          leftSection={<FaUsers style={{ width: rem(16), height: rem(16) }} />}
        >
          Following Feed
        </Tabs.Tab>
        <Tabs.Tab
          value="gallery"
          leftSection={<BsFire style={{ width: rem(16), height: rem(16) }} />}
        >
          Hot Feed
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}