import React from 'react';
import { Alert, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../Components/Background';
import Header from '../Components/Header';
import Button from '../Components/Button';
import TextInput from '../Components/TextInput';
import BackButton from '../Components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import * as SQLite from 'expo-sqlite'

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

  alert(){
      Alert.alert(
            'Erreur',
            'Login ou mot de passe incorrect',
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
        );
    }

  onLoginPressed = () =>{
        const emailError = emailValidator(this.state.email);
        const passwordError = passwordValidator(this.state.password);

        const {navigate} = this.props.navigation;

        if (emailError || passwordError) {
            alert("Email ou mot de passe incorrect!");
            return;
        }
        var good = false
        var user = null;

        const db = SQLite.openDatabase("database.db");
        //check users
        db.transaction(
            tx => {
                tx.executeSql("select * from user", [], (_, {rows}) =>{
                    for (let i = 0; i < rows.length; i++) {
                        if(rows[i]["mail"] == this.state.email && rows[i]["mdp"] == this.state.password){
                            good = true;
                            user = rows[i];
                            return navigate('Dashboard', {username: user['name']});
                        }
                     }
                     alert("Email ou mot de passe incorrect!");
                }
                );
            }
        );

        var isvalid = false;
        var user = null;

    };
    render(){
        const {navigate} = this.props.navigation;
        return (
            <Background>
                <BackButton goBack={() => navigate('Homescreen')} />

                <Header>Connexion</Header>

                <TextInput
                    label="Email"
                    returnKeyType="next"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />

                <TextInput
                    label="Password"
                    returnKeyType="done"
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                    secureTextEntry
                />

                <Button mode="contained" onPress={this.onLoginPressed}>
                    Connexion
                </Button>

                <View style={styles.row}>
                    <TouchableOpacity onPress={() => navigate('Registerscreen')}>
                        <Text style={styles.link}>S'inscrire</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('ForgotPasswordscreen')}>
                        <Text style={styles.link}>Mot de passe oublié</Text>
                    </TouchableOpacity>
                </View>
            </Background>
        );

    }

};

const styles = StyleSheet.create({
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    label: {
        color: theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginLeft: 10
    },
});

