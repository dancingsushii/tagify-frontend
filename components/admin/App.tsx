import React from 'react';
import { Route } from 'react-router-dom';
import { Albums } from './Albums';
import { NavBar } from './NavBar';
import { UserList, UserCreate } from './Users';
import { Admin, Resource, ListGuesser, EditGuesser} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import UserIcon from '@material-ui/icons/Group';
import AlbumIcon from '@material-ui/icons/Book';
import authProvider from './authProvider';
import { Login } from './Login';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

export function App() {

  return (
    <>
      <NavBar />
      <Admin dataProvider={dataProvider} authProvider={authProvider} >
        <Resource name="users" list={UserList} edit={EditGuesser} create={UserCreate} icon={UserIcon} />
        <Resource name="albums" list={ListGuesser} icon={AlbumIcon} />
        
      </Admin>
    </>
  );
}
