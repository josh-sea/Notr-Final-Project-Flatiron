import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react'


const Header = ({handleMenuClick}) => (
  <div>
  <Menu attached='top'>
    <Dropdown item icon='bars' simple>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleMenuClick} id='save'>Save...</Dropdown.Item>
        <Dropdown.Item onClick={handleMenuClick} id='delete'>Delete...</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Export</Dropdown.Header>
        <Dropdown.Item onClick={handleMenuClick} id='share'>Share</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    <Menu.Menu position='right'>
      <div className='ui right aligned category search item'>
        <div className='ui transparent icon input'>
          <input className='prompt' type='text' placeholder='Search tags...' />
          <i className='search link icon' />
        </div>
        <div className='results' />
      </div>
    </Menu.Menu>
  </Menu>
  </div>
);

export default Header;
