import * as React from 'react';
import { createStyles, Container, Title, Text, Button, Image } from '@mantine/core';
import wandImg from '/img/header/wand.svg';
import vibratorImg from '/img/header/vibrator.svg';
import protogenImg from '/img/header/protogen.svg';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: '#000', //'#11284b',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage:
      'linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 90%), url(https://buttplug.io/images/buttplug_logo.png)',
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
  },

  backgroundAnim: {
    position: "absolute",
    right: 0,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  image: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  content: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: 500,
    fontSize: 48,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      fontSize: 34,
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    opacity: 0.75,
    maxWidth: 500,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
    },
  },

  control: {
    paddingLeft: 50,
    paddingRight: 50,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 22,

    [theme.fn.smallerThan('md')]: {
      width: '100%',
    },
  },
}));

export function HeroImage() {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.backgroundAnim}>
        <Image src={wandImg} className={classes.image} />
      </div>

      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Finally, a {' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'purple' }}
              >
                Plugin
              </Text>{' '}
              For Every Hole
            </Title>

            <Text className={classes.description} mt={30}>
              Buttplug is an open-source standards and software project for controlling intimate hardware, including sex toys, fucking machines, and more. 
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
              size="xl"
              className={classes.control}
              mt={40}
            >
              Get started
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}