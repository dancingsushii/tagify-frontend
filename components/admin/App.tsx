import React from 'react';
import { UserList, UserCreate, UserEdit } from './Users';
import { Admin, Resource, ListGuesser} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import UserIcon from '@material-ui/icons/Group';
import AlbumIcon from '@material-ui/icons/Book';
import authProvider from './authProvider';

// dummy data as JSON placeholder (read-only) 
// TODO replace with real API 
const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

// https://marmelab.com/react-admin/Tutorial.html
// tutorial for react admin tool 
export function App() {

  return (
    <>
      <Admin dataProvider={dataProvider} authProvider={authProvider}>
        <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon} />
        <Resource name="albums" list={ListGuesser} icon={AlbumIcon} />
      </Admin>
    </>
  );
}
