from rest_framework import serializers
from .models import *
from rest_framework.validators import UniqueValidator



class ManagementSerializer(serializers.Serializer):
    class Meta:
        model = Management
        fields = "__all__"

class AddUserSer(serializers.Serializer):
    class Meta:
        model = AddAthlete
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    username = serializers.CharField(
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    password = serializers.CharField(min_length=8)

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'],
             validated_data['password'])
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')