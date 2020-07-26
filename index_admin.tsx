import React from 'react';
import { Admin, Resource } from 'react-admin';
import ReactDOM from 'react-dom';

import AlbumIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

import AdminDataProvider from './components/admin/AdminDataProvider';
import { AlbumsEdit, AlbumsList } from './components/admin/Albums';
import { UserCreate, UserEdit, UserList } from './components/admin/Users';

// https://marmelab.com/react-admin/Tutorial.html
// tutorial for react admin tool
export function App() {
  return (
    <>
      <Admin dataProvider={AdminDataProvider}>
        <Resource
          name="users"
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
          icon={UserIcon}
        />
        <Resource
          name="albums"
          list={AlbumsList}
          edit={AlbumsEdit}
          icon={AlbumIcon}
        />
      </Admin>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
