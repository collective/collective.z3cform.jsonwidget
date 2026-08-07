from collective.z3cform.jsonwidget.browser.widget import JSONFieldWidget
from plone.z3cform.layout import FormWrapper
from plone.z3cform.layout import wrap_form
from Products.CMFPlone.resources import add_bundle_on_request
from z3c.form import field
from z3c.form.form import Form
from zope import schema
from zope.interface import Interface


class IJSONTestSchema(Interface):
    entry = schema.TextLine(title="entry", required=False)


class ITestFormSchema(Interface):
    my_json_field = schema.SourceText(title="JSON field", required=False)


class JSONWidgetTestForm(Form):
    """Test-only form: exercises JSONFieldWidget in isolation.

    Only registered by the test layer (see tests/testing.zcml), used to
    verify the z3cform-jsonwidget bundle "expression" gating.
    """

    schema = ITestFormSchema
    fields = field.Fields(ITestFormSchema)
    fields["my_json_field"].widgetFactory = JSONFieldWidget
    ignoreContext = True

    def updateWidgets(self):
        super().updateWidgets()
        self.widgets["my_json_field"].schema = IJSONTestSchema


class JSONWidgetTestFormWrapper(FormWrapper):
    """Opts in to react-bundle and z3cform-jsonwidget the same way
    collective.limitfilesizepanel's control panel does, so the wrapped
    form renders inside the full site layout (with <head>).
    """

    def __call__(self):
        add_bundle_on_request(self.request, "react-bundle")
        add_bundle_on_request(self.request, "z3cform-jsonwidget")
        return super().__call__()


JSONWidgetTestView = wrap_form(
    JSONWidgetTestForm, __wrapper_class=JSONWidgetTestFormWrapper
)
