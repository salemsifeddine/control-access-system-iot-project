from django.contrib import admin
from django.urls import path,re_path, include
from django.views.generic import TemplateView
from .views import *
from .models import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.views.decorators.csrf import csrf_exempt



urlpatterns = [
    path("api",getRoutes),
    path("",index,name="index"),
    path("home",index,name="home"),
    path("statistics",index,name="statistics"),
    path("management",index,name="management"),
    path("hall",index,name="hall"),
    path("login",index,name="login"),
    path("register/",index,name="register"),
    path("user/detail/<int:pk>/",index,name="userdet"),
    path("user/add",index,name="useradd"),
    path("management/user/add",index,name="useradddj"),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("req",database,name="req"),
    path("managementapi",Managementapi.as_view()),
     
    path("scheduleapi",schedule, name="sched"),
    path("registerapi/",registerapi.as_view(), name="registerapi"),
    path("managementapi/<int:pk>/",MyModelDetailView.as_view()),
    # path("programsch",programsch,name="programsch"),
    # path("add/user/api",userCreate,name="adduserapi"),
    path("edit/",csrf_exempt(ApiadduserView.as_view()),name="dd"),
    path("schedulePost/",csrf_exempt(ApiSchedulePost.as_view()),name="ApiSchedulePost")
    
]
