import {
  Avatar,
  Paper,
  Group,
  Text,
  Space,
  Center,
  Divider,
  Container,
  Loader,
  Button,
  UnstyledButton,
  Notification,
  ActionIcon
} from "@mantine/core";
import { useState, useContext, useEffect } from "react";
import { DeSoIdentityContext } from "react-deso-protocol";
import { getNotifications, getSingleProfile, identity, setNotificationMetadata, getUnreadNotificationsCount } from "deso-protocol";
import Link from 'next/link';
import { GiWaveCrest } from "react-icons/gi";
import {
  IconHeartPlus,
  IconHeart,
  IconUsers,
  IconMessage2,
  IconDiamond,
  IconRecycle,
  IconAt,
  IconCoin,
  IconThumbUp,
  IconThumbUpFilled,
  IconCoinOff,
  IconMoneybag
} from "@tabler/icons-react";



export default function NotificationsPage () {

  const { currentUser, isLoading } = useContext(DeSoIdentityContext);
  const [notifications, setNotifications] = useState([]);
  const userPublicKey = currentUser?.PublicKeyBase58Check;
  
  const fetchNotifications = async () => {
    try {
      const notificationData = await getNotifications({
        PublicKeyBase58Check: userPublicKey,
        NumToFetch: 25,
        FetchStartIndex: -1,
      });

      // Iterate through the notifications and fetch the usernames
      const updatedNotifications = await Promise.all(
        notificationData.Notifications.map(async (notification) => {
          const request = {
            PublicKeyBase58Check:
              notification.Metadata.TransactorPublicKeyBase58Check,
          };
          const profileResponse = await getSingleProfile(request);
          return {
            ...notification,
            username: profileResponse.Profile.Username,
          };
        })
      );
      
  

      setNotifications(updatedNotifications);
    console.log(updatedNotifications)

    } catch (error) {
      console.error("Error fetching user notifications:", error);
    }
  };


  useEffect(() => {
    if (currentUser) {
      fetchNotifications();
    }
  }, [currentUser]);

 

  return (
    <div>
      <Divider
        my="xs"
        label={
          <>
            <Text fw={444} fz="xl">
              Notifications
            </Text>
          </>
        }
        labelPosition="center"
      />
<Space h={55}/>
      {currentUser ? (
        <>
          {isLoading ? (
            <Loader variant="bars" />
          ) : (
            /* Render the notifications once loaded */

            notifications.map((notification, index) => (
              <>
                
                  <Container >
                  
                 


                    {notification.Metadata.TxnType === "CREATE_POST_ASSOCIATION" && notification.Metadata.CreatePostAssociationTxindexMetadata.AssociationValue === "LIKE" && (
                      <>
                      <Notification withCloseButton={false} withBorder radius="md" color='rgba(255, 25, 251, 1)' title={<><UnstyledButton component={Link} href={`/wave/${notification.username}`}>
                      <Group style={{ width: "100%", flexGrow: 1 }}>
                        <Avatar
                          size="md"
                          src={
                            `https://node.deso.org/api/v0/get-single-profile-picture/${notification.Metadata.TransactorPublicKeyBase58Check}` ||
                            null
                          }
                        />
                        <div>
                          <Text c="dimmed" fw={700} size="md">
                            {notification.username}
                          </Text>
                        </div>
                        
                      </Group>
                    </UnstyledButton> 
                    <Space h='md'/>
                    <Group>
                    
                        <ActionIcon
                        style={{ width: "100%", height: "100%" }}
                              component={Link}
                              href={`/post-page/${notification.Metadata.CreatePostAssociationTxindexMetadata.PostHashHex}`}
                              variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'rgba(255, 25, 251, 1)', deg: 298 }}
                          >
                            <IconThumbUp />
                            <Space w='sm'/>
                            <Text fw={500} size="sm">
                          Liked your post
                        </Text>
                          </ActionIcon>
                    </Group>
                    <Space h='md'/>

                        <Group>
                         
                        </Group>
                               </>}>
                        </Notification>
                      
                      </>
                    )}

{notification.Metadata.TxnType === "CREATE_POST_ASSOCIATION" && notification.Metadata.CreatePostAssociationTxindexMetadata.AssociationValue === "LOVE" && (
                      <>
                       <Notification withCloseButton={false} withBorder radius="md" color="red" title={<><UnstyledButton component={Link} href={`/wave/${notification.username}`}>
                      <Group style={{ width: "100%", flexGrow: 1 }}>
                        <Avatar
                          size="md"
                          src={
                            `https://node.deso.org/api/v0/get-single-profile-picture/${notification.Metadata.TransactorPublicKeyBase58Check}` ||
                            null
                          }
                        />
                        <div>
                          <Text c="dimmed" fw={700} size="md">
                            {notification.username}
                          </Text>
                        </div>
                        
                      </Group>
                    </UnstyledButton> 
                    <Space h='md'/>
                    <Group>
                    
                        <ActionIcon
                        style={{ width: "100%", height: "100%" }}
                              component={Link}
                              href={`/post-page/${notification.Metadata.CreatePostAssociationTxindexMetadata.PostHashHex}`}
                              variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'pink', deg: 298 }}
                          >
                            <IconHeartPlus />
                            <Space w='md'/>
                            <Text fw={500} size="sm">
                          Loved your post
                        </Text>
                          </ActionIcon>
                    </Group>
                    <Space h='md'/>

                        <Group>
                         
                        </Group>
                               </>}>
                        </Notification>
                      </>
                    )}

                    {notification.Metadata.TxnType === "LIKE" && (
                      <>
                      <Notification withCloseButton={false} withBorder radius="md" color='rgba(255, 25, 251, 1)' title={<><UnstyledButton component={Link} href={`/wave/${notification.username}`}>
                      <Group style={{ width: "100%", flexGrow: 1 }}>
                        <Avatar
                          size="md"
                          src={
                            `https://node.deso.org/api/v0/get-single-profile-picture/${notification.Metadata.TransactorPublicKeyBase58Check}` ||
                            null
                          }
                        />
                        <div>
                          <Text c="dimmed" fw={700} size="md">
                            {notification.username}
                          </Text>
                        </div>
                        
                      </Group>
                    </UnstyledButton> 
                    <Space h='md'/>
                    <Group>
                    
                        <ActionIcon
                        style={{ width: "100%", height: "100%" }}
                              component={Link}
                              href={`/post/${notification.Metadata.LikeTxindexMetadata.PostHashHex}`}
                              variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'rgba(255, 25, 251, 1)', deg: 298 }}
                          >
                           <IconThumbUpFilled/>
                            <Space w='sm'/>
                        <Text fw={500} size="sm">
                          Liked your post
                        </Text>
                        
                        
                          </ActionIcon>
                    </Group>
                    <Space h='md'/>

                        <Group>
                         
                        </Group>
                       
                        </>}>

                        </Notification>
                      </>
                    )}
                    {notification.Metadata.TxnType === "FOLLOW" && (
                     <>
                      <Notification withCloseButton={false} withBorder radius="md" color='rgba(255, 112, 146, 1)' title={<><UnstyledButton component={Link} href={`/wave/${notification.username}`}>
                      <Group style={{ width: "100%", flexGrow: 1 }}>
                        <Avatar
                          size="md"
                          src={
                            `https://node.deso.org/api/v0/get-single-profile-picture/${notification.Metadata.TransactorPublicKeyBase58Check}` ||
                            null
                          }
                        />
                        <div>
                          <Text c="dimmed" fw={700} size="md">
                            {notification.username}
                          </Text>
                        </div>
                        
                      </Group>
                    </UnstyledButton> 
                    <Space h='md'/>
                    <Group>
                    
                        <ActionIcon
                        style={{ width: "100%", height: "100%", padding: "10px" }}
                              component={Link}
                              href={`/wave/${notification.username}`}
                              variant="gradient"
                              size="xl"
                              aria-label="Gradient action icon"
                              gradient={{ from: 'rgba(255, 112, 146, 1)', to: 'blue', deg: 90 }}
                          >
                            <IconUsers />
                            <Space w='md'/>
                        <Text fw={500} size="sm">
                          Followed You
                        </Text>
                          </ActionIcon>
                          
                    </Group>
                    <Space h='md'/>

                        <Group>
                         
                        </Group>
                       
                        </>}>

                        </Notification>
                     </>
                    )}
                    {notification.Metadata.TxnType === "SUBMIT_POST" &&
                      notification.Metadata.AffectedPublicKeys[0].Metadata ===
                        "RepostedPublicKeyBase58Check" && (
                        <>
                          <Notification withCloseButton={false} withBorder radius="md" color='rgba(255, 110, 13, 1)' title={<><UnstyledButton component={Link} href={`/wave/${notification.username}`}>
                      <Group style={{ width: "100%", flexGrow: 1 }}>
                        <Avatar
                          size="md"
                          src={
                            `https://node.deso.org/api/v0/get-single-profile-picture/${notification.Metadata.TransactorPublicKeyBase58Check}` ||
                            null
                          }
                        />
                        <div>
                          <Text c="dimmed" fw={700} size="md">
                            {notification.username}
                          </Text>
                        </div>
                        
                      </Group>
                    </UnstyledButton> 
                    <Space h='md'/>
                    <Group>
                    
                        <ActionIcon
                        style={{ width: "100%", height: "100%", padding: "10px" }}
                              component={Link}
                              href={`/post/${notification.Metadata.SubmitPostTxindexMetadata.PostHashBeingModifiedHex}`}
                              variant="gradient"
                              size="xl"
                              aria-label="Gradient action icon"
                              gradient={{ from: 'rgba(255, 110, 13, 1)', to: 'blue', deg: 90 }}
                          >
                            <IconRecycle/>
                            <Space w='md'/>
                        <Text fw={500} size="sm">
                          Reposted
                        </Text>
                          </ActionIcon>
                          
                    </Group>
                    <Space h='md'/>

                        <Group>
                         
                        </Group>
                       
                        </>}>

                        </Notification>
                        </>
                      )}
                    {notification.Metadata.TxnType === "SUBMIT_POST" &&
                      notification.Metadata.AffectedPublicKeys.length >= 2 &&
                      notification.Metadata.AffectedPublicKeys[0].Metadata ===
                        "BasicTransferOutput" &&
                      notification.Metadata.AffectedPublicKeys[1].Metadata ===
                        "MentionedPublicKeyBase58Check" && (
                        <>
                         <Notification withCloseButton={false} withBorder radius="md" color='rgba(59, 247, 42, 1)'title={<>
                          <UnstyledButton component={Link} href={`/wave/${notification.username}`}>
                      <Group style={{ width: "100%", flexGrow: 1 }}>
                        <Avatar
                          size="md"
                          src={
                            `https://node.deso.org/api/v0/get-single-profile-picture/${notification.Metadata.TransactorPublicKeyBase58Check}` ||
                            null
                          }
                        />
                        <div>
                          <Text c="dimmed" fw={700} size="md">
                            {notification.username}
                          </Text>
                        </div>
                        
                      </Group>
                    </UnstyledButton> 
                    <Space h='md'/>
                    
                    
                    <Group>
                    
                    <ActionIcon
                    style={{ width: "100%", height: "100%", padding: "10px" }}
                          component={Link}
                          href={`/post/${notification.Metadata.SubmitPostTxindexMetadata.PostHashBeingModifiedHex}`}
                          variant="gradient"
                          size="xl"
                          aria-label="Gradient action icon"
                          gradient={{ from: 'rgba(59, 247, 42, 1)', to: 'blue', deg: 90 }}
                      >
                        <IconAt/>
                        <Space w='md'/>
                    <Text fw={500} size="sm">
                      Mentioned You
                    </Text>
                      </ActionIcon>
                      
                </Group>
                          
                    
                    <Space h='md'/>

                        <Group>
                         
                        </Group>
                       
                        </>}>

                        </Notification>
                          
                        </>
                      )}

                    {notification.Metadata.TxnType === "SUBMIT_POST" &&
                      notification.Metadata.AffectedPublicKeys.length >= 2 &&
                      notification.Metadata.AffectedPublicKeys[1].Metadata ===
                        "ParentPosterPublicKeyBase58Check" && (
                        <>
                           <Notification withCloseButton={false} withBorder radius="md" color='rgba(255, 244, 25, 1)' title={<><UnstyledButton component={Link} href={`/wave/${notification.username}`}>
                      <Group style={{ width: "100%", flexGrow: 1 }}>
                        <Avatar
                          size="md"
                          src={
                            `https://node.deso.org/api/v0/get-single-profile-picture/${notification.Metadata.TransactorPublicKeyBase58Check}` ||
                            null
                          }
                        />
                        <div>
                          <Text c="dimmed" fw={700} size="md">
                            {notification.username}
                          </Text>
                        </div>
                        
                      </Group>
                    </UnstyledButton> 
                    <Space h='md'/>
                    <Group>
                    
                        <ActionIcon
                        style={{ width: "100%", height: "100%" }}
                              component={Link}
                              href={`/post/${notification.Metadata.SubmitPostTxindexMetadata.ParentPostHashHex}`}
                              variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'rgba(255, 244, 25, 1)', deg: 298 }}
                          >
                           <IconMessage2/>
                            <Space w='sm'/>
                        <Text fw={500} size="sm">
                          Commented
                        </Text>
                        
                        
                          </ActionIcon>
                    </Group>
                    <Space h='md'/>

                        <Group>
                         
                        </Group>
                       
                        </>}>

                        </Notification>
                        </>
                      )}
                    {notification.Metadata.TxnType === "SUBMIT_POST" &&
                      notification.Metadata.AffectedPublicKeys[0].Metadata ===
                        "MentionedPublicKeyBase58Check" && (
                        <>
                             <Notification withCloseButton={false} withBorder radius="md" color='rgba(59, 247, 42, 1)'title={<>
                             <UnstyledButton component={Link} href={`/wave/${notification.username}`}>
                      <Group style={{ width: "100%", flexGrow: 1 }}>
                        <Avatar
                          size="md"
                          src={
                            `https://node.deso.org/api/v0/get-single-profile-picture/${notification.Metadata.TransactorPublicKeyBase58Check}` ||
                            null
                          }
                        />
                        <div>
                          <Text c="dimmed" fw={700} size="md">
                            {notification.username}
                          </Text>
                        </div>
                        
                      </Group>
                    </UnstyledButton> 
                    <Space h='md'/>
                    <Group>
                    
                        <ActionIcon
                        style={{ width: "100%", height: "100%", padding: "10px" }}
                              component={Link}
                              href={`/post/${notification.Metadata.SubmitPostTxindexMetadata.PostHashBeingModifiedHex}`}
                              variant="gradient"
                              size="xl"
                              aria-label="Gradient action icon"
                              gradient={{ from: 'rgba(59, 247, 42, 1)', to: 'blue', deg: 90 }}
                          >
                            <IconAt/>
                            <Space w='md'/>
                        <Text fw={500} size="sm">
                          Mentioned You
                        </Text>
                          </ActionIcon>
                          
                    </Group>
                    <Space h='md'/>

                        <Group>
                         
                        </Group>
                       
                        </>}>

                        </Notification>
                        </>
                      )}
                    {notification.Metadata.TxnType === "SUBMIT_POST" &&
                      notification.Metadata.AffectedPublicKeys[0].Metadata ===
                        "ParentPosterPublicKeyBase58Check" && (
                        <>
                          <Notification withCloseButton={false} withBorder radius="md" color='rgba(255, 244, 25, 1)' title={<><UnstyledButton component={Link} href={`/wave/${notification.username}`}>
                      <Group style={{ width: "100%", flexGrow: 1 }}>
                        <Avatar
                          size="md"
                          src={
                            `https://node.deso.org/api/v0/get-single-profile-picture/${notification.Metadata.TransactorPublicKeyBase58Check}` ||
                            null
                          }
                        />
                        <div>
                          <Text c="dimmed" fw={700} size="md">
                            {notification.username}
                          </Text>
                        </div>
                        
                      </Group>
                    </UnstyledButton> 
                    <Space h='md'/>
                    <Group>
                    
                        <ActionIcon
                        style={{ width: "100%", height: "100%" }}
                              component={Link}
                              href={`/post/${notification.Metadata.SubmitPostTxindexMetadata.ParentPostHashHex}`}
                              variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'rgba(255, 244, 25, 1)', deg: 298 }}
                          >
                           <IconMessage2/>
                            <Space w='sm'/>
                        <Text fw={500} size="sm">
                          Commented
                        </Text>
                        
                        
                          </ActionIcon>
                    </Group>
                    <Space h='md'/>

                        <Group>
                         
                        </Group>
                       
                        </>}>

                        </Notification>
                        </>
                      )}

{notification.Metadata.BasicTransferTxindexMetadata &&
  notification.Metadata.BasicTransferTxindexMetadata.DiamondLevel > 0 && (
    <>
     <Notification withCloseButton={false} withBorder radius="md" color='rgba(42, 247, 199, 1)' title={<><UnstyledButton component={Link} href={`/wave/${notification.username}`}>
                      <Group style={{ width: "100%", flexGrow: 1 }}>
                        <Avatar
                          size="md"
                          src={
                            `https://node.deso.org/api/v0/get-single-profile-picture/${notification.Metadata.TransactorPublicKeyBase58Check}` ||
                            null
                          }
                        />
                        <div>
                          <Text c="dimmed" fw={700} size="md">
                            {notification.username}
                          </Text>
                        </div>
                        
                      </Group>
                    </UnstyledButton> 
                    <Space h='md'/>
                    <Group>
                    
                        <ActionIcon
                        style={{ width: "100%", height: "100%" }}
                        component={Link}
                        href={`/post/${notification.Metadata.BasicTransferTxindexMetadata.PostHashHex}`}
                              variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'rgba(42, 247, 199, 1)', deg: 298 }}
                          >
                           <IconDiamond/>
                            <Space w='sm'/>
                            <Text fw={500} size="sm">
      Tipped {notification.Metadata.BasicTransferTxindexMetadata.DiamondLevel}{" "}
      {notification.Metadata.BasicTransferTxindexMetadata.DiamondLevel === 1
        ? "Diamond"
        : "Diamonds"}
    </Text>
                        
                        
                          </ActionIcon>
                    </Group>
                    <Space h='md'/>

                        <Group>
                         
                        </Group>
                       
                        </>}>

                        </Notification>

      
    </>
  
)}

                    {notification.Metadata.TxnType === "CREATOR_COIN" &&
                      notification.Metadata.CreatorCoinTxindexMetadata
                        .OperationType === "buy" && (
                        <>
                        <Notification withCloseButton={false} withBorder radius="md" color='rgba(42, 247, 199, 1)' title={<><UnstyledButton component={Link} href={`/wave/${notification.username}`}>
                      <Group style={{ width: "100%", flexGrow: 1 }}>
                        <Avatar
                          size="md"
                          src={
                            `https://node.deso.org/api/v0/get-single-profile-picture/${notification.Metadata.TransactorPublicKeyBase58Check}` ||
                            null
                          }
                        />
                        <div>
                          <Text c="dimmed" fw={700} size="md">
                            {notification.username}
                          </Text>
                        </div>
                        
                      </Group>
                    </UnstyledButton> 
                    <Space h='md'/>
                    <Group>
                    
                        <ActionIcon
                        style={{ width: "100%", height: "100%" }}
                     
                              variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'rgba(42, 247, 199, 1)', deg: 298 }}
                          >
                            <IconCoin />
                            <Space w='sm'/>
                            <Text fw={500} size="sm">Bought your Creator Coin</Text>

                          </ActionIcon>
                    </Group>
                    <Space h='md'/>

                        <Group>
                         
                        </Group>
                       
                        </>}>

                        </Notification>

                        </>
                      )}
                    {notification.Metadata.TxnType === "CREATOR_COIN" &&
                      notification.Metadata.CreatorCoinTxindexMetadata
                        .OperationType === "sold" && (
                        <>
                          <Notification withCloseButton={false} withBorder radius="md" color='rgba(42, 247, 199, 1)' title={<><UnstyledButton component={Link} href={`/wave/${notification.username}`}>
                      <Group style={{ width: "100%", flexGrow: 1 }}>
                        <Avatar
                          size="md"
                          src={
                            `https://node.deso.org/api/v0/get-single-profile-picture/${notification.Metadata.TransactorPublicKeyBase58Check}` ||
                            null
                          }
                        />
                        <div>
                          <Text c="dimmed" fw={700} size="md">
                            {notification.username}
                          </Text>
                        </div>
                        
                      </Group>
                    </UnstyledButton> 
                    <Space h='md'/>
                    <Group>
                    
                        <ActionIcon
                        style={{ width: "100%", height: "100%" }}
                     
                              variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'rgba(42, 247, 199, 1)', deg: 298 }}
                          >
                            <IconCoinOff />
                            <Space w='sm'/>
                            <Text fw={500} size="sm">Sold your Creator Coin</Text>

                          </ActionIcon>
                    </Group>
                    <Space h='md'/>

                        <Group>
                         
                        </Group>
                       
                        </>}>

                        </Notification>
                        </>
                      )}
                    {notification.Metadata.TxnType === "BASIC_TRANSFER" &&
                      notification.Metadata.AffectedPublicKeys[0].Metadata ===
                        "BasicTransferOutput" &&
                      notification.Metadata.AffectedPublicKeys[0]
                        .PublicKeyBase58Check ===
                        currentUser.PublicKeyBase58Check &&  notification.Metadata.BasicTransferTxindexMetadata
                        .DiamondLevel === 0 && (
                        <>
                         <Notification withCloseButton={false} withBorder radius="md" color='rgba(42, 247, 199, 1)' title={<><UnstyledButton component={Link} href={`/wave/${notification.username}`}>
                      <Group style={{ width: "100%", flexGrow: 1 }}>
                        <Avatar
                          size="md"
                          src={
                            `https://node.deso.org/api/v0/get-single-profile-picture/${notification.Metadata.TransactorPublicKeyBase58Check}` ||
                            null
                          }
                        />
                        <div>
                          <Text c="dimmed" fw={700} size="md">
                            {notification.username}
                          </Text>
                        </div>
                        
                      </Group>
                    </UnstyledButton> 
                    <Space h='md'/>
                    <Group>
                    
                        <ActionIcon
                        style={{ width: "100%", height: "100%" }}
                     
                              variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: 'blue', to: 'rgba(42, 247, 199, 1)', deg: 298 }}
                          >
                            <IconMoneybag />
                            <Space w='sm'/>
                            <Text fw={500} size="sm">Sent you DeSo</Text>

                          </ActionIcon>
                    </Group>
                    <Space h='md'/>

                        <Group>
                         
                        </Group>
                       
                        </>}>

                        </Notification>
                        </>
                      )}
                 </Container>
              </>
            ))
            
          )}
         
        </>
      ) : (
        <>
          <Space h="xl" />
          <Container size="30rem" px={0}>
            <Paper shadow="xl" p="lg" withBorder>
              <Center>
                <Text c="dimmed" fw={700}>
                  Please Sign Up or Login to view your Notifications.
                </Text>
              </Center>
              <Space h="md" />
              <Center>
                <Button
                  fullWidth
                  leftIcon={<GiWaveCrest size="1rem" />}
                  variant="gradient"
                  gradient={{ from: "cyan", to: "indigo" }}
                  onClick={() => identity.login()}
                >
                  Sign Up
                </Button>
                <Space w="xs" />
                <Button
                  fullWidth
                  variant="default"
                  onClick={() => identity.login()}
                >
                  Login
                </Button>
              </Center>
            </Paper>
          </Container>
          
        </>
      )}
      
      <Space h={111} />
    </div>
  );
};