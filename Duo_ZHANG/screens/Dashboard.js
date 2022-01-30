import React, { memo } from 'react';
import Background from '../Components/Background';
import Header from '../Components/Header';
import Paragraph from '../Components/Paragraph';
import Button from '../Components/Button';

import UsersScreen from './UsersScreen';
;


export default class Dashboard extends React.Component{
    render(){
            return (
                <Background>
                    <Header>Vous etes connecté</Header>
                    <Paragraph>
                        Bienvenu {this.props.navigation.state.params.username} sur notre application
                    </Paragraph>
                    <Button mode="outlined" onPress={() => this.props.navigation.navigate('UsersScreen')}>
                        List de utilisateurs
                    </Button>
                    <Button mode="outlined" onPress={() => this.props.navigation.navigate('Homescreen')}>
                        Déconnexion
                    </Button>
                </Background>
            );

    }

};
