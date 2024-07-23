from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('users/', views.UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),
    path('properties/', views.PropertyList.as_view(), name='property-list'),
    path('properties/<int:pk>/', views.PropertyDetail.as_view(), name='property-detail'),
    path('bookings/', views.BookingList.as_view(), name='booking-list'),
    path('bookings/<int:pk>/', views.BookingDetail.as_view(), name='booking-detail'),
    path('properties/search/', views.PropertySearch.as_view(), name='property-search'), 

]