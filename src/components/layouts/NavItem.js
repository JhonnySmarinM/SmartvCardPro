import React from 'react'

const NavItem = ({children,className}) => {
  return (
    <ul className={className}>
        {children}
    </ul>
  )
}

export default NavItem