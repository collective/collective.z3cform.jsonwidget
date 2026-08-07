Changelog
=========


3.0.0 (unreleased)
------------------

- Added redturtle.reactbundle as dependency.
  [daniele]
- [BREAKING CHANGE] the ``z3cform-jsonwidget`` bundle is no longer loaded on
  every page: it's now gated by an ``expression`` and only renders when a
  view calls ``add_bundle_on_request(request, "z3cform-jsonwidget")``. It
  was previously ``enabled=True`` unconditionally, which meant
  ``jsonwidget.min.js``/``.css`` were injected sitewide even though only
  forms using ``JSONFieldWidget`` need them. If your form uses
  ``JSONFieldWidget``, update it to also call
  ``add_bundle_on_request(request, "react-bundle")`` and
  ``add_bundle_on_request(request, "z3cform-jsonwidget")`` before
  rendering (see collective.limitfilesizepanel for an example). An
  upgrade step (``to_2001``) applies the same change to already
  installed sites.
  [mamico]


2.0.1 (2026-07-07)
------------------

- Fixed wrong logger import in upgrade.
  [daniele]


2.0.0 (2026-03-26)
------------------

- Plone 6 compatibility. Use 1.x tags for Plone < 6. [cekk]
  [cekk]


1.1.2 (2023-04-26)
------------------

- Fix release.
  [cekk]


1.1.1 (2023-04-21)
------------------

- Handle integer fields.
  [cekk]

1.1.0 (2022-07-18)
------------------

- Force vocabularies batch size to 1000 to get all of possible values.
  [cekk]


1.0.0 (2021-12-20)
------------------

- Improve widget usability.
  [cekk]


0.2.4 (2021-12-13)
------------------

- Fix defaulValue in select fields. Now we can also reset the values.
  [cekk]

0.2.3 (2021-08-18)
------------------

- Fix homepage breadcrumb.
  [cekk]


0.2.2 (2021-08-17)
------------------

- Fix breadcrumbs and pagination in ReferenceField.
  [cekk]


0.2.1 (2021-05-18)
------------------

- Add alt text on buttons
- Add locales for a11y hints
  [nzambello]


0.2.0 (2021-05-17)
------------------

- Add link and path to referenced items
  [nzambello]
- Fix TextLine field.
  [cekk]

0.1.0 (2021-02-09)
------------------

- Initial release.
  [cekk]
