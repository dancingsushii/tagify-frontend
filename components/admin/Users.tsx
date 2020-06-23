import * as React from "react";
import { List, Datagrid, TextField, EmailField, EditButton, Create, SimpleForm, ReferenceInput, SelectInput, TextInput, Filter, DeleteButton, Edit } from 'react-admin';

// TODO: GET lists all users
export const UserList = props => (
  <List filters={<UserFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="password" />
            <TextField source="role" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
  </List>
);

// TODO: POST create new user
export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Create>
);

// filter for user table
export const UserFilter = (props) => (
  <Filter {...props}>
      <TextInput label="Search" source="q" alwaysOn />
      <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
          <SelectInput optionText="name" />
      </ReferenceInput>
  </Filter>
);

// TODO: PUT edit existed used
export const UserEdit = props => (
  <Edit {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
          <TextInput source="name" />
          <TextInput source="username" />
          <TextInput source="email" />
      </SimpleForm>
  </Edit>
);
