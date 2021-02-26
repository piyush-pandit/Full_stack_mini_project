from django.contrib import admin

from .models import MyBlog, MyComments


class blogAdmin(admin.ModelAdmin):  
  list_display = ('title', 'description', 'author', 'date') 


# Register your models here.
admin.site.register(MyBlog, blogAdmin)
admin.site.register(MyComments)
