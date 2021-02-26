from django.urls import path, include
from . import views
from django.conf import settings

urlpatterns = [
    path('', views.index, name='index'),
    path('userlist/', views.ListOfUsers, name='ListOfUsers'),
    path('login/', views.Login, name='Login'),
    path('createuser/', views.Create_User, name='Create_User'),
    path('totalblogs/', views.TotalBlogs, name='TotalBlogs'),
    path('createblogs/', views.Create_blogs, name='Create_blogs'),
    path('updateblogs/<int:id>/', views.Update_blogs, name='Update_blogs'),
    path('deleteblogs/<int:id>/', views.Delete_blogs, name='Delete_blogs'),
    path('getuser/', views.Get_user, name='Get_user'),

]
