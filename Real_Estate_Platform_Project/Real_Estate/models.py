from django.db import models


class User(models.Model):
    user_name = models.CharField(max_length=50)
    password = models.CharField(max_length=30)
    email = models.CharField(max_length=50)
    BUYER = 'buyer'
    SELLER = 'seller'
    ADMIN = 'admin'
    USER_TYPE_CHOICES = [
        (BUYER, 'buyer'),
        (SELLER, 'seller'),
        (ADMIN, 'admin'),
    ]
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default=BUYER)
    user_photo = models.CharField(max_length=200, default='../src/assets/defaultUser.jpg')


    def __str__(self):
        return self.user_name
    

class Property(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='property')
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100, default='Unknown')
    size = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=50) # ex: apartment, house
    status = models.CharField(max_length=20, default='active') # ex: active, sold
    price = models.DecimalField(max_digits=10, decimal_places=2)
    photo_url = models.CharField(max_length=200, default='../src/assets/defaultProperty.jpg')
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)  
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)  

    def __str__(self):
        return self.title
    
class Booking(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='booking')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='booking')
    booking_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='pending') #ex: pending, confirmed, cancelled
    # properties = models.ManyToManyField(User, related_name='users')


    def __str__(self):
        return f'Booking for {self.property.title} by {self.user.user_name}'
