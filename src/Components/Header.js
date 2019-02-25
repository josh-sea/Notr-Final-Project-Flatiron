import React from 'react';
import { Dropdown, Menu, Icon } from 'semantic-ui-react'


const Header = ({handleMenuClick}) => (
  <div style={{background: '#333'}}>
  <Menu attached='top' inverted >
    <Dropdown item icon='setting' simple>
      <Dropdown.Menu>
        <Dropdown.Item>
          <Icon name='dropdown' />
            <span className='text'id='new'>New...</span>
              <Dropdown.Menu>
               <Dropdown.Item onClick={handleMenuClick} id='new-classroom'>New Classroom...</Dropdown.Item>
               <Dropdown.Item onClick={handleMenuClick} id='new-note'>New Note...</Dropdown.Item>
              </Dropdown.Menu>
        </Dropdown.Item>
        <Dropdown.Item onClick={handleMenuClick} id='save'>Save...</Dropdown.Item>
        <Dropdown.Item onClick={handleMenuClick} id='delete'>Delete...</Dropdown.Item>
        <Dropdown.Item onClick={handleMenuClick} id='logout'>Logout...</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Export</Dropdown.Header>
        <Dropdown.Item onClick={handleMenuClick} id='share'>Share</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    <Menu.Item header>Notr</Menu.Item>
    <Menu.Menu position='right'>
      <div className='ui right aligned category search item'>
        <div className='ui transparent icon input'>
          <input className='prompt' style={{color: 'white'}} type='text' placeholder='Search all notes...' />
          <i className='search link icon' />
        </div>
        <div className='results' />
      </div>
    </Menu.Menu>
  </Menu>
  </div>
);

export default Header;
