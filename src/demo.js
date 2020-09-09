import React from 'react';
import MaterialTable from 'material-table';

export default function TableEmployees() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Имя', field: 'name' },
      { title: 'Фамилия', field: 'surname' },
      { title: 'Возраст', field: 'age', type: 'numeric' },
      {
        title: 'Должность',
        field: 'position',
        lookup: { 1: 'Начальник', 2: 'Уборщик' },
      },
    ],
    data: [
      { name: 'Иван',
        surname: 'Иванов',
        age: 33,
        position: 1
      },
      {
        name: 'Имя',
        surname: 'Фамилия',
        age: 66,
        position: 2,
      },
    ],
  });

  return (
    <MaterialTable
      title="Таблица сотрудников"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
