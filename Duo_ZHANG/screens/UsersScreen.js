import React, { Component } from 'react';
import {List } from 'antd-mobile';
import * as SQLite from 'expo-sqlite';
import '../node_modules/antd-mobile/dist/antd-mobile.css'

import Background from '../Components/Background';
import Header from '../Components/Header';
import Paragraph from '../Components/Paragraph';
import Button from '../Components/Button';



export default class UsersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        users:['tom']
    };
}
componentDidMount(){
  const db = SQLite.openDatabase("database.db");
  var {users} = this.state
  var newUsers =[];
  db.transaction(
    tx => {
        tx.executeSql("select * from user", [], (tx,results) =>{
          var len = results.rows.length;
          for (let i = 0; i < len; i++) {
            var u = results.rows.item(i);
            newUsers.push(u.name);
            //console.log("newUsers2",newUsers2)
            this.setState({
              users:newUsers
            })

          }
        
          }
        );
    }
);
      
}
  render() {
 
    console.log(this.props);
    console.log(this.props.navigation.state.params)
    return (
    <div>
                <Background>

                    <h2>List de utilisateurs: </h2>
                      <List header='List de utilisateurs'>
                        {this.state.users.map(user => (
                           <List.Item
                             key={user}
                            description="utilisateur normal"
                            >
                               {user} : utilisateur normal
                          </List.Item>
                  ))}
                </List>

                    <Button mode="outlined" onPress={() => this.props.navigation.navigate('Homescreen')}>
                        Déconnexion
                    </Button>
                </Background>
    </div>);
  }
}
