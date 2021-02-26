from django.shortcuts import render, HttpResponse
from django.contrib.auth.models import auth, User
from rest_framework.decorators import api_view 
from rest_framework.decorators import permission_classes
from .serializer import MyBlogSerializer, UserSerializer, MyComments
from rest_framework.response import Response 
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated 
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password
from .models import MyComments, MyBlog

def index(request):
    return HttpResponse('<h1>Welcome to the world of Backend !</h1>')

@api_view(['GET'])
def ListOfUsers(request):
    users = User.objects.all()
  
    serializer = UserSerializer(users,many = True)
    return Response(serializer.data)

@api_view(['POST'])
@csrf_exempt
def Login(request):
    user = auth.authenticate(username = request.data['username'], password = request.data['password'])
    if user is not None:
        auth.login(request, user)
        print(f"{user} logged in succcessfully")
        return HttpResponse('logged in successfully')
    else:
        print("invalid info")
        return HttpResponse ("login credential invalid", status = status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def Create_User(request):
    print(request.data)
    request.data['password'] = make_password(request.data['password'])
    serializer = UserSerializer(data= request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def TotalBlogs(request):
    blogs = MyBlog.objects.all()
    serializer = MyBlogSerializer(blogs, many = True)
    return Response (serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def Create_blogs(request):
    print(request.data)
    serializer = MyBlogSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        # print(serializer.data)
        return Response(serializer.data)
    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def Update_blogs(request, id):
    print(request.data,"errrrrrrrrrr")
    try:
        userblog = MyBlog.objects.get(pk = id)
    except MyBlog.NotExist :
        return Response (status=status.HTTP_404_NOT_FOUND)
    serializer = MyBlogSerializer(userblog, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def Delete_blogs(request, id):
    print(id, "erorrrr")
    try:
        userblog = MyBlog.objects.get(pk= id)
        print(userblog)
    except Exception as e :
        return Response(status=status.HTTP_404_NOT_FOUND)
    userblog.delete()
    return Response(status= status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def Get_user(request):
    print(type(request.GET), "erorr agaya kya??", request.GET.get('username'))
    print(User.objects.all())
    # return Response(status=200)
    # if 'username' in request.GET.keys():
    if request.GET.get('username'):
        try:
            user = User.objects.get(username=request.GET.get('username'))
            print(user, "userrrrrrrrrrrr")
        except Exception as e:
            return Response(status= 404)
    elif request.GET.get('id'):
        try:
            user = User.objects.get(pk=request.GET.get('id'))
        except Exception as e:
            return Response(status= 404)
    try:
        userserializer = UserSerializer(user, many= False)
        return Response(userserializer.data)
    except Exception as e:
        return Response(status= 404)















