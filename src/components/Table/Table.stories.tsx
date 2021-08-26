import Container from '@material-ui/core/Container';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import Button, { IProps } from './Table';

export default {
  title: 'Layout/Table',
  component: Button,
} as Meta;

const Template: Story<IProps> = args => (
  <Container>
    <Button {...args} />
  </Container>
);

const columns = [
  {
    Header: 'First Name',
    accessor: 'firstName',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
];

const columns2 = [
  {
    id: 'selection',
    // The header can use the table's getToggleAllRowsSelectedProps method
    // to render a checkbox
    Header: ({ getToggleAllRowsSelectedProps }: any) => {
      console.log(getToggleAllRowsSelectedProps, 'headerProps');
      return (
        <div>
          <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
        </div>
      );
    },
    // The cell can use the individual row's getToggleRowSelectedProps method
    // to the render a checkbox
    Cell: ({ row }: any) => {
      console.log(row, 'rowProps');
      return (
        <div>
          <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
        </div>
      );
    },
  },
  {
    Header: 'First Name',
    accessor: 'firstName',
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
  },
];

const data = [
  { firstName: 'Ram', lastName: 'Khadka' },
  { firstName: 'Laxman', lastName: 'Khadka' },
  { firstName: 'Bharat', lastName: 'Khadka' },
];

export const Table = Template.bind({});
Table.args = {
  data: data,
  columns: columns,
};

// const handleDeactivateButtonClick = (selectedRows: any) => {
//   console.log('deactivate button clicked');
// };

// const handleDeleteButtonClick = (selectedRows: any) => {
//   console.log('delete button click');
// };

// export const RowSelectTable = Template.bind({});
// RowSelectTable.args = {
//   data: data,
//   columns: columns2,
//   enableRowSelect: true,
//   renderTableFooter: selectedFlatRows => (
//     <TableFooter
//       selectedRows={selectedFlatRows}
//       deactivateButtonClick={handleDeactivateButtonClick}
//       deleteButtonClick={handleDeleteButtonClick}
//     />
//   ),
// };
