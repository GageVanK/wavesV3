
import { useRouter } from 'next/router'
import { useEffect, useState, useContext } from "react";
import {
  
  getSinglePost,
  submitPost,
  createPostAssociation,
  sendDiamonds,
} from "deso-protocol";
import {
  Avatar,
 
  Paper,
  Modal,
  Group,
  Text,
  Space,
  Center,
  UnstyledButton,
 

  Textarea,
  Button,
  ActionIcon,
 
  Spoiler,
  Tooltip,
  Image,
  Divider,
} from "@mantine/core";
import {
  IconHeartFilled,
  IconHeart,
  IconScriptPlus,
  IconScriptMinus,
  IconDiamond,
  IconRecycle,
  IconMessageCircle,
  IconCheck
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { DeSoIdentityContext } from "react-deso-protocol";
import { notifications } from "@mantine/notifications";
import Link from "next/link"

export default function PostPage() {
  const router = useRouter();

  // Extracting the post ID from the URL
  const { postHash } = router.query;
  const [singlePost, setSinglePost] = useState({});
  const [comments, setComments] = useState([]);
  
  const { currentUser } = useContext(DeSoIdentityContext);
  
  const [selectedImage, setSelectedImage] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getSinglePost({
          PostHashHex: postHash,
          CommentLimit: 50,
        });

        setComments(postData.PostFound.Comments);
        setSinglePost(postData.PostFound);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postHash]);
  console.log(singlePost);
  const replaceURLs = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const atSymbolRegex = /(\S*@+\S*)/g;

    return text
      .replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`)
      .replace(atSymbolRegex, (match) => ` ${match} `);
  };

  const [comment, setComment] = useState("");

  const submitComment = async () => {
    try {
      await submitPost({
        UpdaterPublicKeyBase58Check: currentUser.PublicKeyBase58Check,
        ParentStakeID: postHash,
        BodyObj: {
          Body: comment,
          VideoURLs: [],
          ImageURLs: [],
        },
      });

      notifications.show({
        title: "Success",
        icon: <IconCheck size="1.1rem" />,
        color: "green",
        message: "Your comment was submitted!",
      });
    } catch (error) {
      alert("Error submitting comment. Please try again.");
      console.error("Error submitting comment:", error);
    }

    // Reset the comment state after submitting
    setComment("");
  };

  const [repostSuccess, setRepostSuccess] = useState(false);

  const submitRepost = async () => {
    try {
      await submitPost({
        UpdaterPublicKeyBase58Check: currentUser.PublicKeyBase58Check,
        RepostedPostHashHex: postHash,
        BodyObj: {
          Body: "",
          VideoURLs: [],
          ImageURLs: [],
        },
      });
      setRepostSuccess(true);
    } catch (error) {
      alert("Error submitting Repost. Please try again.");
      console.error("Error submitting Repost:", error);
    }
  };

  const [heartSuccess, setHeartSuccess] = useState(false);

  const submitHeart = async () => {
    try {
      await createPostAssociation({
        TransactorPublicKeyBase58Check: currentUser.PublicKeyBase58Check,
        PostHashHex: postHash,
        AssociationType: "REACTION",
        AssociationValue: "LOVE",
        MinFeeRateNanosPerKB: 1000,
      });
      setHeartSuccess(true);
    } catch (error) {
      alert("Error submitting heart. Please try again.");
      console.error("Error submitting heart:", error);
    }
  };

  const [diamondTipSuccess, setDiamondTipSuccess] = useState(false);

  const sendDiamondTip = async () => {
    try {
      await sendDiamonds({
        ReceiverPublicKeyBase58Check: singlePost.PosterPublicKeyBase58Check,
        SenderPublicKeyBase58Check: currentUser.PublicKeyBase58Check,
        DiamondPostHashHex: postHash,
        DiamondLevel: 1,
        MinFeeRateNanosPerKB: 1000,
      });
      setDiamondTipSuccess(true);
    } catch (error) {
      alert("Error submitting diamond. Please try again.");
      console.error("Error submitting diamond:", error);
    }
  };

  return (
    <>
    <Space h={55}/>
      <Paper
        m="md"
        shadow="lg"
        radius="md"
        p="xl"
        withBorder
        key={postHash}
        
      >
     
                      
                      <UnstyledButton component={Link} href={`/wave/${singlePost.ProfileEntryResponse?.Username}`}>
                              <Group justify='center'>
                          <Avatar
                            radius="xl"
                            size="lg"
                            src={`https://node.deso.org/api/v0/get-single-profile-picture/${singlePost.ProfileEntryResponse?.PublicKeyBase58Check}`}
                          />
  
                          <Text fw={500} size="md">
                          {singlePost.ProfileEntryResponse?.Username}
                          </Text>
                          </Group>
                        </UnstyledButton>
                     
      
      
        <Spoiler
          maxHeight={222}
          showLabel={
            <>
              <Space h="xs" />
              <Tooltip label="Show More">
                <IconScriptPlus />
              </Tooltip>
            </>
          }
          hideLabel={
            <>
              <Space h="xs" />
              <Tooltip label="Show Less">
                <IconScriptMinus />
              </Tooltip>
            </>
          }
        >
        
        <Space h="xl" />
            
            <Text
              ta="center"
              size="md"
            fw={333}
              dangerouslySetInnerHTML={{
                __html: replaceURLs(
                  singlePost && singlePost.Body
                    ? singlePost.Body.replace(/\n/g, "<br> ")
                    : ""
                ),
              }}
            /> 
          
        </Spoiler>

        <Space h="xl" />
        {singlePost.ImageURLs && (
              <Group justify="center">
               <UnstyledButton
                      onClick={() => {
                        setSelectedImage(singlePost.ImageURLs[0]);
                        open();
                      }}
                    >
                  <Image
                    src={singlePost.ImageURLs[0]}
                    radius="md"
                    alt="post-image"
                    fit="contain"
                  />
                </UnstyledButton>
              </Group>
            )}
             {singlePost.VideoURLs && (
                  <iframe
                    style={{ width: "100%", height: "100%" }}
                    src={singlePost.VideoURLs}
                    title={singlePost.PostHashHex}
                  />
                )}
        {singlePost.PostExtraData?.EmbedVideoURL && (
          
          <Group  style={{
                   
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                        <iframe
                          style={{
                            height: "50vh",
                            width: "100vw",
                            border: "none",
                            borderRadius: "22px",
                          }} title="embed" src={singlePost.PostExtraData.EmbedVideoURL} />
</Group>


        )}

{singlePost.RepostedPostEntryResponse && (
                  <Paper
                    m="md"
                    shadow="lg"
                    radius="md"
                    p="xl"
                    withBorder
                    key={singlePost.RepostedPostEntryResponse.PostHashHex}
                    
                  >
                    <Center>
                    <UnstyledButton component={Link} href={`/wave/${
                            singlePost.RepostedPostEntryResponse.ProfileEntryResponse
                              ?.Username
                          }`}>
                        <Avatar
                          radius="xl"
                          size="lg"
                          src={
                            singlePost.RepostedPostEntryResponse?.ProfileEntryResponse
                              ?.ExtraData?.LargeProfilePicURL ||
                            `https://node.deso.org/api/v0/get-single-profile-picture/${singlePost.RepostedPostEntryResponse?.ProfileEntryResponse?.PublicKeyBase58Check}`
                          }
                        />

                        <Space w="xs" />
                        <Text fw={500} size="md">
                          {
                            singlePost.RepostedPostEntryResponse.ProfileEntryResponse
                              ?.Username
                          }
                        </Text>
                      </UnstyledButton>
                    </Center>
                    
                    <Spoiler
                      maxHeight={222}
                      showLabel={
                        <>
                          <Space h="xs" />
                          <Tooltip label="Show More">
                            <IconScriptPlus />
                          </Tooltip>
                        </>
                      }
                      hideLabel={
                        <>
                          <Space h="xs" />
                          <Tooltip label="Show Less">
                            <IconScriptMinus />
                          </Tooltip>
                        </>
                      }
                    >
                      <Space h="xl" />
                 
                        <Space h="sm" />
                        <Text
                          ta="center"
                          size="md"
                          
                          dangerouslySetInnerHTML={{
                            __html: replaceURLs(
                              singlePost.RepostedPostEntryResponse.Body.replace(
                                /\n/g,
                                "<br> "
                              )
                            ),
                          }}
                        />
                 
                    </Spoiler>

                    <Space h="md" />
                    

                    {singlePost.RepostedPostEntryResponse.VideoURLs && (
                      <iframe
                        style={{ width: "100%", height: "100%" }}
                        src={singlePost.RepostedPostEntryResponse.VideoURLs}
                        title={singlePost.RepostedPostEntryResponse.PostHashHex}
                      />
                    )}
                    {singlePost.RepostedPostEntryResponse.ImageURLs &&
                      singlePost.RepostedPostEntryResponse.ImageURLs.length > 0 && (
                        <Group justify="center">
                          <UnstyledButton
                            onClick={() => {
                             
                              open();
                            }}
                          >
                            <Image
                              src={singlePost.RepostedPostEntryResponse.ImageURLs[0]}
                              radius="md"
                              alt="repost-image"
                              fit="contain"
                            />
                         </UnstyledButton>
                        </Group>
                      )}
                  </Paper>
                )}
        <Space h="xl" />
        <Center>
          <Tooltip
            transition="slide-down"
            withArrow
            position="bottom"
            label="Like"
          >
            <ActionIcon
              onClick={() => currentUser && submitHeart()}
              variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 160 }} 
              radius="md"
              size={36}
            >
              {heartSuccess ? (
  <IconHeartFilled size={20} />
) : (
  <IconHeart size={20} />
)}
<Space w={1}/>
<Text size="xs">
            {singlePost?.LikeCount}
          </Text>
            </ActionIcon>
          </Tooltip>
         

          <Space w="sm" />

          <Tooltip
            transition="slide-down"
            withArrow
            position="bottom"
            label="Repost"
          >
            <ActionIcon
              onClick={() => currentUser && submitRepost()}
              variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 160 }} radius="md"
              
              size={36}
            >
              <IconRecycle
                color={repostSuccess ? "#228BE6" : "#FFFFFF"}
                size={20}
              
              />
<Space w={1}/>
<Text size="xs">
            {singlePost?.RepostCount}
          </Text>
            </ActionIcon>
          </Tooltip>
          

          <Space w="sm" />

          <Tooltip
            transition="slide-down"
            withArrow
            position="bottom"
            label="Diamonds"
          >
            <ActionIcon
              onClick={() => currentUser && sendDiamondTip()}
              variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 160 }} radius="md"
              
              size={36}
            >
              <IconDiamond
                color={diamondTipSuccess ? "#228BE6" : "#FFFFFF"}
                size={20}
                
              />
              <Space w={1}/>
              <Text size="xs">
            {singlePost?.DiamondCount}
          </Text>
            </ActionIcon>
          </Tooltip>
          

          <Space w="sm" />

          <Tooltip
            transition="slide-down"
            withArrow
            position="bottom"
            label="Comments"
          >
          
            <ActionIcon variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 160 }} radius="md" size={36}>
              <IconMessageCircle size={20} />
              <Space w={1}/>
              <Text size="xs">
            {singlePost?.CommentCount}
          </Text>
            </ActionIcon>
            
        
          </Tooltip>
          
        </Center>
        <Space h="sm" />
          <>
            {currentUser && currentUser.ProfileEntryResponse ? (
              <>
              <Space h="md"/>
                <Textarea
                  placeholder="Enter your comment..."
                  variant="filled"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                />
                <Space h="sm" />
                <Group position="right">
                  <Button radius="md" onClick={() => submitComment()}>
                    Comment
                  </Button>
                </Group>
              </>
            ) : (
              <>
                <Textarea
                  placeholder="Please Login/Signup or Set username to Comment."
                  description="Your comment"
                  variant="filled"
                  disabled
                />
                <Space h="sm" />
                <Group position="right">
                  <Button radius="md" disabled>
                    Comment
                  </Button>
                </Group>
              </>
            )}
          </>
        
      </Paper>
    
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <>
          
          <Paper
            m="md"
            shadow="lg"
            radius={66}
            p="xl"
            withBorder
            key={comment.PostHashHex}
            
          >
            <Center>
              <UnstyledButton
              component={Link}
              href={`/wave/${comment.ProfileEntryResponse.Username}`}

              >
                <Group>
                <Avatar
                  radius="xl"
                  size="lg"
                  src={`https://node.deso.org/api/v0/get-single-profile-picture/${comment.PosterPublicKeyBase58Check}`}
                />
               
                <Text fw={500} size="sm">
                  {comment.ProfileEntryResponse.Username}
                </Text>

                </Group>
                
              </UnstyledButton>
            </Center>

            <Spoiler
              maxHeight={222}
              showLabel={
                <>
                  <Space h="xs" />
                  <Tooltip label="Show More">
                    <IconScriptPlus />
                  </Tooltip>
                </>
              }
              hideLabel={
                <>
                  <Space h="xs" />
                  <Tooltip label="Show Less">
                    <IconScriptMinus />
                  </Tooltip>
                </>
              }
            >
            
                <Space h="sm" />
                <Text
                  ta="center"
                  size="md"
                 
                  dangerouslySetInnerHTML={{
                    __html: replaceURLs(comment.Body.replace(/\n/g, "<br> ")),
                  }}
                />
           
            </Spoiler>

            {comment.ImageURLs && (
              <Group justify="center">
               <UnstyledButton
                            onClick={() => {
                              setSelectedImage(
                                comment.ImageURLs[0]
                              );
                              open();
                            }}
                          >
                  <Image
                    src={comment.ImageURLs[0]}
                    radius="md"
                    alt="post-image"
                    fit="contain"
                  />
                </UnstyledButton>
              </Group>
            )}
          </Paper>
          
          
          </>
        ))
      ) : (
        <></>
      )}
      <Space h={111}/>
      <Modal opened={opened} onClose={close} size="auto" centered>
        <Image src={selectedImage} radius="md" alt="post-image" fit="contain" />
      </Modal>

    </>
  );
};