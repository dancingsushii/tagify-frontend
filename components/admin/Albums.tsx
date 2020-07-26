import React from 'react';
import {
    Datagrid, DeleteButton, Edit, EditButton, Filter, List, ReferenceInput, required, SelectInput,
    SimpleForm, TextField, TextInput
} from 'react-admin';

// ADMIN->ALBUMS getAllAlbums
export const AlbumsList = (props) => (
  <List filters={<AlbumsFilter />} {...props}>
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

// filter for user table
export const AlbumsFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <ReferenceInput label="Album" source="id" reference="albums" allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </Filter>
);

// TODO: PUT edit existed used NO EXISTED ENDPOINT FOR IT
export const AlbumsEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="title" validate={[required()]} />
      <TextInput source="description" validate={[required()]} />\
    </SimpleForm>
  </Edit>
);
