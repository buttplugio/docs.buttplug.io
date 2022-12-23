import * as React from 'react';
import {
  ThemeIcon,
  Text,
  Title,
  Container,
  SimpleGrid,
  useMantineTheme,
  createStyles,
  Card,
  Image,
} from '@mantine/core';
import squidplugImg from "/img/header/squidplug.png";
import codeImg from "/img/header/code.png";
import hardwareImg from "/img/header/hardware.png";
//import { IconGauge, IconCookie, IconUser, IconMessage2, IconLock, TablerIcon } from '@tabler/icons';

export const MOCKDATA = [
  {
    image: codeImg,
    title: 'Code For Every Butt',
    description:
      'Implemented in Rust, with bindings for C#, JS, and other languages.',
  },
  {
    image: squidplugImg,
    title: 'Too Many Connection Types',
    description:
      'Bluetooth LE, HID, Serial, USB, Network, and other hardware connection types available.',
  },
  {
    image: hardwareImg,
    title: 'Hardware You Love/Loves You',
    description:
      'Support for popular brands, such as Lovense, Kiiroo, WeVibe, The Handy, OSR-2 / SR-6, and more.',
  },
];

interface FeatureProps {
  //icon: TablerIcon;
  image: any;
  title: React.ReactNode;
  description: React.ReactNode;
}

const useStyles = createStyles((theme) => ({
  wrapper: {
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  card: {
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: "100%",
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },
}));

interface FeaturesGridProps {
  title: React.ReactNode;
  description: React.ReactNode;
  data?: FeatureProps[];
}

export function FeaturesGrid({ title, description, data = MOCKDATA }: FeaturesGridProps) {
  const { classes, theme } = useStyles();
  const features = MOCKDATA.map((feature) => (
    <Card key={feature.title} shadow="md" radius="lg" className={classes.card}>
      { feature.image &&
        <Card.Section>
          <Image
            src={feature.image}
            height={160}
          />
        </Card.Section>
      }
      <Text size="md" weight={600} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text size="sm" color="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>{title}</Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          {description}
        </Text>
      </Container>

      <SimpleGrid
        cols={3}
        spacing={theme.spacing.xl * 2}
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'xl' },
          { maxWidth: 755, cols: 1, spacing: 'xl' },
        ]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}