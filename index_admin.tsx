import React, { useEffect, useState } from 'react';
import { Admin, ListGuesser, Resource } from 'react-admin';
import ReactDOM from 'react-dom';

import AlbumIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

import AdminDataProvider from './components/admin/AdminDataProvider';
import { AlbumsEdit, AlbumsList } from './components/admin/Albums';
import { MyAuthProvider, MyLogoutButton } from './components/admin/MyLogoutButton';
import { UserCreate, UserEdit, UserList } from './components/admin/Users';
import BackendToken, { Default, Status, UserRole } from './utils/BackendAPI';

export function App() {
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      let response = await Default.getUser();
      let code = response.status;
      let role: UserRole | undefined = response.data?.role;
      BackendToken.authenticated = code == Status.Ok;
      BackendToken.userRole = role;
      BackendToken.nickname =
        response.data == undefined ? "" : response.data.nickname;
      if (BackendToken.userRole != UserRole.Admin) {
        window.location.replace("/welcome");
      }
      setRender(true);
    })();
  }, []);
  if (BackendToken.isAuthenticated && BackendToken.userRole == UserRole.Admin) {
    return (
      <>
        <Admin
          dataProvider={AdminDataProvider}
          loginPage={false}
          logoutButton={MyLogoutButton}
          authProvider={MyAuthProvider}
        >
          <Resource
            name="users"
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
            icon={UserIcon}
            exporter={false}
          />
          <Resource
            name="albums"
            list={AlbumsList}
            edit={AlbumsEdit}
            icon={AlbumIcon}
            exporter={false}
          />
        </Admin>
      </>
    );
  } else {
    return null;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
