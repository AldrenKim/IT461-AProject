from flask import request, make_response, jsonify
from v1.basecontroller import BaseController
from v1.plant.model import PlantModel

class PlantController(BaseController):
    _instance = None

    def __init__(self) -> None:
        self._instance = PlantModel()

    def post(self):
        print(request.json)
        resp = self._instance.create(request.json)
        if resp == False:
            return make_response(jsonify({
                "error": "Failed to add. There are items in your request that are invalid."
            }), 400)
        return jsonify(resp)

    def check(self, plant_id, filters=None):
        if filters is not None:
            filters['id'] = plant_id
        else:
            filters = {"id": plant_id}
        plant = self._instance.read(filters)
        if plant is None:
            return make_response(jsonify({"error": "Plant id not found."}), 404)
        return plant

    def get(self, plant_id=None):
        filters = {}
        if 'fields' in request.args:
            filters['fields'] = request.args['fields'].split(',')
        if plant_id is not None:
            plant = self.check(plant_id, filters)
            if not isinstance(plant, dict):
                return plant
            return jsonify(plant)
        filters['offset'] = int(request.args['offset']) if 'offset' in request.args else 0
        filters['limit'] = int(request.args['limit']) if 'limit' in request.args else 5
        plants = self._instance.read(filters)
        total = self._instance.read(filters, True)
        return jsonify({
            'metadata': {
                'total': total,
                'links': self.build_links(total, filters['offset'], filters['limit'])
            },
            'data': plants
        })

    def put(self, plant_id=None):
        if plant_id is not None:
            plant = self.check(plant_id)
            if not isinstance(plant, dict):
                return plant
            plant_data = request.json
            plant_data['id'] = plant_id
            resp = self._instance.update(plant_data)
            if resp == False:
                return make_response(jsonify({
                    "error": "Failed to update. There are items in your request that are invalid."
                }), 400)
            return jsonify(resp)
        return jsonify(self._instance.update(request.json))

    def delete(self, plant_id=None):
        if plant_id is not None:
            plant = self.check(plant_id)
            if not isinstance(plant, dict):
                return plant
            return jsonify(self._instance.delete(plant_id))
        return jsonify(self._instance.delete(request.json))
