from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class TestConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "uniquiz.test"
    verbose_name = _("Test")
