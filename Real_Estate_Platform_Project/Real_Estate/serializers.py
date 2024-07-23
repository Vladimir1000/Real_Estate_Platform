from rest_framework import serializers
from .models import User, Property, Booking


class BookingSerializer(serializers.HyperlinkedModelSerializer):
    property = serializers.HyperlinkedRelatedField(
        view_name='property-details',
        read_only=True
    )

    property_id = serializers.PrimaryKeyRelatedField(
        queryset=Property.objects.all(),
        source='property'
    )

    class Meta:
        model = Booking
        fields = '__all__'

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
        fields = '__all__'


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
        fields = '__all__'