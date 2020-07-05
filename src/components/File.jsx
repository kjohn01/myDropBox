import React from 'react';
import PropTypes from 'prop-types';

const File = ({ fileName, uploadDate }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.dataTransfer.dropEffect = 'move';
  };

  return (
    <div draggable onDragStart={handleDragStart} className="text-primary text-left p-2 m-2 d-flex justify-content-between">
      <div>{fileName}</div>
      <div>{new Date(uploadDate).toString()}</div>
    </div>
  );
};

File.propTypes = {
  fileName: PropTypes.string.isRequired,
  uploadDate: PropTypes.number.isRequired,
};

export default File;