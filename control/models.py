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
        return self.user




class ProgramTab(models.Model):
    duration1 = models.TimeField(null=True)
    duration2 = models.TimeField(null=True)
    program=models.CharField(default="open", max_length=50)
    

    def __str__(self):
        return self.program

class Schedule(models.Model):
    STATUS = (
        ("saturday",_("saturday")),
        ("sunday",_("sunday")),
        ("monday",_("monday")),
        ("tuesday",_("tuesday")),
        ("wednesday",_("wednesday")),
        ("thursday",_("thursday")),
        ("friday",_("friday")),
    )
    hall=models.ForeignKey(User,on_delete=models.CASCADE)
    day = models.CharField(choices=STATUS,default="friday", max_length=50)
    programSche=models.ForeignKey(ProgramTab,on_delete=models.CASCADE)
    
    
    
    def __str__(self):
        return self.hall


class AddAthlete(models.Model):
    image=models.ImageField( upload_to="image_management",blank=True,null=True, height_field=None, width_field=None, max_length=None,default="image_management/default.png")
    fullname=models.CharField( max_length=50)
    user_id=models.CharField( max_length=50)
    user_phone=models.CharField( max_length=50)
    subscription_delay_from=models.DateField( auto_now=False, auto_now_add=True)
    subscription_delay=models.DateField( auto_now=False, auto_now_add=False)
    access_code=models.CharField( max_length=50)

    def __str__(self):
        return self.fullname

class Management(models.Model):
    hall=models.ForeignKey(User,on_delete=models.CASCADE)
    athlete=models.OneToOneField(AddAthlete,on_delete=models.CASCADE)
    fullname=models.CharField( max_length=50)
    city= models.CharField(max_length=25,default="algeries")
    email=models.EmailField( max_length=254,default="user@user.com")
    ingym = models.BooleanField(default=False)
    limitation= models.IntegerField(default=2)
    accessed= models.IntegerField(default=0)
    last_access= models.DateField( auto_now=False, auto_now_add=True)
    
    def __str__(self):
        
        return self.fullname


class HallInfos(models.Model):
    hall_name=models.CharField(max_length=50,default="GYM")
    description=models.TextField(default="GYM ALGERIA")

    def __str__(self) -> str:
        return self.hall_name