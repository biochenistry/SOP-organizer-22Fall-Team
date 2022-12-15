import os
from django.db import models
from SOP.settings import BASE_DIR, MEDIA_ROOT
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    code = models.CharField(max_length=10, default=None)
    class Meta:
        db_table = 'auth_user'

