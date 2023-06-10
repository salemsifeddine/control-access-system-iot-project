from django.shortcuts import render
import requests
from django.utils import timezone
from datetime import date
import time
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
    
     

            
    today = timezone.now().date()
     # open the serial port at 9600 bits per second
    fullnamedelete= request.GET.get('fullnamedelete')
    
    uid=request.GET.get('name')
    
    if fullnamedelete :
       
        

       
         

        managself=Management.objects.filter(fullname=fullnamedelete).first()
      
        managself.ingym = False
        managself.save()
        # ser.write("red".encode())
        # time.sleep(2)
        # ser.close()         
        
        


    
    if AddAthlete.objects.filter(access_code=uid) and uid :
       
        
       
        
        
         
        athlete_id=AddAthlete.objects.filter(access_code=uid).first().fullname
        managself=Management.objects.filter(fullname=athlete_id).first()
        
      
        try:       
            ser=serial.Serial('COM6', 9600)  
            if managself.ingym == False and managself.limitation > managself.accessed:
                managself.accessed=managself.accessed + 1
                managself.ingym = True
                managself.last_access = today
                uid="access"
                ser.write("green".encode())
            
            
            elif managself.ingym == False and managself.limitation == managself.accessed and today == managself.last_access:
                uid="limited"
                ser.write("red".encode())
                

            elif managself.ingym == False and managself.limitation == managself.accessed and today < managself.last_access:
                managself.accessed=  1
                managself.ingym = True
                managself.last_access = today
                uid="access"
                ser.write("green".encode())
            
            
            elif managself.ingym == False and managself.limitation == managself.accessed and today > managself.last_access:
                managself.accessed=1
                managself.ingym = True
                managself.last_access = today
                uid="access"
                ser.write("green".encode())
                
            else:
                managself.ingym = False
                uid="removed"
                ser.write("red".encode())
                


                    
            managself.save()
            time.sleep(2)
            ser.close()
        except:
            print("not connected port")

                # ingym = AddAthlete.objects.filter(access_code=uid).first().access_code
              
        
    else:
                
        uid="not exist"
         
    

    
        
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
        
        try :
            

            today = timezone.now().date()
            ser=serial.Serial('COM6', 9600) # open the serial port at 9600 bits per second
            uid =ser.readline().decode('utf-8').rstrip().replace("UID: ","");
            if AddAthlete.objects.filter(access_code=uid) :
                athlete_id=AddAthlete.objects.filter(access_code=uid).first().fullname
                managself=Management.objects.filter(fullname=athlete_id).first()

               
                if managself.ingym == False and managself.limitation > managself.accessed:
                    managself.accessed=managself.accessed + 1
                    managself.ingym = True
                    managself.last_access = today
                    uid="access"
                    ser.write("green".encode())
        
                elif managself.ingym == False and managself.limitation == managself.accessed and today == managself.last_access:
                    uid="limited"
                    ser.write("red".encode())
        
                elif managself.ingym == False and managself.limitation == managself.accessed and today > managself.last_access:
                    managself.accessed=1
                    managself.ingym = True
                    managself.last_access = today
                    uid="access"
                    ser.write("green".encode())

                elif managself.ingym == False and managself.limitation == managself.accessed and today < managself.last_access:
                    managself.accessed=1
                    managself.ingym = True
                    managself.last_access = today
                    uid="access"
                    ser.write("green".encode())

                else:
                    managself.ingym = False
                    uid="removed"
                    ser.write("red".encode())
            
            managself.save()
            time.sleep(2)
            ser.close()
            
            
        except:
            uid="none"
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
            
        
        return Response({"inout":inout,"uid":uid,"list":objdataapi})
    
    




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
            try:
                objdataapi[x.username][y]=datt

                for v,vv in enumerate(objdataapi[x.username][y]):
                    target=ProgramTab.objects.filter(id=1).all().first()
                    ab=objdataapi[x.username][y][v]
                    ab["program"]=ProgramTab.objects.filter(id=1).all().first().program
                    ab["time"]=str(target.duration1.hour)+':' +str(target.duration1.minute) + '-' + str(target.duration2.hour) +':'+str(target.duration2.minute)
            except:
                pass
                
    
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

        return Response(yy)
    def post(self, request, pk):
        ManagementModify = Management.objects.filter(pk=pk).first()
        AddAthleteModify=AddAthlete.objects.filter(fullname=ManagementModify.athlete.fullname).first()
        
        ManagementModify.fullname = request.data["fullname"]
        ManagementModify.limitation = request.data["limitation"]
        ManagementModify.last_access = request.data["last_access"]
        AddAthleteModify.fullname = request.data["fullname"]
        AddAthleteModify.subscription_delay = request.data["subscription_delay"]
        AddAthleteModify.access_code = request.data["access_code"]
        AddAthleteModify.subscription_delay_from = request.data["subscription_delay_from"]
        AddAthleteModify.user_phone = request.data["user_phone"]
       
        ManagementModify.save()
        AddAthleteModify.save()
       
        serializer = ManagementSerializer(ManagementModify)

        mymodel = self.get_object(pk)
        serializer = ManagementSerializer(mymodel)
        
        
        yy = mymodel.all().values().first()
       
        yyy = yy["athlete_id"]
        yy["athlete_info"] = AddAthlete.objects.filter(id=yyy).values().first()

        return Response(yy)
    
    


class ApiadduserView(APIView):
    serializer_class=AddUserSer

    def get(self,request):
       
        try: 
            ser=serial.Serial('COM6', 9600)
             
                     
            uid = ser.readline().decode('utf-8').rstrip().replace("UID: ","");
        
            time.sleep(2)
            ser.close()
                
                
        except :
            uid = "none"
       
        allobj= AddAthlete.objects.all().values()
        return Response({"uid":uid,"list":allobj})


    def post(self,request):
        ser=serial.Serial('COM6', 9600)
        ser_obj=AddUserSer(data=request.data)
        
        
  
       
        
        
        if ser_obj.is_valid():

           
             
      
                    
                    
                    
            
            AddAthlete.objects.create(
                
                image=request.data["image"],
                fullname=request.data["fullname"],
                user_id=request.data["user_id"],
                user_phone=request.data["user_phone"],
                subscription_delay=request.data["subscription_delay"],
                access_code=request.data["access_code"],
            
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