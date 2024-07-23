from rest_framework import serializers
from .models import User, Property, Booking

class BookingSerializer(serializers.HyperlinkedModelSerializer):
    property = serializers.HyperlinkedRelatedField(
        view_name='property-detail',
        read_only=True
    )

    property_id = serializers.PrimaryKeyRelatedField(
        queryset=Property.objects.all(),
        source='property'
    )

    user = serializers.HyperlinkedRelatedField(
        view_name='user-detail',
        read_only=True
    )

    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='user'
    )

    class Meta:
        model = Booking
        fields = ('id', 'property', 'property_id', 'user', 'user_id', 'booking_date', 'status')


class PropertySerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(
        view_name='user-detail',
        read_only=True
    )

    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='user'
    )

    bookings = BookingSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Property
        fields = ('id', 'user', 'user_id', 'title', 'description', 'address', 'city', 'size', 'type', 'status', 'price', 'photo_url', 'bookings', 'latitude', 'longitude')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    properties = PropertySerializer(
        many=True,
        read_only=True
    )

    user_url = serializers.ModelSerializer.serializer_url_field(
        view_name='user-detail'
    )

    class Meta:
        model = User
        fields = ('id', 'user_name', 'password', 'email', 'user_photo','user_url', 'properties')
