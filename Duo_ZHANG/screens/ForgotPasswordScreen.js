import React, { memo, useState } from 'react';
import {Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {emailValidator, passwordValidator} from '../core/utils';
import Background from '../Components/Background';
import BackButton from '../Components/BackButton';
import Header from '../Components/Header';
import TextInput from '../Components/TextInput';
import { theme } from '../core/theme';
import Button from '../Components/Button';
import * as SQLite from 'expo-sqlite'

export default class ForgotPasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            newpassword: ""
        };
    }
   alert(){
        Alert.alert(
            'Erreur',
            'Email ou mot de passe incorrect',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    }
  onSendPressed = ()=>{
        const emailError = emailValidator(this.state.email);
        const newpasswordError = passwordValidator(this.state.newpassword)

        const db = SQLite.openDatabase("database.db"); 
        const {navigate} = this.props.navigation;

        if (emailError || newpasswordError) {
            this.alert()
            return;
        }else{
            db.transaction(
                tx => {
                    tx.executeSql("update user set mdp = ? where mail = ?", [this.state.newpassword, this.state.email]);
                }
            );
        }

        navigate('Loginscreen');
    };

    render(){
        
        const {navigate} = this.props.navigation;
        return (
            <Background>
                <BackButton goBack={() => navigate('Loginscreen')} />
                <Header>Reinitialiser son mot de passe</Header>

                <TextInput
                    label="E-mail address"
                    returnKeyType="next"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
                <TextInput
                    label="New password"
                    returnKeyType="done"
                    value={this.state.newpassword}
                    onChangeText={text => this.setState({ newpassword: text })}
                    autoCapitalize="none"
                />

                <Button mode="contained" onPress={this.onSendPressed} style={styles.button}>
                    Valider
                </Button>
            </Background>
        );
    }
}

const styles = StyleSheet.create({
    back: {
        width: '100%',
        marginTop: 12,
    },
    button: {
        marginTop: 12,
    },
    label: {
        color: theme.colors.secondary,
        width: '100%',
    },
});

