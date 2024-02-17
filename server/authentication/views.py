from django.shortcuts import render
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .serializers import UserSerializer, SignupSerializer, LoginSerializer

User = get_user_model()

# Create your views here.
class LoginView(APIView):
  def post(self, request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
      user = authenticate(email=serializer.validated_data['email'], password=serializer.validated_data['password'])
      if user:
        token, created = Token.objects.get_or_create(user=user)
        serializer = UserSerializer(user)
        return Response({"token": token.key, "user": serializer.data})
      else:
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
      return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SignupView(APIView):
  def post(self, request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
      user = serializer.save()
      token = Token.objects.create(user=user)
      user_serializer = UserSerializer(user)
      return Response({"token": token.key, "user": user_serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
  authentication_classes = [SessionAuthentication, TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def post(self, request):
    request.user.auth_token.delete()
    return Response({"detail": "Successfully logged out"}, status=status.HTTP_200_OK)