import React, { useRef } from 'react';
import { useClickAway } from 'react-use';
import {
  FcAddRow,
  FcAddColumn,
  FcDeleteRow,
  FcDeleteColumn,
  FcGrid,
  FcLock,
  FcUnlock,
} from 'react-icons/fc';
import { contextMenuIconSize } from './config';

function ContextMenu({ left, top, open }) {
  const contextMenuRef = useRef();
  if (!open) return null;
  return (
    <div ref={contextMenuRef} style={{ left, top }} className="contextMenu">
      <div className="contextMenuSelection">
        <FcGrid size={contextMenuIconSize} />
        <span>Merge Cell</span>
      </div>
      <div className="contextMenuSelection">
        <FcAddRow size={contextMenuIconSize} />
        <span>Add Row Here</span>
      </div>
      <div className="contextMenuSelection">
        <FcAddColumn size={contextMenuIconSize} />
        <span>Add Column Here</span>
      </div>
      <div className="contextMenuSelection">
        <FcDeleteRow size={contextMenuIconSize} />
        <span>Delete Row Here</span>
      </div>
      <div className="contextMenuSelection">
        <FcDeleteColumn size={contextMenuIconSize} />
        <span>Delete Column Here</span>
      </div>
      <div className="contextMenuSelection">
        <FcLock size={contextMenuIconSize} />
        <span>Lock Grid Cell</span>
      </div>
      <div className="contextMenuSelection">
        <FcUnlock size={contextMenuIconSize} />
        <span>Unlock Grid Cell</span>
      </div>
    </div>
  );
}

export default ContextMenu;
