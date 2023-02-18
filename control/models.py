from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# Create your models here.
class UserProfile(models.Model):
    REQUIRED_FIELDS = ('user',)
    USERNAME_FIELD = 'email'
    email = models.EmailField('email address', unique=True)
    # user= models.OneToOneField(User,on_delete=models.CASCADE,unique=True)
    user= models.CharField(max_length=255,default="")
    first_name = models.CharField(max_length=255,default="")
    last_name = models.CharField(max_length=255,default="")
    phone=models.CharField(max_length=20,default="")
    city= models.CharField(max_length=25,default="")


    def __str__(self):
        return str("profile user")


class Management(models.Model):
    first_name=models.CharField(max_length=255,default="")
    last_name=models.CharField(max_length=255,default="")
    phone=models.CharField(max_length=20,default="")
    city= models.CharField(max_length=25,default="")
    email=models.EmailField(_(""), max_length=254)
    ingym = models.BooleanField(default=False)
    image=models.ImageField(_(""), upload_to="image_management", height_field=None, width_field=None, max_length=None)

    def __str__(self):
        return str("management")


