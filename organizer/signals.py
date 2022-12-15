from django.db.models.signals import post_save
from django.dispatch import receiver
from organizer.models import User
from notifications.signals import notify


@receiver(post_save, sender=User)
def send_notification(sender, instance, **kwargs):
    if kwargs['created']:
        verb = '{} {} just registered'.format(instance.first_name, instance.last_name)
        notify.send(instance, recipient=User.objects.filter(is_staff=1), verb=verb, action_object=instance)
