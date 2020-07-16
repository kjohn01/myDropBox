/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@material-ui/core';
import { Spinner } from 'react-bootstrap';
// import Files from './Files';

const Files = React.lazy(() => import('./Files'));

const FileList = ({ data }) => (
  <TableContainer component={Paper} className="shadow-none">
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right" className="table-cell">size</TableCell>
          <TableCell align="right" className="table-cell">Last Modified</TableCell>
        </TableRow>
      </TableHead>
      <Suspense fallback={(
        <div className="fixed-center">
          <Spinner animation="border" role="status" variant="secondary">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
          )}
      >
        <Files data={data} />
      </Suspense>
    </Table>
  </TableContainer>
);

FileList.propTypes = {
  data: PropTypes.any.isRequired,
};

export default FileList;