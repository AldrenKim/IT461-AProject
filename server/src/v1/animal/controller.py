from flask import request, make_response, jsonify
from v1.basecontroller import BaseController
from v1.animal.model import AnimalModel

class AnimalController(BaseController):
    _instance = None

    def __init__(self) -> None:
        self._instance = AnimalModel()

    def post(self):
        print(request.json)
        resp = self._instance.create(request.json)
        if resp == False:
            return make_response(jsonify({
                "error": "Failed to add. There are items in your request that are invalid."
            }), 400)
        return jsonify(resp)

    def check(self, animal_id, filters=None):
        if filters is not None:
            filters['id'] = animal_id
        else:
            filters = {"id": animal_id}
        animal = self._instance.read(filters)
        if animal is None:
            return make_response(jsonify({"error": "Animal id not found."}), 404)
        return animal

    def get(self, animal_id=None):
        filters = {}
        if 'fields' in request.args:
            filters['fields'] = request.args['fields'].split(',')
        if animal_id is not None:
            animal = self.check(animal_id, filters)
            if not isinstance(animal, dict):
                return animal
            return jsonify(animal)
        filters['offset'] = int(request.args['offset']) if 'offset' in request.args else 0
        filters['limit'] = int(request.args['limit']) if 'limit' in request.args else 5
        animals = self._instance.read(filters)
        total = self._instance.read(filters, True)
        return jsonify({
            'metadata': {
                'total': total,
                'links': self.build_links(total, filters['offset'], filters['limit'])
            },
            'data': animals
        })

    def put(self, animal_id=None):
        if animal_id is not None:
            animal = self.check(animal_id)
            if not isinstance(animal, dict):
                return animal
            animal_data = request.json
            animal_data['id'] = animal_id
            resp = self._instance.update(animal_data)
            if resp == False:
                return make_response(jsonify({
                    "error": "Failed to update. There are items in your request that are invalid."
                }), 400)
            return jsonify(resp)
        return jsonify(self._instance.update(request.json))

    def delete(self, animal_id=None):
        if animal_id is not None:
            animal = self.check(animal_id)
            if not isinstance(animal, dict):
                return animal
            return jsonify(self._instance.delete(animal_id))
        return jsonify(self._instance.delete(request.json))
