from django.contrib import admin
from django.urls import path, include
from . import views
from .views import UserCreateAPI
from .views import LoginAPI
from .views import GoogleLoginAPIView
from .views import view_profile
from .views import view_header

urlpatterns = [
    path('signin/', LoginAPI.as_view(), name='login'),
    path('signup/', UserCreateAPI.as_view(), name='sign-up'),
    path('register-with-google/', GoogleLoginAPIView.as_view(), name='register-with-google'),
    path('profile/', view_profile, name='viewprofile'),
    path('header/', view_header, name='viewheader'),


]

