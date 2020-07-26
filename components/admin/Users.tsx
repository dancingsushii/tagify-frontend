import * as React from 'react';
import {
    Create, Datagrid, DeleteButton, Edit, EditButton, Filter, List, ReferenceInput, required,
    SelectInput, SimpleForm, TextField, TextInput
} from 'react-admin';

// ADMIN->USER getAllUsers
export const UserList = (props) => (
  <List filters={<UserFilter />} {...props}>
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
      <TextInput multiline source="role" validate={[required()]} />
    </SimpleForm>
  </Create>
);

// filter for user table
export const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <ReferenceInput label="User" source="id" reference="users" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

// TODO: PUT edit existed used NO EXISTED ENDPOINT FOR IT
export const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="username" validate={[required()]} />
      <TextInput source="nickname" validate={[required()]} />
      <TextInput multiline source="password" validate={[required()]} />
      <TextInput source="role" validate={[required()]} />
    </SimpleForm>
  </Edit>
);
