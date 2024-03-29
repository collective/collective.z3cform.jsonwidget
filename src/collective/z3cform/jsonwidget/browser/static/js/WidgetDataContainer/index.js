import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import EntryColumnContainer from '../EntryColumnContainer';
import WidgetContext from '../utils/widgetContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTrash,
  faArrowUp,
  faArrowDown,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import './index.less';
import { Collapse } from 'react-collapse';

const WidgetDataContainer = () => {
  const {
    value,
    schema,
    addRow,
    removeRow,
    moveRow,
    getTranslationFor,
  } = useContext(WidgetContext);

  const [expandedGroups, setExpandedGroups] = useState({});

  const toggleGroup = group => {
    setExpandedGroups({
      ...expandedGroups,
      [group]: !expandedGroups[group],
    });
  };

  const valueSnippet = entry => {
    const firstField = schema.fieldsets[0].fields[0];
    const firstItem = entry[firstField];
    let text = '';

    if (Array.isArray(firstItem)) {
      text = firstItem.join(', ');
    } else if (typeof firstItem === 'string') {
      text = firstItem;
    }

    if (text.length > 50) {
      text = text.substring(0, 50) + '...';
    }
    return text.length === 0 ? '' : ' - ' + text;
  };

  return (
    <div className="data-wrapper">
      {value.map((entry, idx) => {
        const isOpen = expandedGroups[idx] === true;
        const expandCollapseLabel = isOpen ? 'Collapse' : 'Expand';
        return (
          <div className="json-row" key={idx}>
            <div className="row-header">
              <button
                className="standalone"
                type="button"
                title={getTranslationFor(
                  expandCollapseLabel,
                  expandCollapseLabel,
                )}
                onClick={e => {
                  e.preventDefault();
                  toggleGroup(idx);
                }}
              >
                <FontAwesomeIcon
                  icon={isOpen ? faChevronDown : faChevronRight}
                />
              </button>
              <strong>
                {getTranslationFor('Group')} {idx + 1}
                {valueSnippet(entry)}
              </strong>
              <div className="actions">
                {idx + 1 !== value.length && (
                  <button
                    className="standalone"
                    type="button"
                    title={getTranslationFor('Move down', 'Move down')}
                    onClick={e => {
                      e.preventDefault();
                      moveRow({ from: idx, to: idx + 1 });
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowDown} />
                  </button>
                )}
                {idx > 0 && (
                  <button
                    className="standalone"
                    type="button"
                    title={getTranslationFor('Move up', 'Move up')}
                    onClick={e => {
                      e.preventDefault();
                      moveRow({ from: idx, to: idx - 1 });
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowUp} />
                  </button>
                )}
                <button
                  className="destructive"
                  type="button"
                  title={getTranslationFor('Delete', 'Delete')}
                  onClick={e => {
                    e.preventDefault();
                    removeRow(idx);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
            <Collapse isOpened={expandedGroups[idx] === true}>
              <div className="row-content">
                {schema.fieldsets[0].fields.map(fieldId => (
                  <EntryColumnContainer
                    key={`${idx}-${fieldId}`}
                    value={entry[fieldId]}
                    id={fieldId}
                    row={idx}
                  ></EntryColumnContainer>
                ))}
              </div>
            </Collapse>
          </div>
        );
      })}
      <div className="data-footer">
        <button
          className="context"
          type="button"
          onClick={e => {
            e.preventDefault();
            toggleGroup(value.length);
            addRow();
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> {getTranslationFor('Add')}
        </button>
      </div>
    </div>
  );
};
WidgetDataContainer.propTypes = {
  value: PropTypes.array,
  schema: PropTypes.object,
  vocabularies: PropTypes.object,
};

export default WidgetDataContainer;
