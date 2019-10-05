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
    SimpleContainer
  } from './styles';

import { StackActions, NavigationActions, View } from 'react-navigation';

import { StatusBar, KeyboardAvoidingView, Text } from 'react-native';

import api from '../../utils/api';
import { setData } from '../../utils/storage';

export default class Login extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = { email: '', password: '', error: '' };
    }

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
            await setData('ammpsp@id', response.data.user_id.toString());
    
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Dashboard' }),
              ],
            });
            this.props.navigation.dispatch(resetAction);
          } catch (_err) {
              console.log(_err);
            this.setState({ response: JSON.stringify(_err), error: 'Houve um problema com o login, verifique suas credenciais!' });
          }
        }
      };

    render() {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
            >
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
            {this.state.response && <Text>{this.state.response}</Text>}
        </Container>
      </KeyboardAvoidingView>
        );
    }
}
