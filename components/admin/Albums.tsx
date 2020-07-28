import React from 'react';
import {
    CardActions, CreateButton, Datagrid, DeleteButton, Edit, EditButton, Filter, List,
    ReferenceInput, required, SelectInput, SimpleForm, TextField, TextInput
} from 'react-admin';

const NoneActions = (props) => <CardActions />;

// ADMIN->ALBUMS getAllAlbums
export const AlbumsList = (props) => (
  <List title="Albums List" {...props} actions={<NoneActions />}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="description" />
      <TextField source="first_photo" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const AlbumsEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="title" validate={[required()]} />
      <TextInput source="description" validate={[required()]} />
    </SimpleForm>
  </Edit>
);
