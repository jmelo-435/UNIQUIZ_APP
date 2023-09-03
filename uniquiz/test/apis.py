from datetime import datetime

from rest_framework.response import Response
from rest_framework.views import APIView


class TestServerTime(APIView):
    __test__ = False
    permission_classes = ()

    def get(self, request, format=None):
        return Response({"serverTime": datetime.now().strftime("%Y-%m-%d %H:%M:%S")})
