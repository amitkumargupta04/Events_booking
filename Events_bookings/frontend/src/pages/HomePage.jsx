import React from 'react'
import Video from '../components/home/Video';
import Conferences from '../components/home/Conferences';
import PricingTickets from '../components/home/PricingTickets';
import FAQ from '../components/home/FAQ';
import MeetAllItMan from '../components/home/MeetAllItMan';
import About from '../components/home/About';

function HomePage() {
  return (
    <div>
      <MeetAllItMan/>
      <About/>
      <Video/>
      <Conferences/>
      <PricingTickets/>
      <FAQ/>
    </div>
  )
}

export default HomePage;