import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { AppShell, MantineProvider, Button, ActionIcon, Group, Space, Container, Tooltip } from '@mantine/core';
import { theme } from '../theme';
import { useDisclosure } from '@mantine/hooks';
import { MantineHeader } from '../components/MantineAppShell/MantineHeader/MantineHeader';
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from 'react-icons/ri';
import { MantineNavBar } from '../components/MantineAppShell/MantineNavBar/MantineNavBar';
import { configure } from 'deso-protocol';
import { DeSoIdentityProvider } from 'react-deso-protocol';
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { Notifications } from "@mantine/notifications";
import '@mantine/notifications/styles.css';

configure({
  spendingLimitOptions: {
    GlobalDESOLimit: 100000000000, 
    TransactionCountLimitMap: {
      UPDATE_PROFILE: "UNLIMITED",
      CREATE_NFT: "UNLIMITED",
      UPDATE_NFT: "UNLIMITED",
      SUBMIT_POST: "UNLIMITED",
      NEW_MESSAGE: "UNLIMITED",
      BASIC_TRANSFER: "UNLIMITED",
      FOLLOW: "UNLIMITED",
      LIKE: "UNLIMITED",
      CREATOR_COIN: "UNLIMITED",
      CREATOR_COIN_TRANSFER: "UNLIMITED",
      ACCEPT_NFT_BID: "UNLIMITED",
      BURN_NFT: "UNLIMITED",
      CREATE_USER_ASSOCIATION: "UNLIMITED",
      CREATE_POST_ASSOCIATION: "UNLIMITED",
      ACCESS_GROUP: "UNLIMITED",
      ACCESS_GROUP_MEMBERS: "UNLIMITED",
    },
    CreatorCoinOperationLimitMap: {
      "": { any: "UNLIMITED" },
    },
    AssociationLimitMap: [
      {
        AssociationClass: "Post",
        AssociationType: "",
        AppScopeType: "Any",
        AppPublicKeyBase58Check: "",
        AssociationOperation: "Any",
        OpCount: "UNLIMITED",
      },
      {
        AssociationClass: "User",
        AssociationType: "",
        AppPublicKeyBase58Check: "",
        AppScopeType: "Any",
        AssociationOperation: "Any",
        OpCount: "UNLIMITED",
      },
    ],
  },
});

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: "7a3f1d57-ec13-4efa-bc61-d112d8b38f15",
  }),
});

export default function App({ Component, pageProps }: AppProps) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <LivepeerConfig client={livepeerClient}>
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Head>
        <title>Waves</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <DeSoIdentityProvider>
      <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'md',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      aside={{
        width: 300,
        breakpoint: 'md',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        <MantineHeader />
        {!desktopOpened ? (
          <Tooltip position="right-start" label="Open Sidebars">
      <ActionIcon onClick={toggleDesktop} visibleFrom="sm"  >
        <RiArrowRightDoubleLine/>
      </ActionIcon>
      </Tooltip>
    ) : null}
      </AppShell.Header>
      <AppShell.Navbar>
        {desktopOpened ? (
        <>
         <Tooltip position="right-start" label="Close Sidebars">
      <ActionIcon onClick={toggleDesktop} visibleFrom="sm"  >
       <RiArrowLeftDoubleLine/>
     </ActionIcon>
     </Tooltip>
     </>
   
    ) : <Tooltip position="right-start" label="Open Sidebars">
    <ActionIcon onClick={toggleDesktop} visibleFrom="sm"  >
      <RiArrowRightDoubleLine/>
    </ActionIcon>
    </Tooltip>}
    <MantineNavBar/>
    </AppShell.Navbar>
    <AppShell.Aside>
 
 </AppShell.Aside>
  
      <AppShell.Main >
      <Container
    style={{
       
      flexDirection: 'column',
      width: '100%',
      margin: '0 auto',
      overflowX: 'hidden',
    }}
  
    size="responsive"
  >
  
      <Component {...pageProps} />
      <Notifications />
      </Container>
      </AppShell.Main>
   </AppShell>
   </DeSoIdentityProvider>
    </MantineProvider>
    </LivepeerConfig>
  );
}
