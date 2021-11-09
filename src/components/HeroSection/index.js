import React, {} from 'react';

import Video from '../../videos/video.mp4';
import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
} from './HeroElements';

function HeroSection() {

  return (
    <HeroContainer id='home'>
      <HeroBg>
        <VideoBg playsInline autoPlay loop muted src={Video} type='video/mp4' />
      </HeroBg>
      <HeroContent>
        <HeroH1>Mirai, Our Future of Finance</HeroH1>
        <HeroP>
          Sign up or sign in today for the best experience for any type of finance transaction!
        </HeroP>
      </HeroContent>
    </HeroContainer>
  );
}

export default HeroSection;
