from enums import Enum

class UserType (Enum):
    BUYER = 'buyer'
    SELLER = 'seller'
    ADMIN = 'admin'
    USER_TYPE_CHOICES = [
        (BUYER, 'buyer'),
        (SELLER, 'seller'),
        (ADMIN, 'admin'),
    ]