from django.urls import path

from .apis import TestServerTime

urlpatterns = [
    path("time/", TestServerTime.as_view(), name=TestServerTime.__name__),
]
