
from django.contrib import admin
from django.urls import path,re_path, include
from django.views.generic import TemplateView
from . import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path("",include("control.urls")),
   
]
