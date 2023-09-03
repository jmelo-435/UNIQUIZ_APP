from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .apis import TestServerTime

# Create your tests here.

# Path: integracao_ebp/integracao_ebp/test/tests.py
# Compare this snippet from integracao_ebp/integracao_ebp/test/tests.py:


class TestServerTimeRetrieve(APITestCase):
    def test_get_server_time(self):
        url = reverse(TestServerTime.__name__)
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("serverTime", response.data)
        self.assertIsNotNone(response.data["serverTime"])
