import React from 'react'
import Breadcrumbs from '../components/layouts/Breadcrumbs';
import Container from '../components/layouts/Container';
import Flex from '../components/layouts/Flex';
import Title from '../components/layouts/Title';

const Shop = () => {
    console.log(window.location.pathname.split("/"));
  return (
    <section className="mt-[124px]">
      <Container>
        <Title title="products" className="text-[49px]" />
        <Breadcrumbs
          link1="/"
          value1="home"
          link2="/shop"
          value2={window.location.pathname.split("/")[1]}
        />
        <Flex className="flex items-center gap-x-10 mt-[130px]">
            <div className='bg-red-500 w-[25%]'>asdasd</div>
            <div className='bg-red-500 w-[75%]'>asdasd</div>
        </Flex>
      </Container>
    </section>
  );
}

export default Shop