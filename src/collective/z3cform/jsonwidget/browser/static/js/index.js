// js/widget.js

import $ from 'jquery';
import React from 'react';
// Invece di importare l'intero ReactDOM
import { createRoot } from 'react-dom/client';

import WidgetContainer from './WidgetContainer';

function initializeReactWidget() {
  const widgets = document.getElementsByClassName('json-textarea-widget');
  const portalUrl = document.body.dataset.portalUrl || '';

  if (widgets.length) {
    Array.from(widgets).forEach((element) => {
      const container = element.querySelector('.widget-wrapper');
      const schema = element.getAttribute('data-schema');
      const field = element.querySelector('.widget-field');
      const root = createRoot(container);
      root.render(
        <React.StrictMode>
          <WidgetContainer
            baseUrl={portalUrl}
            schema={JSON.parse(schema)}
            fieldId={field.getAttribute('id')}
          />
        </React.StrictMode>
      );
    });
  }
}

$(function () {
  initializeReactWidget();
});
