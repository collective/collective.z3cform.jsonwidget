"""Setup tests for this package."""

from collective.z3cform.jsonwidget.testing import (  # noqa: E501
    COLLECTIVE_Z3CFORM_JSONWIDGET_INTEGRATION_TESTING,
)
from plone import api
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from plone.base.utils import get_installer

import unittest


class TestSetup(unittest.TestCase):
    """Test that collective.z3cform.jsonwidget is properly installed."""

    layer = COLLECTIVE_Z3CFORM_JSONWIDGET_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer["portal"]
        self.installer = get_installer(self.portal, self.layer["request"])

    def test_product_installed(self):
        """Test if collective.z3cform.jsonwidget is installed."""
        self.assertTrue(
            self.installer.is_product_installed("collective.z3cform.jsonwidget")
        )

    def test_browserlayer(self):
        """Test that ICollectiveZ3CformJsonwidgetLayer is registered."""
        from collective.z3cform.jsonwidget.interfaces import (
            ICollectiveZ3CformJsonwidgetLayer,
        )
        from plone.browserlayer import utils

        self.assertIn(ICollectiveZ3CformJsonwidgetLayer, utils.registered_layers())

    def test_bundle_registered(self):
        registry = api.portal.get_tool("portal_registry")
        self.assertIn(
            "plone.bundles/z3cform-jsonwidget.jscompilation", registry.records
        )


class TestUninstall(unittest.TestCase):

    layer = COLLECTIVE_Z3CFORM_JSONWIDGET_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer["portal"]
        self.installer = get_installer(self.portal, self.layer["request"])
        roles_before = api.user.get_roles(TEST_USER_ID)
        setRoles(self.portal, TEST_USER_ID, ["Manager"])
        self.installer.uninstall_product("collective.z3cform.jsonwidget")
        setRoles(self.portal, TEST_USER_ID, roles_before)

    def test_product_uninstalled(self):
        """Test if collective.z3cform.jsonwidget is cleanly uninstalled."""
        self.assertFalse(
            self.installer.is_product_installed("collective.z3cform.jsonwidget")
        )

    def test_browserlayer_removed(self):
        """Test that ICollectiveZ3CformJsonwidgetLayer is removed."""
        from collective.z3cform.jsonwidget.interfaces import (
            ICollectiveZ3CformJsonwidgetLayer,
        )
        from plone.browserlayer import utils

        self.assertNotIn(ICollectiveZ3CformJsonwidgetLayer, utils.registered_layers())

    def test_bundle_removed(self):
        registry = api.portal.get_tool("portal_registry")
        self.assertFalse(
            [
                name
                for name in registry.records.keys()
                if name.startswith("plone.bundles/z3cform-jsonwidget")
            ]
        )
