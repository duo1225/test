import React from 'react';
import Background from '../Components/Background';
import Header from '../Components/Header';
import Button from '../Components/Button';


export default class HomeScreen extends React.Component {
    render(){
        const {navigate} = this.props.navigation;
        return (
            <Background>
                <Header>Connexion/Inscription</Header>
                <Button mode="contained" onPress={() => navigate('Loginscreen')}>
                    Connexion
                </Button>
                <Button
                    mode="outlined"
                    onPress={() => navigate('Registerscreen')}
                >
                    Inscription
                </Button>
            </Background>
        );
    }
}

