import React, { Component } from 'react';

import {
    Container,
    Logo,
    Input,
    ErrorMessage,
    Button,
    ButtonText,
    SignUpLink,
    SignUpLinkText,
  } from './styles';

import { StackActions, NavigationActions } from 'react-navigation';

import { StatusBar } from 'react-native';

import api from '../../utils/firebase';
import { setData } from '../../utils/storage';

export default class Login extends Component {
    static navigationOptions = {
        header: null,
    };

    state = { email: '', password: '', error: '' };
    
    handleEmailChange = (email) => {
        this.setState({ email });
      };
      
    handlePasswordChange = (password) => {
        this.setState({ password });
    };

    handleSignInPress = async () => {
        if (this.state.email.length === 0 || this.state.password.length === 0) {
          this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
        } else {
          try {
            const response = await api.post('/login', {
              email: this.state.email,
              password: this.state.password,
            });
              
            await setData('ammpsp@token', response.data.token);
            await setData('ammpsp@id', response.data.user_id);
    
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Dashboard' }),
              ],
            });
            this.props.navigation.dispatch(resetAction);
          } catch (_err) {
            this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
          }
        }
      };

    render() {
        return (
          <Container>
        <StatusBar hidden />
        <Logo source={require('../../../assets/logo.png')} resizeMode="contain" />
        <Input
          placeholder="Endereço de e-mail"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Senha"
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        {this.state.error.length !== 0 && <ErrorMessage>{this.state.error}</ErrorMessage>}
        <Button onPress={this.handleSignInPress}>
          <ButtonText>Entrar</ButtonText>
        </Button>
      </Container>
        );
    }
}
