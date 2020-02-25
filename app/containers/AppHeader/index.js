// App Headers

// This component is for the header for the application

import React from 'react';
import { Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl';

import Header from './header';
import HeaderTitle from './header-title';
import messages from './messages';
import HeaderButton from './header-button';

export default function AppHeader() {
    return (
        <Header>
            <HeaderTitle>
                <FormattedMessage {...messages.headerTitle} />
            </HeaderTitle>
            <Link to="/home">
                <HeaderButton buttonText={messages.homeButtonText}>
                </HeaderButton>
            </Link>
        </Header>
    );
}