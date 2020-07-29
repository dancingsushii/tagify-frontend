import * as React from 'react';
import {
    CardActions, Create, CreateButton, Datagrid, DeleteButton, Edit, EditButton, Filter, List,
    NullableBooleanInput, ReferenceInput, required, SelectInput, SimpleForm, TextField, TextInput
} from 'react-admin';

// ADMIN->USER getAllUsers
export const UserList = (props) => (
  <List title="Users List" {...props} exporter={false}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="nickname" />
      <TextField source="role" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

// ADMIN->USER createUser WORKS
export const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      {/* <ReferenceInput source="userId" reference="users">
        <SelectInput optionText="name" />
      </ReferenceInput> */}
      <TextInput source="username" validate={[required()]} />
      <TextInput multiline source="nickname" validate={[required()]} />
      <TextInput multiline source="password" validate={[required()]} />
      {/* <TextInput multiline source="role" validate={[required()]} /> */}
      <SelectInput
        source="role"
        choices={[
          { id: "user", name: "user" },
          { id: "admin", name: "admin" },
        ]}
      />
    </SimpleForm>
  </Create>
);

// TODO: PUT edit existed used NO EXISTED ENDPOINT FOR IT
export const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="username" />
      <TextInput source="nickname" />
      <TextInput source="password" />
      <SelectInput
        source="role"
        choices={[
          { id: "user", name: "user" },
          { id: "admin", name: "admin" },
        ]}
      />
    </SimpleForm>
  </Edit>
);
