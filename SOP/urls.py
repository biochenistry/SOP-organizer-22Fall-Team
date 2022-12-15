"""SOP URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.models import User
from django.views.static import serve
from rest_framework import routers, serializers, viewsets
from SOP import settings
from organizer import views
from rest_framework import routers;
from rest_framework.views import APIView
from rest_framework.response import Response
from organizer.models import User
from django.contrib.auth.backends import BaseBackend
from organizer.views import CustomTokenObtainPairView

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = User
        fields = ['id', 'url', 'username', 'first_name',
                  'last_name', 'email', 'is_active', 'is_staff', 'is_superuser','password', 'code']

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username'],
        )
        user.set_password(validated_data['password'])
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']

        user.save()
        return user

    def put(self, valiedated_data):
        user = User()
        user.code = valiedated_data['code']
        user.save()
        return user


# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UpdatePasswordView(APIView):
    """Change Password
    """

    def put(self, request):
        """
        Change the password according to the passed username
        :param request:
        :return:
        """
        data = request.data
        print(data)
        try:
            user = User.objects.get(username=data['username'])
        except:
            return Response({'code': -1, 'message': 'username is not exist!'})
        if not user.check_password(data['password']):
            return Response({'code': -1, 'message': 'old password is error!'})
        else:
            user.set_password(data['password'])
            user.save()
            return Response({'code': 0, 'message': 'ok'})


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('notices', views.NotificationViewSet)

urlpatterns = [
    path('password/', UpdatePasswordView.as_view()),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
    path('notifications/', include('notifications.urls', namespace='notifications')),
    path('', include(router.urls))
]
