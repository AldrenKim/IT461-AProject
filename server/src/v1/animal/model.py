from db import Db

class AnimalModel():
    def sanitize(self, animals):
        if not isinstance(animals, (list, tuple)):
            animals = [animals]
        clean_animals = []
        for animal in animals:
            if not isinstance(animal, dict):
                continue
            if not (
                'name' in animal and
                'scientific_name' in animal and
                'date_updated' in animal and
                'count' in animal
                ):
                continue
            clean_animals.append(animal)
        return clean_animals

    def create(self, animals):
        if not isinstance(animals, (list, tuple)):
            animals = [animals]
        clean_animals = self.sanitize(animals)
        if len(animals) != len(clean_animals):
            return False
        queries = []
        for animal in clean_animals:
            sql = "INSERT INTO animals(" + \
                "name, " + \
                "scientific_name, " + \
                "date_updated, " + \
                "filename, " + \
                "count" + \
                ") VALUES(%s, %s, %s, %s, %s)"
            queries.append({"sql": sql, "bind": (
                animal['name'],
                animal['scientific_name'],
                animal['date_updated'],
                animal['filename'],
                animal['count'],
            )})
        db = Db.get_instance()
        result = db.transactional(queries)
        return animals

    def read(self, filters=None, count_only=False):
        db = Db.get_instance()
        fields = ['*']
        offset = 0
        limit = 5
        if filters is not None:
            if 'fields' in filters:
                tmp_fields = []
                for field in filters['fields']:
                    if field in ['id', 'name', 'scientific_name', 'count', 'date_updated']:
                        tmp_fields.append(field)
                if len(tmp_fields) > 0:
                    fields = tmp_fields
            if 'id' in filters:
                sql = "SELECT " + ','.join(fields) + " FROM animals WHERE id = %s"
                animal = db.fetchone(sql, filters['id'])
                return animal
            if 'offset' in filters:
                offset = int(filters['offset'])
            if 'limit' in filters:
                limit = int(filters['limit'])
        cols = 'COUNT(*) AS total' if count_only else ','.join(fields)
        sql = "SELECT " + cols + " FROM animals"
        if not count_only:
            sql += " ORDER BY name LIMIT " + str(offset) + ", " + str(limit)
        if count_only:
            row = db.fetchone(sql)
            return row['total'] if row else 0
        else:
            return db.fetchall(sql)

    def update(self, animals):
        if not isinstance(animals, (list, tuple)):
            animals = [animals]
        clean_animals = self.sanitize(animals)
        if len(animals) != len(clean_animals):
            return False
        queries = []
        for animal in clean_animals:
            sql = "UPDATE animals SET "
            for attr, value in animal.items():
                sql += attr + " = '" + str(value) + "', "
            sql = sql[:-2]
            sql += " WHERE id = %s"
            print(sql)
            queries.append({"sql": sql, "bind": animal['id']})
        db = Db.get_instance()
        db.transactional(queries)
        return animals

    def delete(self, animals):
        counter = 0
        if not isinstance(animals, (list, tuple)):
            animals = [animals]
        placeholder = []
        queries = []
        for animal in animals:
            placeholder.append('%s')
        sql = "DELETE FROM animals WHERE id IN (" + ", ".join(placeholder) + ")"
        queries.append({"sql": sql, "bind": animals})
        db = Db.get_instance()
        counter = db.transactional(queries)
        return counter
