from flask import Blueprint
from v1.plant.controller import PlantController
from v1.auth import jwt_token_required

class PlantRouter():
    @staticmethod
    def handler():
        app = Blueprint('plants', __name__, url_prefix='/v1/plants')
        app.before_request(jwt_token_required)
        controller = PlantController()
        app.add_url_rule('/', methods=['POST'], view_func=controller.post)
        app.add_url_rule('/', methods=['GET'], view_func=controller.get)
        app.add_url_rule('/', methods=['PUT'], view_func=controller.put)
        app.add_url_rule('/', methods=['DELETE'], view_func=controller.delete)
        app.add_url_rule('/<plant_id>', methods=['GET'], view_func=controller.get)
        app.add_url_rule('/<plant_id>', methods=['PUT'], view_func=controller.put)
        app.add_url_rule('/<plant_id>', methods=['DELETE'], view_func=controller.delete)
        return app
