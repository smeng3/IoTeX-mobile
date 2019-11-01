import React from 'react';
import {
  ScrollView,
  StyleSheet,
  WebView,
  AppRegistry,
  Text,
  View,
  Button,
  Alert,
  Linking,
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'News',
  };
  render() 
  {
    return (
      <WebView
      source={{
        uri: 'https://iotex.io/news/mobile'
        }}
        />
      )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
