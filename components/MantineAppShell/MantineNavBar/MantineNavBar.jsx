import { useContext, useEffect, useState } from 'react';
import { Group, Code, Avatar, Center, Divider, Space, Text, ActionIcon, UnstyledButton } from '@mantine/core';
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
import { GiWaveSurfer } from "react-icons/gi";
import classes from './MantineNavBar.module.css';
import { getFollowersForUser, getIsFollowing, getUnreadNotificationsCount, setNotificationMetadata } from 'deso-protocol';
import { DeSoIdentityContext } from 'react-deso-protocol';
import Link from 'next/link';

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

  
 
// Fetch the followingPosts when the currentUser changes
useEffect(() => {
  if (currentUser) {
    fetchFollowingPosts();
   
  }
}, [currentUser]);


  return (
    
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
      <Space h="lg" />
            
              <Text fs="italic" size="md" fw={800} c="dimmed" >
                Following
              </Text>
              <Space w={2}/>
              
           
            <Space h="sm" />
            {currentUser ? (
              followingWaves && followingWaves.length > 0 ? (
                followingWaves
                  .filter((post) => post.Username !== currentUser.Username)
                  .map((post) => {
                    return (
                   <UnstyledButton component={Link}
                   href={`/wave/${post.Username}`} style={{ width: "100%" }}>
                      <div key={post.PublicKeyBase58Check}
                          
                          className={(classes.link)}
                          onClick={() => {
                      
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
                      </UnstyledButton>
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

            
            <Text fs="italic" size="md" fw={800} c="dimmed" >
                Recommended Waves
              </Text>
          

            <Space h="sm" />
            {filteredPosts && filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <UnstyledButton component={Link}
                   href={`/wave/${post.Username}`} style={{ width: "100%" }}>
                <div key={post.PublicKeyBase58Check}
              
                    className={(classes.link)}
                    onClick={() => {
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
                </UnstyledButton>
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