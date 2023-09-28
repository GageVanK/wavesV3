import { GiWaveCrest } from 'react-icons/gi';
import { FaUsers } from 'react-icons/fa';
import { BsFire } from 'react-icons/bs';

import { SignAndSubmitTx } from '../components/SignAndSubmit/SubmitPost';
import { Center, Group, Space, Container } from '@mantine/core';
import { useState } from 'react';
import { HomeTabs } from '@/components/HomeTabs/HomeTabs';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string | null>('first');
  
  return (
    <>
 
    <SignAndSubmitTx />
    <Space h="md" />
   
  
    <HomeTabs/>
     


    
      

      <Space h="md" />

     
    </>
  );
}
