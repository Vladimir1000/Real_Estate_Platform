from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import User, Property, Booking
from .serializers import UserSerializer, PropertySerializer, BookingSerializer, UserPropertySerializer

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

    #--------------CreateBookingView_____________________New line OF code

class CreateBookingView(generics.CreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def perform_create(self, serializer):
        property_id = self.request.data.get('property_id')
        user_id = self.request.data.get('user_id')
        property_instance = Property.objects.get(id=property_id)
        user_instance = User.objects.get(id=user_id)
        serializer.save(property=property_instance, user=user_instance)

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
    
    #---------------Add Bookings to user profiles----------------------
# @api_view(['POST'])
# def add_property_to_user(request, user_id):
#     user = Booking.objects.get(id=user_id)
#     serializer = UserPropertySerializer(data=request.data)
#     if serializer.is_valid():
#         property_id = serializer.validated_data['property_id']
#         property = Property.objects.get(id=property_id)
#         user.properties.add(property)
#         return Response({'status': 'Property added'}, status=status.HTTP_200_OK)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['POST'])
# def remove_property_from_user(request, user_id):
#     user = Booking.objects.get(id=user_id)
#     serializer = UserPropertySerializer(data=request.data)
#     if serializer.is_valid():
#         property_id = serializer.validated_data['property_id']
#         property = Property.objects.get(id=property_id)
#         user.properties.remove(property)
#         return Response({'status': 'Property removed'}, status=status.HTTP_200_OK)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)