from django.shortcuts import render
import requests
from rest_framework import status
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
from django.utils.translation import gettext_lazy as _
from rest_framework import generics
from rest_framework.authtoken.models import Token

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


objdataapi={}

@api_view(["GET"])
def management(request):
    data=list(
         Management.objects.values()
    )
    
    for x in User.objects.all():
        datt=list(Management.objects.filter(hall_id=x.id).all().values()
        )
       
        objdataapi[x.username]=datt
        
    
    return JsonResponse(objdataapi,safe=False)

class ManagementViewSet(TokenObtainPairSerializer):
    queryset = Management.objects.all()
    serializer_class = ManagementSerializer



@api_view(["GET"])
def schedule(request):
    days=["saturday","sunday","monday",'tuesday',"wednesday","thursday","friday"]
    data=list(
         Schedule.objects.values()
    )
    
    for x in User.objects.all():
        objdataapi[x.username]={}
        for y in days:
            datt=list(Schedule.objects.filter(hall_id=x.id,day=y).all().values()
                )  
            #objdataapi[x.username]=y
            objdataapi[x.username][y]=datt

            for v,vv in enumerate(objdataapi[x.username][y]):
                target=ProgramTab.objects.filter(id=1).all().first()
                ab=objdataapi[x.username][y][v]
                ab["program"]=ProgramTab.objects.filter(id=1).all().first().program
                ab["time"]=str(target.duration1.hour)+':' +str(target.duration1.minute) + '-' + str(target.duration2.hour) +':'+str(target.duration2.minute)
               
                
    
    return JsonResponse(objdataapi,safe=False)

# @api_view(["GET"])
# def programsch(request):
    
    
#     newobj={}
#     newarrobj=[]
#     objdayarr={}
#     days=["saturday","sunday","monday",'tuesday',"wednesday","thursday","friday"]
#     target=""
#     daysobj={"saturday":[],"sunday":[],"monday":[],'tuesday':[],"wednesday":[],"thursday":[],"friday":[]}

#     saturday=[]
#     sunday=[]
#     monday=[]
#     tuesday=[]
#     wednesday=[]
#     thursday=[]
#     friday=[]
    
#     # objectdata[obj.day] = {}

    
       
        
        
        
    
#     for i , day in enumerate(days):
#         newarrobj=[]
        
       
            

#         if  Schedule.objects.filter(day=day):
#             target = Schedule.objects.filter(day=day)
            
#             for ij , ijj in enumerate(target):
#                 newobj={}
               
#                 newobj["time"]=str(target[ij].programSche.duration1.hour)+':' +str(target[ij].programSche.duration1.minute) + '-' + str(target[ij].programSche.duration2.hour) +':'+str(target[ij].programSche.duration2.minute)
#                 newobj["program"]=target[ij].programSche.program

#                 newarrobj.append(newobj)
            
#         daysobj[day]=newarrobj

    
            
    

    
    
#     return JsonResponse(daysobj,safe=False)

# @api_view(["POST"])
# def adduserapi(request):

#     if request.is_ajax() and request.POST:
#         print("ajax")
#     # if request.method == "POST":
#     #     print("resp")
#     # else:
#     #     pass
#     # resp =requests.get("http://127.0.0.1:8000/add/user/api");
    
#     return JsonResponse("database")


class ApiadduserView(APIView):
    serializer_class=AddUserSer

    def get(self,request):
        print("GET")
        allobj= AddAthlete.objects.all().values()
        return Response({"message":"list of objects","list":allobj})


    def post(self,request):
        ser_obj=AddUserSer(data=request.data)
        
  
       
        
        
        if ser_obj.is_valid():
            
            AddAthlete.objects.create(
                
               
                fullname=request.data["fullname"],
                user_id=request.data["user_id"],
                user_phone=request.data["user_phone"],
                subscription_delay=request.data["user_subscription_delay"],
                access_code=request.data["user_access_code"],
            
            )
            userid= AddAthlete.objects.filter(
                fullname=request.data["fullname"],
                user_phone=request.data["user_phone"])[0].id
                
            Management.objects.create(
                 image=request.data["image"],
                athlete=AddAthlete.objects.get(pk=int(userid)),
                fullname=request.data["fullname"]
                )
                
            
            # )
        allob= AddAthlete.objects.all().values()

        return Response({"message":"list of objects","list":allob})



class registerapi(APIView):
    serializer_class=UserSerializer
    def get(self,request):
        print("GET")
        allobj= User.objects.all().values()
        return Response({"message":"list of objects","list":allobj})




    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                token = Token.objects.create(user=user)
                json = serializer.data
                json['token'] = token.key
                return Response({"message":"list of objects","list":User.objects.all().values()})

        return Response({"message":"list of objects","list":User.objects.all().values()})