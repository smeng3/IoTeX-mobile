import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native';
import { WebBrowser } from 'expo';


import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Forum',
  };
    state = {
      cookie : ''
    }

//Function to check state of webview and save cookie
_onNavigationStateChange(webViewState) {
  var cookie;
  if (webViewState.url == 'https://forum.iotex.io/result?msg=auth.error.not_login'){
     cookie = '';//If user log out from forum, we clear the cookie
     this.setState({ cookie: cookie });
  }
  if (webViewState.url =='https://iotex.io/login?next=https%3A%2F%2Fforum.iotex.io%2F'){
    // cookie = webViewState.jsEvaluationValue 
    // webViewState.jsEvaluationValue is the whole content of the webview, need to apply filters to get cookie
    // Testing by using code below
    cookie = 'iotex_b=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIi' +
    'OjMwNTk3MiwianRpIjoyOTksImV4cCI6MTU0MjE0MTM1NjY0NCwiaWF0IjoxNTM'+
    '0MzY1MzU2fQ.iKIY19NIvGgHmnQmVru6FYyJmS941dcYpaPhN1VH83o';
    this.setState({ cookie: cookie });
  }
}

  render() {
    return (
      <WebView
        source={{
          uri: 'https://forum.iotex.io/',
          headers: {
            cookie: this.state.cookie
                   }
           }}
          javaScriptEnabled = {true}
          //Use injected JS function to get inner HTML
          injectedJavaScript={'(function(){return document.body.innerHTML}());'}
          //Run the function outside to save the cookie
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
      />
  );


  }




  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
