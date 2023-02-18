from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import permissions
from control.models import *
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie,csrf_protect
from django.utils.decorators import method_decorator
from django.http import  JsonResponse
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import viewsets
from .serializers import *

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class= MyTokenObtainPairSerializer

def index(request):
    return render(request,'index.html')



@api_view(["GET"])
def getRoutes(request):
    routes= [
        "api/token",
        "api/token/refresh"
    ]

    return Response(routes)


@api_view(["GET"])
def database(request):
    return Response("database")

@api_view(["GET"])
def management(request):
    data=list(
         Management.objects.values()
    )
    
    return JsonResponse(data,safe=False)

class ManagementViewSet(TokenObtainPairSerializer):
    queryset = Management.objects.all()
    serializer_class = ManagementSerializer