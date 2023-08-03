from django.shortcuts import render
#Sreyafrom django.http import Httpresponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
#from rest_framework_jwt.settings import api_settings
from django.contrib.auth import authenticate
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
#from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
#from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveAPIView
from .serializers import LoginSerializer
from .serializers import UserSerializer
#from user.serializers import ProfileSerializer
from user.models import User
from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth import get_user_model, authenticate
#from .serializers import RegistrationWithGoogleSerializer
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
#Sreyajwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
#Sreyajwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
from rest_framework.authtoken.models import Token

class UserCreateAPI(APIView):
    
    serializer_class = UserSerializer

    @permission_classes([AllowAny])
    def post(self, request):
        print("InsignupAPI")
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class LoginAPI(APIView):

   
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            email=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )
        if not user:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_profile(request):
    # User is already authenticated based on the access token
    user = request.user
    print(user)
    profile_data = {
        'firstname': user.firstname,
        'lastname': user.lastname,
        'username': user.username,
        'email': user.email,
    }
    return Response(profile_data)


User = get_user_model()

class GoogleLoginAPIView(APIView):
    def post(self, request):
        token = request.data.get('token')  # Google ID token obtained from the frontend

        try:
            # Verify the Google ID token
            idinfo = id_token.verify_oauth2_token(token, requests.Request())

            # Get user information from the ID token
            email = idinfo['email']
            first_name = idinfo.get('given_name', '')
            #first_name = idinfo['given_name']
            last_name = idinfo.get('family_name', '')
            username = idinfo['email']
            # Extract other relevant user information from idinfo if needed

            # Check if the user with the provided email already exists in your system
            try:
                user = User.objects.get(email=email)
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                
                return Response({
                    'access_token': access_token,
                    'refresh_token': str(refresh),
                    'firstname': user.firstname,
                    'lastname': user.lastname,
                    'username': user.username,
                    'email': user.email
                })
            
            except User.DoesNotExist:
                # Create a new user with the provided email and any other relevant information
                user = User(email=email,firstname=first_name,lastname=last_name,username=username)
                user.set_unusable_password()
                user.save()

            # Generate or retrieve an authentication token for the user
            # This depends on your authentication system, such as using JWT or session-based authentication
            # Return the token to the frontend for subsequent authenticated requests
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            return Response({
                'access_token': access_token,
                'refresh_token': str(refresh),
                'firstname': user.firstname,
                'lastname': user.lastname,
                'username': user.username,
                'email': user.email
            })
        except ValueError:
            # Invalid Google ID token
            return Response({'error': 'Invalid token.'}, status=400)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_header(request):
    # User is already authenticated based on the access token
    user = request.user
    print(user)
    header_data = {
        'firstname': user.firstname,
        'lastname': user.lastname,
        'username': user.username,
        'email': user.email,
    }
    
    return Response(header_data)