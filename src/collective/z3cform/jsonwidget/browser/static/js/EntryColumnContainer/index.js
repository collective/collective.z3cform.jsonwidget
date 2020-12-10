import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import LinesField from '../fields/LinesField';
import TextLineField from '../fields/TextLineField';
import SelectField from '../fields/SelectField';
import WidgetContext from '../utils/widgetContext';
// import './index.less';

const EntryColumnContainer = props => {
  const { id } = props;
  const { schema } = useContext(WidgetContext);
  const { type, widgetOptions, title, description, vocabulary } = schema.fields[
    id
  ];
  let Field = null;
  if (type === 'array') {
    if (!widgetOptions) {
      Field = <LinesField {...props}></LinesField>;
    } else {
      Field = <SelectField {...props} multi={true}></SelectField>;
    }
  } else if (type === 'string') {
    if (vocabulary) {
      Field = <SelectField {...props}></SelectField>;
    } else {
      Field = <TextLineField {...props}></TextLineField>;
    }
  }
  return (
    <div className="column">
      <label>{title}</label>
      <p className="discreet">{description}</p>
      {Field}
    </div>
  );
};
EntryColumnContainer.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  id: PropTypes.string,
  row: PropTypes.number,
};

export default EntryColumnContainer;
