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
from django.core import serializers
from django.utils.translation import gettext_lazy as _
from rest_framework import generics
from rest_framework.authtoken.models import Token
import serial
from datetime import *




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
inout={}

import json
class Managementapi(APIView):
    serializer_class=ManagementSerializer
    
    def get(self,request):
        uidd="limited"
        try :
            ser = serial.Serial('COM6', 9600) # open the serial port at 9600 bits per second
            uid =ser.readline().decode('utf-8').rstrip();
            
            if AddAthlete.objects.filter(access_code=uid) :
                athlete_id=AddAthlete.objects.filter(access_code=uid).first().fullname
                managself=Management.objects.filter(fullname=athlete_id).first()
                

                if date.today() != managself.last_access:
                    managself.last_access = date.today()
                    managself.accessed = 0
                    managself.save()

                 
                if managself.ingym == False and managself.accessed < managself.limitation:
                    
                    
                    managself.ingym = True
                    managself.accessed +=1
                    uidd = ser.readline().decode('utf-8').rstrip()
                    managself.save()
                    print("outch")
                elif managself.ingym == True and managself.accessed < managself.limitation:
                    managself.ingym = False
                    managself.accessed +=1
                    uidd = ser.readline().decode('utf-8').rstrip()
                    managself.save()
                    print("outchh")
                elif managself.accessed == managself.limitation:
                    managself.ingym = False
                    uidd ="limited"
                    managself.save()
                    
                else:
                    uidd = ser.readline().decode('utf-8').rstrip()
                    print("hola")
                
                
                # elif managself.accessed == managself.limitation :
                #     managself.ingym = False
                #     managself.save()
                #     print("out")
            
                # elif managself.accessed  > managself.limitation  :
                #     managself.ingym = False
                #     managself.save()
                #     uidd="limited"
                #     print("limited")
                    
               
                
                ingym = AddAthlete.objects.filter(access_code=uid).first().access_code
                
                    
                
                
                
            else:
                uidd="not exist"

        except:
            uidd="error occured"
        data=list(
         Management.objects.values()
        )
    
        for x in User.objects.all():
            datt=list(Management.objects.filter(hall_id=x.id).all().values())
            for y in datt:
                yy = y["athlete_id"]
                y["athlete_info"] = AddAthlete.objects.filter(id=yy).values().first()
                ii = Management.objects.filter(hall_id=x.id,ingym=True).all().count()
                oo = Management.objects.filter(hall_id=x.id,ingym=False).all().count()
                inout[x.username]={
                "ingym":ii,
                "outgym":oo

            }
               
       
            objdataapi[x.username]=datt
            

        return Response({"inout":inout,"uid":uidd,"list":objdataapi})




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


class MyModelDetailView(APIView):
    
    

    def get_object(self, pk):
        try:
            return Management.objects.filter(pk=pk)
        except Management.DoesNotExist:
            pass

    def get(self, request, pk):
        mymodel = self.get_object(pk)
        serializer = ManagementSerializer(mymodel)
        
        
        yy = mymodel.all().values().first()
        yyy = yy["athlete_id"]
        yy["athlete_info"] = AddAthlete.objects.filter(id=yyy).values().first()
    


class ApiadduserView(APIView):
    serializer_class=AddUserSer

    def get(self,request):
       
        allobj= AddAthlete.objects.all().values()
        return Response({"message":"list of objects","list":allobj})


    def post(self,request):
        ser = serial.Serial('COM6', 9600)
        ser_obj=AddUserSer(data=request.data)
        
        
  
       
        
        
        if ser_obj.is_valid():
             
            
            try: 
                 
                 # open the serial port at 9600 bits per second
                 while True:
                     
                    uid = ser.readline().decode('utf-8').rstrip();
                    
                    if uid !="none":
                        break
            except :
                while True:
                     
                    uid = ser.readline().decode('utf-8').rstrip();
                    
                    if uid !="none":
                        break
                    
            
            AddAthlete.objects.create(
                
                image=request.data["image"],
                fullname=request.data["fullname"],
                user_id=request.data["user_id"],
                user_phone=request.data["user_phone"],
                subscription_delay=request.data["user_subscription_delay"],
                access_code=uid,
            
            )
            userid= AddAthlete.objects.filter(
                fullname=request.data["fullname"],
                user_phone=request.data["user_phone"])[0].id
                
            Management.objects.create(
                hall=request.user,
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