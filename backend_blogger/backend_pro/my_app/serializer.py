from rest_framework import serializers
from . models import MyBlog, MyComments
from django.contrib.auth.models import User

class MyBlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyBlog
        # feilds = ('title', 'description', 'date', 'author' )
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class CommentsSerializers(serializers.ModelSerializer):
    class Meta:
        model = MyComments
        fields = '_all__'

    