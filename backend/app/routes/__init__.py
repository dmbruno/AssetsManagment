from flask import Blueprint
from .asset_routes import asset_routes

from .transaction_routes import transaction_routes
from .user_routes import user_routes


routes = Blueprint('routes', __name__)
routes.register_blueprint(transaction_routes)
routes.register_blueprint(user_routes)

# Registramos los sub-blueprints (como asset_routes)
routes.register_blueprint(asset_routes)