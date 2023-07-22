import React from 'react';
import './animation.css';
import { motion } from 'framer-motion';
import { Container } from './AnimationElements';

const cardVariants = {
  offscreen: {
    y: 300
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const hue = (h) => `hsl(${h}, 100%, 50%)`;

function Card({ text, hueA, hueB }) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <Container>
  
    <motion.div
      className='card-container'
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ once: false, amount: 0.8 }}
    >
      <div className='splash' style={{ background }} />
      <motion.div className='card' variants={cardVariants}>
        {text}
      </motion.div>
    </motion.div>
    
    </Container>
  );
}

const word = [
  ['Why', 340, 10],
  ['Dont', 20, 40],
  ['You', 60, 90],
  ['Just', 80, 120],
  ['Find', 150, 140],
  ['Some', 205, 245],
  ['One', 260, 290],
  ['👾', 290, 320]
];

export default function Animation() {
  return word.map(([text, hueA, hueB]) => (
  
    <Card text={text} hueA={hueA} hueB={hueB} key={text} />

  ));
}
