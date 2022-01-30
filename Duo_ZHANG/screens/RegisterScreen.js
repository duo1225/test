import React, { memo, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Background from '../Components/Background';
import Header from '../Components/Header';
import Button from '../Components/Button';
import TextInput from '../Components/TextInput';
import BackButton from '../Components/BackButton';
import { theme } from '../core/theme';
import {
    emailValidator,
    passwordValidator,
    nameValidator,
} from '../core/utils';
import * as SQLite from 'expo-sqlite'

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: ""
        };
    }
   
    onSignUppPressed = ()=>{
        const nameError = nameValidator(this.state.name);
        const emailError = emailValidator(this.state.email);
        const passwordError = passwordValidator(this.state.password);
        var user = [];

        const db = SQLite.openDatabase("database.db");
        db.transaction(tx => {
            tx.executeSql("create table if not exists user (id integer primary key not null, name text, mail text, mdp text);");
        });
       
        const {navigate} = this.props.navigation;
        if (emailError || passwordError || nameError) {
             this.alerte();
            return;
        } else {
            db.transaction(
                tx => {
                    tx.executeSql("insert into user (name, mail, mdp) values (?, ?, ?)", [this.state.name, this.state.email, this.state.password]);
                }
            );
            navigate('Dashboard', {username: this.state.name});
        }

    };
  alerte(){
        console.log("je passe this func")
        Alert.alert(
            'Erreur',
            'Login ou mot de passe incorrect',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    }
    render() {    
        const {navigate} = this.props.navigation;
        return (
            <Background>
                <BackButton goBack={() => navigate('Homescreen')}/>

                <Header>Inscription</Header>

                <TextInput
                    label="Nom"
                    returnKeyType="next"
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: text })}
                />

                <TextInput
                    label="E-mail"
                    returnKeyType="next"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />

                <TextInput
                    label="Mot de passe"
                    returnKeyType="done"
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                    secureTextEntry
                />
                <Button mode="contained" onPress={this.onSignUppPressed} title="Inscription" style={styles.button}>
                    Inscription
                </Button>
                <View style={styles.row}>
                    <Text style={styles.label}>Déja inscrit ? </Text>
                    {/* <TouchableOpacity onPress={() => navigate('Loginscreen', {users: users})}> */}
                
                    <TouchableOpacity onPress={() => navigate('Loginscreen')}>
                        <Text style={styles.link}>Connectez-vous</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        );
    }
};

const styles = StyleSheet.create({
    label: {
        color: theme.colors.secondary,
    },
    button: {
        marginTop: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});

