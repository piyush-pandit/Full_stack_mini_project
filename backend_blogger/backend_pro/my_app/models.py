from django.db import models

from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class MyBlog(models.Model):
    title = models.CharField(max_length=200)
    date = models.DateField("date", auto_now = True)
    description = models.TextField(max_length=300)

    author = models.ForeignKey(User,on_delete=models.CASCADE, null=True)
    username = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.title


class MyComments(models.Model):
    comment = models.TextField(blank=True)
    myBlog = models.ForeignKey(MyBlog,on_delete=models.CASCADE)

