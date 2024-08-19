from django.core.mail import send_mail
import random
from django.conf import settings
from .models import User

def send_otp(email):
    subject = 'Clouder - Welcome! Complete Your User Verification'
    otp = random.randint(1000, 9999)
    message = f"""
    Dear User,

    Welcome to Clouder!

    To complete your user verification, please use the following One-Time Password (OTP):

    OTP: {otp}

    This OTP is valid for the next 10 minutes. Please do not share this OTP with anyone.

    If you did not request this verification, please ignore this email.

    Thank you for choosing Clouder. We are excited to have you on board!

    Best regards,
    The Clouder Team

    ---

    Note: This is an automatically generated email. Please do not reply to this message.
    """

    email_from = settings.EMAIL_HOST_USER  
    try:
        send_mail(subject, message, email_from, [email])
        user_obj = User.objects.get(email=email)
        user_obj.otp = otp
        user_obj.save()
        print(f"OTP sent successfully to {email}")
        print(otp)
    except Exception as e:
        print(f"Error sending OTP to {email}: {e}")
