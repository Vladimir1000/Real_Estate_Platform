from django.shortcuts import render
from rest_framework import generics
from .models import User, Property, Booking
from .serializers import UserSerializer, PropertySerializer, BookingSerializer

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class PropertyList(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

class PropertyDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

class BookingList(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

class BookingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer


    #-----------Search Functionality-----------------------

class PropertySearch(generics.ListAPIView):
    serializer_class = PropertySerializer

    def get_queryset(self):
        queryset = Property.objects.all()
        price_min = self.request.query_params.get('price_min', None)
        price_max = self.request.query_params.get('price_max', None)
        city = self.request.query_params.get('city', None)
        address = self.request.query_params.get('address', None)
        
        if price_min is not None:
            queryset = queryset.filter(price__gte=price_min)
        if price_max is not None:
            queryset = queryset.filter(price__lte=price_max)
        if city is not None:
            queryset = queryset.filter(city__icontains=city)
        if address is not None:
            queryset = queryset.filter(address__icontains=address)
        
        return queryset