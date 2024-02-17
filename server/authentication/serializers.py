from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
  class Meta(object):
    model = User
    fields = ['id', 'username', 'email', 'created_at']


class SignupSerializer(serializers.Serializer):
  username = serializers.CharField(max_length=10)
  email = serializers.EmailField()
  password = serializers.CharField(min_length=8)

  def create(self, validated_data):
    user = User.objects.create_user(
      username=validated_data['username'],
      email=validated_data['email'],
      password=validated_data['password']
    )
    return user


class LoginSerializer(serializers.Serializer):
  email = serializers.EmailField()
  password = serializers.CharField(min_length=8)