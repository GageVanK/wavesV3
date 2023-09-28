
import { ThemeIcon, Text, Title, Container, SimpleGrid, rem, Center, Button, Space } from '@mantine/core';
import { VscLink } from "react-icons/vsc";
import { BiWorld } from "react-icons/bi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { GiBigWave  } from "react-icons/gi";
import { RiDatabaseLine } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { PiUsersThreeDuotone } from "react-icons/pi";
import { GiWaveCrest } from "react-icons/gi";
import classes from './Welcome.module.css';
import { ERROR_TYPES, identity } from 'deso-protocol';

export const WAVESFEATURE = [
  {
    icon: GiBigWave,
    title: 'Why Waves?',
    description:
      'Waves is not a shitcoin. Waves leverages the true power of Crypto and Blockchain technology via the DeSo Blockchain to provide real utility to Streamers!',
  },
  {
    icon: RiDatabaseLine,
    title: 'On-Chain Storage',
    description:
      'Waves is built on the DeSo Blockchain, offering an alternative to private, centralized databases. It enables transparent data allowing users as much access as the builders. Traditional social platforms often use private data to sell to advertisers, but Waves provides a storage alternative to mitigate this practice.',
  },
  {
    icon: BiWorld,
    title: 'Open Source',
    description:
      'Waves is open source and allows for Algorithm Audits, eliminating guesswork around the magic algorithm.',
  },
  {
    icon: MdOutlineAttachMoney,
    title: 'Monetization',
    description:
      'Waves is powered by Deso Wallets, enabling instant Fan-to-Creator Subscription payments. No more jumping through hoops to monetize your content. Currently, Waves pays out 100% directly to creators. Future Waves versions may take up to 20% for platform expenses.',
  },
  {
    icon: RiCheckboxMultipleLine,
    title: 'Multi-Platform Streaming',
    description:
      'Waves aims to empower streamers by providing tools to stream to multiple platforms right from your Waves Dashboard, maximizing your audience. Currently, waves supports multistreaming to YouTube, Kick, and Twitch. Additional platforms can be added upon request.',
  },
  {
    icon: PiUsersThreeDuotone,
    title: 'Community Oriented',
    description:
      'Waves prioritizes user experience and plans to democratize social media through on-chain voting to determine feature development and the platforms direction.',
  },
  {
    icon: VscLink,
    title: 'Blockchain Social',
    description:
      'Waves leverages blockchain technology to facilitate interoperability between platforms, ensuring that your content remains accessible across all Deso Apps and is Censorship Resistant.',
  },
  {
    icon: GiReceiveMoney,
    title: 'NFT Streams & Clips',
    description:
      'Future versions of Waves will support NFT Streams and Clips, giving streamers greater longevity and complete control over pricing and royalty percentages of any future sales of the NFT.',
  },
];

interface FeatureProps {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      </ThemeIcon>
      <Text fw={500} mt="sm" mb={7}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  );
}

export function Welcome() {
  const features = WAVESFEATURE.map((feature, index) => <Feature {...feature} key={index} />);

  return (
    <Container className={classes.wrapper}>
      <Center>
        
      <Text size="xl" fw={900} fs="italic" variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 176 }}>Waves</Text>
      </Center>
      <Container size={560} p={0}>
      <Center>
        <Text fw={700} c="dimmed" size="md">
          Decentralized Live Streaming
        </Text>
      </Center>
      </Container>
    
      <SimpleGrid
        mt={60}
        cols={{ base: 1, sm: 1, md: 1 }}
        spacing={{ base: 'xl', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        {features}
      </SimpleGrid>
<Space h="sm"/>
      <Button
            gradient={{ from: 'blue', to: 'cyan', deg: 354 }}
       fullWidth
          leftSection={<GiWaveCrest size="1rem" />}
          variant="gradient"
          radius="lg"
    
          onClick={() => {
            identity
              .login({
                getFreeDeso: true,
              })
              .catch((err) => {
                if (err?.type === ERROR_TYPES.NO_MONEY) {
                  alert("You need DESO in order to post!");
                } else {
                  alert(err);
                }
              });
          }}
        >
          Sign Up
        </Button>
    </Container>
  );
}