import React from 'react';
import Icon1 from '../../images/Dash1.png';
import Icon2 from '../../images/MouseClicker.png';
import Icon3 from '../../images/Security Made Right.png';
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP
} from './ServicesElements';

const Services = () => {
  return (
    <ServicesContainer id='services'>
      <ServicesH1>Our Services</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2>Elegant Dashboard</ServicesH2>
          <ServicesP>
            We help reduce your stress of navigating through a mess of a design. Our beautiful dashboard makes it simple for you to navigate through!
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH2> Easy/Quick Transactions</ServicesH2>
          <ServicesP>
            Our elegant dashboard makes your transactions super quick! If you need to transfer funds before your train arrives, no worries! Mirai is here for your quick financial needs!
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2>Security Made Right</ServicesH2>
          <ServicesP>
            With Mirai, we make sure your information is not seen by anyone else, but you! We take security to the next level, providing you with a  that your information will never be leaked!
          </ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;
