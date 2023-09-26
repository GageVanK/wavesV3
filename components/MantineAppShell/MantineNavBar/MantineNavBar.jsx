import { useContext, useEffect, useState } from 'react';
import { Group, Code, Avatar, Center, Divider, Space, Text, useStyles } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from '@tabler/icons-react';
import { RxDotFilled } from "react-icons/rx";
import classes from './MantineNavBar.module.css';
import { getFollowersForUser, getIsFollowing, getUnreadNotificationsCount, setNotificationMetadata } from 'deso-protocol';
import { DeSoIdentityContext } from 'react-deso-protocol';


export function MantineNavBar() {
  const [active, setActive] = useState('Billing');
  const [wavesSidebar, setWavesSidebar] = useState([]);
  const [followingWaves, setFollowingWaves] = useState([]);
  const [unreadNotifs, setUnreadNotifs] = useState(0);
  const { currentUser, isLoading } = useContext(DeSoIdentityContext);
 

  useEffect(() => {
    const fetchWavesSidebar = async () => {
      try {
        //Getting Profiles that are following the Waves_Streams Account
        const result = await getFollowersForUser({
          Username: "Waves_Streams",
          GetEntriesFollowingUsername: true,
          //Will have to increase as the followers increase
          NumToFetch: 20,
        });

        setWavesSidebar(Object.values(result.PublicKeyToProfileEntry));
      } catch (error) {
        console.log("Something went wrong:", error);
      }
    };

    fetchWavesSidebar();
  }, []);

  //Filter the posts that have non-empty WavesStreamPlaybackId and WavesStreamTitle to get livestreams
  //For the Recommended Waves section
  const filteredPosts = wavesSidebar.filter(
    (post) =>
      post.ExtraData?.WavesStreamPlaybackId &&
      post.ExtraData?.WavesStreamPlaybackId !== "" &&
      post.ExtraData?.WavesStreamTitle &&
      post.ExtraData?.WavesStreamTitle !== ""
  );

  // Check if the current user is following the profiles in filteredPosts
  const fetchFollowingPosts = async () => {
    const followingPosts = [];
    for (const post of filteredPosts) {
      const request = {
        PublicKeyBase58Check: currentUser.PublicKeyBase58Check,
        IsFollowingPublicKeyBase58Check: post.PublicKeyBase58Check,
      };
      const response = await getIsFollowing(request);
      if (response.IsFollowing === true) {
        followingPosts.push(post);
      }
    }
    setFollowingWaves(followingPosts);
  };

  
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
      fetchFollowingPosts();
      fetchUnreadNotifications();
    }
  }, [currentUser]);

  

 
  const resetUnreadNotifications = async () => {
   
    const notifData = await getUnreadNotificationsCount({
      PublicKeyBase58Check: currentUser.PublicKeyBase58Check,
    });
    await setNotificationMetadata({
      PublicKeyBase58Check: currentUser.PublicKeyBase58Check,
      UnreadNotifications: 0,
      LastUnreadNotificationIndex:  notifData.LastUnreadNotificationIndex
    });

    setUnreadNotifs(0)

  };


  return (
    
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
      
            <Center>
              <Text size="xs" fw={500} c="dimmed">
                Following Waves
              </Text>
            </Center>
            <Space h="sm" />
            {currentUser ? (
              followingWaves && followingWaves.length > 0 ? (
                followingWaves
                  .filter((post) => post.Username !== currentUser.Username)
                  .map((post) => {
                    return (
                      <div key={post.PublicKeyBase58Check}
                        
                          className={(classes.link)}
                          onClick={() => {
                            const state = {
                              userPublicKey: post.PublicKeyBase58Check,
                              userName:
                                post.Username || post.PublicKeyBase58Check,
                              description: post.Description || null,
                              largeProfPic:
                                post.ExtraData?.LargeProfilePicURL || null,
                              featureImage:
                                post.ExtraData?.FeaturedImageURL || null,
                            };

                           

                            setActive(post);
                          }}
                        >
                          <Group style={{ flex: 1 }} noWrap>
                            <Space w={1} />
                            <Avatar
                              radius="xl"
                              size="sm"
                              src={
                                post.ExtraData?.LargeProfilePicURL ||
                                `https://node.deso.org/api/v0/get-single-profile-picture/${post.PublicKeyBase58Check}` ||
                                null
                              }
                            />

                            <span>
                              <Text fz="xs" fw={500} truncate lineClamp={1}>
                                {post.Username}
                              </Text>
                            </span>
                          </Group>
                          <Space w="lg" />
                          <Group postition="right">
                            <RxDotFilled size={22} color="red" />{" "}
                          </Group>
                       
                      </div>
                    );
                  })
              ) : (
                <>
                  <Center>
                    <Text fz="xs" fw={500} lineClamp={2}>
                      No Followers are Live.
                    </Text>
                  </Center>
                  <Space h="lg" />
                </>
              )
            ) : (
              <>
                <Center>
                  <Text fz="xs" fw={500} lineClamp={2}>
                    Login to view your Followings' Waves.
                  </Text>
                </Center>
                <Space h="lg" />
              </>
            )}

            <Divider my="sm" />
            <Space h="lg" />

            <Center>
              <Text size="xs" weight={500} c="dimmed">
                Recommended Waves
              </Text>
            </Center>

            <Space h="sm" />
            {filteredPosts && filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div key={post.PublicKeyBase58Check}
              
                    className={(classes.link)}
                    onClick={() => {
                      const state = {
                        userPublicKey: post.PublicKeyBase58Check,
                        userName: post.Username || post.PublicKeyBase58Check,
                        description: post.Description || null,
                        largeProfPic:
                          post.ExtraData?.LargeProfilePicURL || null,
                        featureImage: post.ExtraData?.FeaturedImageURL || null,
                      };

                   

                      setActive(post);
                    }}
                  >
                    <Group style={{ flex: 1 }} >
                      <Space w={1} />
                      <Avatar
                        radius="xl"
                        size="sm"
                        src={
                          post.ExtraData?.LargeProfilePicURL ||
                          `https://node.deso.org/api/v0/get-single-profile-picture/${post.PublicKeyBase58Check}` ||
                          null
                        }
                      />

                      <span>
                        <Text fz="xs" fw={500} truncate lineClamp={1}>
                          {post.Username}
                        </Text>
                      </span>
                    </Group>
                    <Space w="lg" />
                    <Group postition="right">
                      <RxDotFilled size={22} color="red" />{" "}
                    </Group>
                 
                </div>
              ))
            ) : (
              
                <Center>
                  <Text fz="xs" fw={500} lineClamp={1}>
                    No Waves Right Now.
                  </Text>
                </Center>
           
            )}
  
      </div>
    </nav>
  );
}