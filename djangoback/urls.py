
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("",views.index,name="index"),
    path("home",views.index,name="home"),
    path("statistics",views.index,name="statistics"),
    path("management",views.index,name="management"),
    path("login",views.index,name="login"),
    path("register",views.index,name="register")
]
