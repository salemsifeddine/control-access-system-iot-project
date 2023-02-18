from django.contrib import admin
from django.urls import path,re_path, include
from django.views.generic import TemplateView
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)



urlpatterns = [
    path("api",getRoutes),
    path("",index,name="index"),
    path("home",index,name="home"),
    path("statistics",index,name="statistics"),
    path("management",index,name="management"),
    path("login",index,name="login"),
    path("register",index,name="register"),
    path("user/detail",index,name="userdet"),
    path("user/add",index,name="useradd"),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("req",database,name="req"),
    path("managementapi",management, name="sers")
    
]
