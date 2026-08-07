*** Settings ***

# Run this robot test stand-alone:
#
#  $ bin/test -s collective.z3cform.jsonwidget -t test_jsonwidget_bundle.robot --all
#
# Run it with a robot server (faster, iterating on the test):
#
# 1) bin/robot-server --reload-path src collective.z3cform.jsonwidget.testing.COLLECTIVE_Z3CFORM_JSONWIDGET_ACCEPTANCE_TESTING
# 2) bin/robot src/collective/z3cform/jsonwidget/tests/robot/test_jsonwidget_bundle.robot

Resource  plone/app/robotframework/browser.robot

Library  Remote  ${PLONE_URL}/RobotRemote

Test Setup  Run keywords  Enable autologin as  Manager  AND  Plone test setup
Test Teardown  Run keywords  Plone test teardown


*** Test Cases ***

jsonwidget.min.js is not loaded on a plain page
    [Documentation]  Only asserts on jsonwidget.min.js, gated by this
    ...  package's own bundle "expression". Does NOT assert on
    ...  react.min.js: redturtle.reactbundle's own gating is that
    ...  package's concern, and as currently released on PyPI it still
    ...  loads react.min.js unconditionally.
    Go to  ${PLONE_URL}
    ${source}=  Get page source
    Should not contain  ${source}  jsonwidget.min.js

jsonwidget.min.js is loaded when a form opts in via add_bundle_on_request
    Go to  ${PLONE_URL}/test-jsonwidget-form
    ${source}=  Get page source
    Should contain  ${source}  jsonwidget.min.js
