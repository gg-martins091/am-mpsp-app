import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import firebase from '../../utils/firebase';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
  constructor() {
    super();
    this.unsubscriber = null;
    this.state = {
      user: null,
      message: '',
      error: '',
      email: '',
      password: '',
      loading: false,
      item: [],
      showForm: false,
    };
  }

  render() {
    return <View />;
  }
}
