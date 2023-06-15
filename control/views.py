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
                hallname=managself.hall
                ser.write("open".encode())
                time.sleep(3)
                ser.write("green".encode())
                time.sleep(2) 
            
            
            elif managself.ingym == False and managself.limitation == managself.accessed and today == managself.last_access:
                uid="limited"
                hallname=managself.hall
                ser.write("red".encode())
                time.sleep(2)
                

            elif managself.ingym == False  and today != managself.last_access:
                managself.accessed=  1
                managself.ingym = True
                managself.last_access = today
                uid="access"
                hallname=managself.hall
                ser.write("open".encode())
                time.sleep(3)
                ser.write("green".encode())
                time.sleep(2) 
            
            
            elif managself.ingym == True  and today != managself.last_access:
                managself.accessed=1
                managself.ingym = True
                managself.last_access = managself.last_access
                uid="access"
                hallname=managself.hall
                ser.write("open".encode())
                time.sleep(3)
                ser.write("green".encode())
                time.sleep(2) 
                
            else:
                managself.ingym = False
                uid="removed"
                hallname=managself.hall
                ser.write("green".encode())
                 
                


                    
            managself.save()
             
           
        except:
            print("not connected port")

                # ingym = AddAthlete.objects.filter(access_code=uid).first().access_code
              
        
    else:
                
        uid="none"
         
    

    
        
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

uidd=""
class Managementapi(APIView):
    


     
    

    uid="none"
    hallname="salem"
    serializer_class=ManagementSerializer
    
    
    def get(self,request):
        hallname="salem"
        uidd=""
        try :
           

            today = timezone.now().date()
            ser=serial.Serial('COM6', 9600) # open the serial port at 9600 bits per second
            uid =ser.readline().decode('utf-8').rstrip().replace("UID: ","");

            uidd=uid
            if AddAthlete.objects.filter(access_code=uid) :
                athlete_id=AddAthlete.objects.filter(access_code=uid).first().fullname
                managself=Management.objects.filter(fullname=athlete_id).first()

               
                if managself.ingym == False and managself.limitation > managself.accessed:
                    uid="access"
                    
                    hallname=managself.hall
                    ser.write("open".encode())
                    time.sleep(3)
                    ser.write("green".encode())
                    time.sleep(2) 
                    
                    managself.accessed=managself.accessed + 1
                    managself.ingym = True
                    managself.last_access = today
                    
                   
                    
                    
        
                elif managself.ingym == False and managself.limitation == managself.accessed and today == managself.last_access:
                    uid="limited"
                    hallname=managself.hall
                    ser.write("red".encode())
                    time.sleep(2)
                    
                     
                elif managself.ingym == False and managself.limitation == managself.accessed and today > managself.last_access:
                    managself.accessed=1
                    managself.ingym = True
                    managself.last_access = today
                    uid="access"
                    hallname=managself.hall
                    ser.write("open".encode())
                    time.sleep(3)
                    ser.write("green".encode())
                    time.sleep(2) 
                   

                elif managself.ingym == False and managself.limitation == managself.accessed and today < managself.last_access:
                    managself.accessed=1
                    managself.ingym = True
                    managself.last_access = today
                    uid="access"
                    hallname=managself.hall
                    ser.write("open".encode())
                    time.sleep(3)
                    ser.write("green".encode())
                    time.sleep(2) 
                    

                elif managself.ingym==True:
                    managself.ingym = False
                    uid="removed"
                    hallname=managself.hall
                    ser.write("open".encode())
                    time.sleep(3)
                    ser.write("red".encode())
                    time.sleep(2) 
                
                else:
                    uid="not exist"
                   
                    ser.write("red".encode())
                    time.sleep(2) 
                

                managself.save()
            else:
                uid="not exist"
              
                ser.write("red".encode())
                time.sleep(2) 
                
            
            
            
            
            
            
        except:
            uid="none"

        
        
        
    
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
            
        objhall={}
        
        # uidd=ser.readline().decode('utf-8').rstrip().replace("UID: ","");
       
        
        try:

            today = timezone.now().date()
            # uidd=ser.readline().decode('utf-8').rstrip().replace("UID: ","");
            objhall[str(hallname.username)]=uid
            
            if AddAthlete.objects.filter(access_code=uidd):
                owner = AddAthlete.objects.filter(access_code=uidd).first().fullname
                objhall["card_owner"]=owner

                objhall["limitation"]=Management.objects.filter(fullname=owner).first().limitation
                objhall["accessed"]=Management.objects.filter(fullname=owner).first().accessed
                dur11=AddAthlete.objects.filter(access_code=uidd).first().subscription_delay - today
                
                 
                objhall["duration_left"]= dur11.days
        except:

            objhall[str(request.user)]=uid
                
                
       
        return Response({"inout":inout,"uid":objhall,"list":objdataapi})
    
    




@api_view(["GET"])
def schedule(request):
    objdataapi={}
    days=["saturday","sunday","monday",'tuesday',"wednesday","thursday","friday"]
    data=list(
         Schedule.objects.values()
    )
    
    
    for x in User.objects.all():
        objdataapi[x.username]={}
        for y in days:
            userid=User.objects.filter(username=x.username).first()
            datt=list(Schedule.objects.filter(hall=userid.id,day=y).all().values()
                )
            
            
            #objdataapi[x.username]=y
            
            objdataapi[x.username][y]=datt

            for v,vv in enumerate(objdataapi[x.username][y]):        
                prgrmschedid=datt[v]["programSche_id"]
                target=ProgramTab.objects.filter(id=prgrmschedid).all().first()
                ab=objdataapi[x.username][y][v]
                ab["program"]=ProgramTab.objects.filter(id=prgrmschedid).all().first().program
                ab["time"]=str(target.duration1.hour)+':' +str(target.duration1.minute) + '-' + str(target.duration2.hour) +':'+str(target.duration2.minute)
                
    
    return JsonResponse(objdataapi,safe=False)

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
                user_phone=request.data["user_phone"],
                user_id=request.data["user_id"],
                subscription_delay=request.data["subscription_delay"],
                access_code=request.data["access_code"],
            
            )
            userid= AddAthlete.objects.filter(
                fullname=request.data["fullname"],
                user_phone=request.data["user_phone"]
                )[0].id
             
                
            Management.objects.create(
                hall=User.objects.get(username=request.data["user_id"]),
                athlete=AddAthlete.objects.get(pk=int(userid)),
                fullname=request.data["fullname"]
                )
                
            
           
        allob= AddAthlete.objects.all().values()

        return Response({"message":"list of objects","list":allob})




class ApiSchedulePost(APIView):
    serializer_class=AddScheduleSer

    def get(self,request):
       
        return Response({"list":Schedule.objects.all().values()})


    def post(self, request, format='json'):
        serializer = AddScheduleSer(data=request.data)
        if serializer.is_valid():

            programtab=ProgramTab.objects.create(
                duration1=request.data["duration1"],
                duration2=request.data["duration2"],
                program=request.data["program"]
            )

            programtab.save()


            Schedule.objects.create(
                hall=request.user,
                day=request.data["day"],
                programSche=programtab

            )

        
           

            return Response({"list":Schedule.objects.all().values()})


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