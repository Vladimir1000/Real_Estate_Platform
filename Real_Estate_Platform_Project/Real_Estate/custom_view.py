# from rest_framework import generics
# from .models import Property
# from .serializers import PropertySerializer

# class PropertySearch(generics.ListAPIView):
#     serializer_class = PropertySerializer

#     def get_queryset(self):
#         queryset = Property.objects.all()
#         price_min = self.request.query_params.get('price_min', None)
#         price_max = self.request.query_params.get('price_max', None)
#         city = self.request.query_params.get('city', None)
#         address = self.request.query_params.get('address', None)
        
#         if price_min is not None:
#             queryset = queryset.filter(price__gte=price_min)
#         if price_max is not None:
#             queryset = queryset.filter(price__lte=price_max)
#         if city is not None:
#             queryset = queryset.filter(city__icontains=city)
#         if address is not None:
#             queryset = queryset.filter(address__icontains=address)
        
#         return queryset
