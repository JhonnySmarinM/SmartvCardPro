import React from 'react'
import Container from './layouts/Container'
import Image from './layouts/Image'

const BigAdd = () => {
  return (
    <section className='sm:mt-[80px] lg:mt-[130px] mt-16'>
      <Container>
        <Image imgSrc="./assets/bigadd.webp" imgAlt="bigadd" />
      </Container>
    </section>
  );
}

export default BigAdd