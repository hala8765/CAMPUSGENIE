from django.contrib import admin
from django.urls import path, include
from . import views
from .views import chatbotAPI
#from .views import retrievechathistoryAPI
from .views import getchatlistAPI
from .views import addchatAPI

urlpatterns = [
    path('add/',addchatAPI, name='add'),
    path('chat/<int:chatId>', chatbotAPI, name='chat'),
    #path('history/', retrievechathistoryAPI, name='chathistory'),
    path('chatlist/', getchatlistAPI, name='chatlist')
    
]