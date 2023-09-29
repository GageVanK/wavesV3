import {
    Group,
    Button,
    UnstyledButton,
    Text,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
    useMantineTheme,
    ActionIcon,
    Tooltip,
    Badge,
    Space,
    Menu,
    Avatar,
  } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    IconBellRinging,
    IconHome2,
    IconUser,
    IconWallet,
    IconLogout,
    IconReceipt2,
    IconSwitchHorizontal,
  } from '@tabler/icons-react';
import classes from './MantineHeader.module.css';
import Link from 'next/link';
import { GiWaveCrest } from 'react-icons/gi';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { identity, getUnreadNotificationsCount, setNotificationMetadata } from 'deso-protocol';
import { useContext, useEffect, useState} from 'react';
import { DeSoIdentityContext } from 'react-deso-protocol';


  
  export function MantineHeader() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();
    const { currentUser, alternateUsers } = useContext(DeSoIdentityContext);
    
    
      const handleUserSwitch = (publicKey: string) => {
    identity.setActiveUser(publicKey);
  };

  const handleLogout = () => {
    if (alternateUsers && alternateUsers.length > 0) {
      const firstAlternateUser = alternateUsers[0];
      identity.logout().then(() => {
        handleUserSwitch(firstAlternateUser.PublicKeyBase58Check);
      });
    } else {
      identity.logout();
    }
  };

  const [unreadNotifs, setUnreadNotifs] = useState(0);
  const fetchUnreadNotifications = async () => {
     const notifData = await getUnreadNotificationsCount({
       PublicKeyBase58Check: currentUser.PublicKeyBase58Check,
     });
 
     console.log(notifData);
     setUnreadNotifs(notifData.NotificationsCount)
   };
 
    // Fetch the followingPosts when the currentUser changes
    useEffect(() => {
     if (currentUser) {
       fetchUnreadNotifications();
     }
   }, [currentUser]);
 
   const resetUnreadNotifications = async () => {
     const notifData = await getUnreadNotificationsCount({
       PublicKeyBase58Check: currentUser?.PublicKeyBase58Check,
     });
     await setNotificationMetadata({
       PublicKeyBase58Check: currentUser?.PublicKeyBase58Check,
       UnreadNotifications: 0,
       LastUnreadNotificationIndex:  notifData.LastUnreadNotificationIndex
     });
 
     setUnreadNotifs(0)
   };
  

 
 
    
  
    return (
      <Box pb={120}>
        <header className={classes.header}>
          <Group justify="space-between" h="100%">
          <Group>
          <Text size="xl" fw={900} fs="italic" variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>Waves</Text>
<Badge variant="filled" color="blue" radius="sm" className={classes.betaTag}>BETA</Badge>
</Group>
  
            <Group h="100%" visibleFrom="sm">
            <Tooltip label="Home" withArrow  position="bottom" offset={3}>
          <ActionIcon
          component={Link}
          href="/"
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 360  }}
    >
      <IconHome2 />
    </ActionIcon>
    </Tooltip>
    <Tooltip label="Profile" withArrow  position="bottom" offset={3}>
    <ActionIcon
    component={Link}
    href="/profile"
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
    >
      <IconUser />
    </ActionIcon>
    </Tooltip>
    <Tooltip label="Wallet" withArrow  position="bottom" offset={3}>
    <ActionIcon
    component={Link}
    href="/wallet"
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 150  }}
    >
      <IconWallet />
    </ActionIcon>
    </Tooltip>
    <Tooltip label="Notifications" withArrow  position="bottom" offset={3}>
    <ActionIcon
    component={Link}
    href="/notifications"
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 270 }}
      onClick={resetUnreadNotifications}
    >
     
      <IconBellRinging/>
     
      { unreadNotifs > 0 && (
          <Text  className={classes.notificationCount} fz="sm" fw={700} c="orange">{unreadNotifs}</Text>
        )}
        
    </ActionIcon>
    </Tooltip>
            </Group>
  
            <Group visibleFrom="sm">
              <ColorSchemeToggle/>
            {!currentUser && (!alternateUsers || alternateUsers.length === 0) && (
                          <>
                            <Button
                              variant="default"
                              onClick={() => identity.login()}
                            >
                              Login
                            </Button>
                            <Button
                              leftSection={<GiWaveCrest size="1rem" />}
                              variant="gradient"
                              gradient={{ from: "cyan", to: "indigo" }}
                              onClick={() => identity.login()}
                            >
                              Sign Up
                            </Button>
                          </>
                        )}

                        {!!currentUser && (
                          <Menu
                            trigger="hover"
                            openDelay={100}
                            closeDelay={400}
                            shadow="md"
                            width={200}
                            zIndex={1000000}
                          >
                            <Menu.Target>
                              <UnstyledButton
                               
                              >
                                 <Avatar
              
                
              variant="light" radius="xl" size={48} color="rgba(0, 174, 186, 1)"
               
                src={
                  `https://node.deso.org/api/v0/get-single-profile-picture/${currentUser.PublicKeyBase58Check}` ||
                  null
                }
                alt="Profile Picture"
              />
                        
                              </UnstyledButton>
                            </Menu.Target>

                            <Menu.Dropdown>
                              {alternateUsers?.length > 0 && (
                                <Menu.Label>Accounts</Menu.Label>
                              )}

                              {alternateUsers?.map((user) => (
                                <Menu.Item
                                leftSection={<IconUser size={17} />}
                                  key={user.PublicKeyBase58Check}
                                  onClick={() =>
                                    identity.setActiveUser(
                                      user.PublicKeyBase58Check
                                    )
                                  }
                                  style={{
                                    maxWidth: "190px", // Adjust the maximum width as needed
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {user.ProfileEntryResponse?.Username ?? user.PublicKeyBase58Check}
                                </Menu.Item>
                              ))}

                              <Menu.Divider />

                              <Menu.Label>Visit DeSo Wallet</Menu.Label>
                              <Menu.Item
                                onClick={() =>
                                  window.open(
                                    "https://wallet.deso.com/",
                                    "_blank"
                                  )
                                }
                                leftSection={<IconReceipt2 size={17} />}
                              >
                                DeSo Wallet
                              </Menu.Item>

                              <Menu.Divider />

                              <Menu.Item
                                leftSection={<IconSwitchHorizontal size={17} />}
                                onClick={() => identity.login()}
                              >
                                Add Account
                              </Menu.Item>

                              <Menu.Item
                                leftSection={<IconLogout size={17} />}
                                onClick={handleLogout}
                              >
                                Logout
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        )}
            </Group>
  
            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </header>
  
        <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="70%"
        padding="md"
        title={
          <Text fw={700} size="xl"  fs="italic" variant="gradient"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>Waves</Text>
        }
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
         
          <Group p="md">
<ColorSchemeToggle/>
</Group>
        
          <Link href="/" className={classes.link} onClick={closeDrawer}> 
            <ActionIcon
   
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan',  deg: 360  }}
    >
      <IconHome2/>
    </ActionIcon>
    <Space w='md'/>
              Home
            </Link>
            <Space h='md'/>
            <Link href="/profile" className={classes.link} onClick={closeDrawer}> 
            <ActionIcon
   
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
    >
      <IconUser/>
    </ActionIcon>
    <Space w='md'/>
              Profile
            </Link>
            <Space h='md'/>
            <Link href="/wallet" className={classes.link} onClick={closeDrawer}> 
            <ActionIcon
   
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 150 }}
    >
      <IconWallet/>
    </ActionIcon>
    <Space w='md'/>
              Wallet
            </Link>
            <Space h='md'/>
            <Link href="/notifications" className={classes.link} onClick={closeDrawer}> 
            <ActionIcon
   
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'cyan', deg: 270 }}
    >
      <IconBellRinging/>
    </ActionIcon>
    <Space w='md'/>
              Notifications
            </Link>
            <Space h='md'/>
          

          <Group align="center" grow pb="xl" px="md">
          {!currentUser && (!alternateUsers || alternateUsers.length === 0) && (
                          <>
                            <Button
                              variant="default"
                              onClick={() => identity.login()}
                            >
                              Login
                            </Button>
                            <Button
                              leftSection={<GiWaveCrest size="1rem" />}
                              variant="gradient"
                              gradient={{ from: "cyan", to: "indigo", deg: 150 }}
                              onClick={() => identity.login()}
                            >
                              Sign Up
                            </Button>
                          </>
                        )}

                        {!!currentUser && (
                          <Menu
                            trigger="hover"
                            openDelay={100}
                            closeDelay={400}
                            shadow="md"
                            width={200}
                            zIndex={1000000}
                          >
                            <Menu.Target>
                              <Button
                                leftSection={<GiWaveCrest size="1rem" />}
                                variant="gradient"
                                gradient={{ from: "cyan", to: "indigo", deg: 150 }}
                              >
                                {currentUser.ProfileEntryResponse?.Username ?? currentUser.PublicKeyBase58Check}
                              </Button>
                            </Menu.Target>

                            <Menu.Dropdown>
                              {alternateUsers?.length > 0 && (
                                <Menu.Label>Accounts</Menu.Label>
                              )}

                              {alternateUsers?.map((user) => (
                                <Menu.Item
                                leftSection={<IconUser size={17} />}
                                  key={user.PublicKeyBase58Check}
                                  onClick={() =>
                                    identity.setActiveUser(
                                      user.PublicKeyBase58Check
                                    )
                                  }
                                  style={{
                                    maxWidth: "190px", // Adjust the maximum width as needed
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {user.ProfileEntryResponse?.Username ?? user.PublicKeyBase58Check}
                                </Menu.Item>
                              ))}

                              <Menu.Divider />

                              <Menu.Label>Visit DeSo Wallet</Menu.Label>
                              <Menu.Item
                                onClick={() =>
                                  window.open(
                                    "https://wallet.deso.com/",
                                    "_blank"
                                  )
                                }
                                leftSection={<IconReceipt2 size={17} />}
                              >
                                DeSo Wallet
                              </Menu.Item>

                              <Menu.Divider />

                              <Menu.Item
                                leftSection={<IconSwitchHorizontal size={17} />}
                                onClick={() => identity.login()}
                              >
                                Add Account
                              </Menu.Item>

                              <Menu.Item
                                leftSection={<IconLogout size={17} />}
                                onClick={handleLogout}
                              >
                                Logout
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        )}
          </Group>
        </ScrollArea>
      </Drawer>
      </Box>
    );
  }