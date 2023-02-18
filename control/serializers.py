from rest_framework import serializers
from .models import *




class ManagementSerializer(serializers.Serializer):
    class Meta:
        model = Management
        fields = "__all__"