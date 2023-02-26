import React from 'react'
import Container from './layouts/Container'
import Image from './layouts/Image'

const BigAdd = () => {
  return (
    <section className='sm:my-[80px] lg:my-[130px] my-16 '>
      <Container>
        <Image imgSrc="./assets/bigadd.webp" imgAlt="bigadd" />
      </Container>
    </section>
  );
}

export default BigAdd