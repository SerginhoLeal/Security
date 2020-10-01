import React from 'react';
import Routes from './routes';
import {LogBox} from 'react-native'

const src = () => {
  LogBox.ignoreAllLogs(true)
  return (
    <>
      <Routes />
    </>
  );
  //2532554
}

export default src;