import React from 'react';

export default function MenuPane({ classes, menu }) {
  return (
    <div className={classes}>
      <div id="myModal" className="modal-menu">
        <div className="modal-content effect1">
          <div className="modal-body">{menu}</div>
        </div>
      </div>
    </div>
  );
}
