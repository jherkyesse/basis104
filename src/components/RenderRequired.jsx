import React from 'react';

export default function RenderRequired({ required }) {
  return required ? (<span className="required">*</span>) : null;
}
