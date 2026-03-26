from collective.editablemenu import logger
from plone import api
from plone.base.utils import get_installer

default_profile = "profile-collective.z3cform.jsonwidget:default"


def to_2000(context):
    setup_tool = api.portal.get_tool("portal_setup")
    setup_tool.runAllImportStepsFromProfile(
        "profile-collective.z3cform.jsonwidget:to_2000"
    )
    portal = api.portal.get()
    installer = get_installer(portal, portal.REQUEST)
    installer.install_product(product_id="redturtle.reactbundle")
    setup_tool.runImportStepFromProfile(default_profile, "plone.app.registry")
    logger.info("Plone 6 compatibility")
