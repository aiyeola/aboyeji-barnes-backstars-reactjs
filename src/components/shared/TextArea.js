import React, { useState, useEffect } from 'react';
import RichTextEditor from 'react-rte';
import PropTypes from 'prop-types';

export default function TextArea(props) {
  const [value, setValue] = useState(RichTextEditor.createEmptyValue());

  // useEffect(() => {
  //   if (props.value) {
  //     setValue(RichTextEditor.createValueFromString(props.value, 'html'));
  //   }
  // }, [props.value]);

  const onChange = (value) => {
    setValue(value);
    if (props.onChange) {
      props.onChange(value.toString('html'));
    }
  };

  const toolbarConfig = {
    display: [
      'INLINE_STYLE_BUTTONS',
      'BLOCK_TYPE_BUTTONS',
      'LINK_BUTTONS',
      'HISTORY_BUTTONS',
    ],
    INLINE_STYLE_BUTTONS: [
      { label: 'Bold', style: 'BOLD' },
      { label: 'Italic', style: 'ITALIC' },
      { label: 'Underline', style: 'UNDERLINE' },
    ],
    BLOCK_TYPE_DROPDOWN: [
      { label: 'Normal', style: 'unstyled' },
      { label: 'Heading Large', style: 'header-one' },
      { label: 'Heading Medium', style: 'header-two' },
      { label: 'Heading Small', style: 'header-three' },
    ],
    BLOCK_TYPE_BUTTONS: [
      { label: 'UL', style: 'unordered-list-item' },
      { label: 'OL', style: 'ordered-list-item' },
    ],
  };

  return (
    <RichTextEditor
      // @ts-ignore
      toolbarConfig={toolbarConfig}
      value={value}
      onChange={onChange}
    />
  );
}

TextArea.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
