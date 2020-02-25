// Home Page Side Navigation

// This component includes the Navigation for the homepage

import React from 'react';
import SideNav from '../../components/SideNav/index';
import NavTile from '../../components/NavTile/index';
import NavElement from '../../components/NavElement/index';

export default function HomePageSideNav() {
    return (
        <SideNav>
            <NavTile>
                <NavElement>Boards</NavElement>
            </NavTile>
        </SideNav>
    );
}